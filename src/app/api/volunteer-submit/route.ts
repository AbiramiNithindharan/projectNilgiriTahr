import { validateVolunteer } from "@/lib/validation/volunteer";
import { checkRateLimit } from "@/lib/validation/rate-limit";

export async function POST(req: Request) {
  const body = await req.json();
  const errors = validateVolunteer(body);
  if (errors.length > 0) {
    return new Response(JSON.stringify({ errors }), { status: 400 });
  }
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Try again later." }),
      { status: 429 },
    );
  }
  const userAgent = req.headers.get("user-agent") || "unknown";
  const enrichedBody = {
    ...body,
    ip_address: ip,
    user_agent: userAgent,
  };
  const result = await fetch(
    `${process.env.SUPABASE_URL}functions/v1/volunteer-register`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrichedBody),
    },
  );

  return new Response(await result.text(), { status: result.status });
}
