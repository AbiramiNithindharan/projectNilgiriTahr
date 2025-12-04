import { serve } from "std/http/server.ts";
import "dotenv";
import { Resend } from "resend";

serve(async (req: Request): Promise<Response> => {
  const { to, subject, html } = await req.json();

  const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

  await resend.emails.send({
    from: "Nilgiri Tahr Project <no-reply@sateline.co.in>",
    to,
    subject,
    html,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
