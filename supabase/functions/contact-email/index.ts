import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

serve(async (req: Request): Promise<Response> => {
  try {
    const { name, email, message } = await req.json();

    const supabase = createClient(
      Deno.env.get("PROJECT_URL")!,
      Deno.env.get("SERVICE_ROLE_KEY")!
    );

    // Save message
    await supabase.from("contact_messages").insert({ name, email, message });

    // Send email directly using Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

    await resend.emails.send({
      from: "Nilgiri Tahr Project <no-reply@sateline.co.in>",
      to: "nithindharan.r@gmail.com",
      subject: "New Contact Form Message",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Send Email Error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
});
