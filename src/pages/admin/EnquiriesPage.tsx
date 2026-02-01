import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Phone, Mail, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useBookings, type BookingFilters } from "@/hooks/admin/useBookings";
import { BookingStatusBadge } from "@/components/admin/BookingStatusBadge";

export default function EnquiriesPage() {
  const navigate = useNavigate();
  const filters: BookingFilters = {
    search: "",
    status: "new_enquiry",
    roomCategoryId: "all",
    dateFrom: undefined,
    dateTo: undefined,
  };

  const { bookings, isLoading, convertEnquiry, isUpdating } = useBookings(filters, 1, 50);
  const enquiries = bookings.filter((b) => b.is_enquiry_only || b.status === "new_enquiry");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-medium">Enquiries</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage new enquiries and convert them to bookings
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium">No Pending Enquiries</h3>
            <p className="text-sm text-muted-foreground">
              All enquiries have been processed. Great job!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enquiries.map((enquiry) => (
            <Card key={enquiry.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-medium">{enquiry.guest_name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {enquiry.booking_reference}
                    </p>
                  </div>
                  <BookingStatusBadge status={enquiry.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{enquiry.guest_phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate">{enquiry.guest_email}</span>
                  </div>
                </div>

                {/* Stay Details */}
                <div className="p-3 rounded-lg bg-muted/30 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      {format(new Date(enquiry.check_in_date), "MMM dd")} -{" "}
                      {format(new Date(enquiry.check_out_date), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Room</span>
                    <span className="font-medium">{enquiry.room_categories?.name || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Guests</span>
                    <span>{enquiry.num_adults}A / {enquiry.num_children}C</span>
                  </div>
                </div>

                {/* Special Requests */}
                {enquiry.special_requests && (
                  <div className="p-3 rounded-lg border border-dashed border-border">
                    <p className="text-xs text-muted-foreground mb-1">Special Requests:</p>
                    <p className="text-sm line-clamp-2">{enquiry.special_requests}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/admin/bookings/${enquiry.id}`)}
                  >
                    View Details
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" className="flex-1" disabled={isUpdating}>
                        {isUpdating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            Convert
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Convert to Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will convert the enquiry to a pending booking. The guest will need to confirm
                          their reservation.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => convertEnquiry(enquiry.id)}>
                          Convert to Booking
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Created date */}
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Received {format(new Date(enquiry.created_at), "MMM dd, yyyy 'at' h:mm a")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
