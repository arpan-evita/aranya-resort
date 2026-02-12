import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RECIPIENT_EMAIL = "jungleheritageresort8@gmail.com";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { type, data } = await req.json();

    let subject = '';
    let htmlBody = '';

    switch (type) {
      case 'contact':
        subject = `New Contact Enquiry: ${data.subject || 'General'}`;
        htmlBody = `
          <h2>New Contact Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">Name:</td><td style="padding:8px;">${data.name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${data.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${data.phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Subject:</td><td style="padding:8px;">${data.subject}</td></tr>
          </table>
          <h3>Message:</h3>
          <p>${data.message}</p>
        `;
        break;

      case 'career':
        subject = `New Job Application: ${data.position}`;
        htmlBody = `
          <h2>New Career Application</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">Name:</td><td style="padding:8px;">${data.name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${data.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${data.phone}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Position:</td><td style="padding:8px;">${data.position}</td></tr>
          </table>
          <h3>Experience:</h3>
          <p>${data.experience}</p>
          ${data.message ? `<h3>Additional Message:</h3><p>${data.message}</p>` : ''}
        `;
        break;

      case 'booking':
        subject = `New ${data.is_enquiry_only ? 'Booking Enquiry' : 'Booking'}: ${data.guest_name}`;
        htmlBody = `
          <h2>New ${data.is_enquiry_only ? 'Booking Enquiry' : 'Booking Confirmed'}</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">Reference:</td><td style="padding:8px;">${data.booking_reference || 'Pending'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Guest Name:</td><td style="padding:8px;">${data.guest_name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${data.guest_email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${data.guest_phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Check-in:</td><td style="padding:8px;">${data.check_in_date}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Check-out:</td><td style="padding:8px;">${data.check_out_date}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Adults:</td><td style="padding:8px;">${data.num_adults}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Children:</td><td style="padding:8px;">${data.num_children}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Total:</td><td style="padding:8px;">₹${data.grand_total || 'TBD'}</td></tr>
          </table>
          ${data.special_requests ? `<h3>Special Requests:</h3><p>${data.special_requests}</p>` : ''}
        `;
        break;

      default:
        throw new Error(`Unknown notification type: ${type}`);
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Jungle Heritage Resort <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
        subject,
        html: htmlBody,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', result);
      throw new Error(`Resend API error: ${JSON.stringify(result)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email notification error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
