import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";

serve(async (req: Request): Promise<Response> => {
  try {
    const { name, email, phone, interest } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("volunteer_registrations").insert({
      name,
      email,
      phone,
      interest,
    });

    // Send thank-you email
    await supabase.functions.invoke("send-email", {
      body: {
        to: email,
        subject: "Thank You for Registering as a Volunteer!",
        html: `
          <h2>Thank You, ${name}!</h2>
          <p>We have received your volunteer registration.</p>
          <p>We will contact you soon.</p>
        `,
      },
    });

    // Admin notification
    await supabase.functions.invoke("send-email", {
      body: {
        to: "nithindharan.r@gmail.com",
        subject: "New Volunteer Registration",
        html: `
          <h3>New Volunteer</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Interest:</b> ${interest}</p>
        `,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
});
