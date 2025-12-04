import { serve } from "std/http/server.ts";

import { createClient } from "@supabase/supabase-js";

serve(async (req: Request): Promise<Response> => {
  try {
    const { name, email, message } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Save message
    await supabase.from("contact_messages").insert({ name, email, message });

    // Send email
    await supabase.functions.invoke("send-email", {
      body: {
        to: "nithindharan.r@gmail.com",
        subject: "New Contact Form Message",
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : String(err),
      }),
      { status: 500 }
    );
  }
});
