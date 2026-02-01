import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BookingFormData, PriceBreakdown, Booking, MealPlan, BookingStatus } from "@/types/booking";
import { toast } from "@/hooks/use-toast";

interface CreateBookingParams {
  formData: BookingFormData;
  priceBreakdown: PriceBreakdown;
}

// Generate a temporary reference that will be replaced by the trigger
function generateTempReference(): string {
  return 'TEMP' + Date.now().toString(36).toUpperCase();
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData, priceBreakdown }: CreateBookingParams): Promise<Booking> => {
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();

      const status: BookingStatus = formData.isEnquiryOnly ? 'new_enquiry' : 'quote_sent';

      // The trigger will replace this with a proper reference
      const tempReference = generateTempReference();

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          booking_reference: tempReference, // Will be overwritten by trigger
          user_id: user?.id || null,
          guest_name: formData.guestName.trim(),
          guest_email: formData.guestEmail.trim().toLowerCase(),
          guest_phone: formData.guestPhone.trim(),
          guest_city: formData.guestCity.trim() || null,
          special_requests: formData.specialRequests.trim() || null,
          room_category_id: formData.roomCategoryId,
          package_id: formData.packageId || null,
          check_in_date: formData.checkInDate!.toISOString().split('T')[0],
          check_out_date: formData.checkOutDate!.toISOString().split('T')[0],
          num_nights: priceBreakdown.numNights,
          num_adults: formData.numAdults,
          num_children: formData.numChildren,
          meal_plan: formData.mealPlan,
          room_total: priceBreakdown.roomTotal,
          extra_guest_total: priceBreakdown.extraGuestTotal,
          meal_plan_total: priceBreakdown.mealPlanTotal,
          package_total: priceBreakdown.packageTotal,
          taxes: priceBreakdown.taxes,
          discount_amount: 0,
          grand_total: priceBreakdown.grandTotal,
          status: status,
          is_enquiry_only: formData.isEnquiryOnly,
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from booking insert');
      
      // If booking is confirmed (not just enquiry), block the dates
      if (!formData.isEnquiryOnly && data) {
        const checkIn = new Date(formData.checkInDate!);
        const checkOut = new Date(formData.checkOutDate!);
        const blockedDates = [];
        
        for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
          blockedDates.push({
            room_category_id: formData.roomCategoryId,
            blocked_date: d.toISOString().split('T')[0],
            rooms_blocked: 1,
            reason: 'Booking',
            booking_id: data.id,
          });
        }

        if (blockedDates.length > 0) {
          await supabase.from('blocked_dates').insert(blockedDates);
        }
      }

      // Map the response to our Booking type
      return {
        id: data.id,
        booking_reference: data.booking_reference,
        user_id: data.user_id,
        guest_name: data.guest_name,
        guest_email: data.guest_email,
        guest_phone: data.guest_phone,
        guest_country: data.guest_country,
        special_requests: data.special_requests,
        room_category_id: data.room_category_id,
        package_id: data.package_id,
        check_in_date: data.check_in_date,
        check_out_date: data.check_out_date,
        num_adults: data.num_adults,
        num_children: data.num_children,
        num_rooms: data.num_rooms,
        base_price: Number(data.base_price) || 0,
        taxes: Number(data.taxes) || 0,
        extras: Number(data.extras) || 0,
        discount: Number(data.discount) || 0,
        grand_total: Number(data.grand_total) || 0,
        status: data.status as BookingStatus,
        is_enquiry_only: data.is_enquiry_only,
        internal_notes: data.internal_notes,
        assigned_room_numbers: data.assigned_room_numbers,
        source: data.source,
        payment_status: data.payment_status,
        payment_method: data.payment_method,
        payment_reference: data.payment_reference,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      
      toast({
        title: data.is_enquiry_only ? "Enquiry Submitted!" : "Booking Confirmed!",
        description: `Your reference number is ${data.booking_reference}. We'll be in touch soon.`,
      });
    },
    onError: (error) => {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });
}
