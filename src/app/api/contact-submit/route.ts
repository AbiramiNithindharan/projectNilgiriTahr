import { validateContact } from "@/lib/validation/contact";
import { checkRateLimit } from "@/lib/validation/rate-limit";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.company) {
      return new Response(JSON.stringify({ error: "Spam detected" }), {
        status: 400,
      });
    }
    const errors = validateContact(body);
    if (errors.length > 0) {
      return new Response(JSON.stringify({ errors }), { status: 400 });
    }
    //ip address
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    //rate limit
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
      `${process.env.SUPABASE_FUNCTION_URL}/contact-email`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrichedBody),
      },
    );

    const text = await result.text();
    return new Response(text, { status: result.status });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
}
