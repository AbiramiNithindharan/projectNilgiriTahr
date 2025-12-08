export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🔵 Contact API Body:", body);

    const result = await fetch(
      `${process.env.SUPABASE_FUNCTION_URL}/contact-email`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await result.text();
    return new Response(text, { status: result.status });
  } catch (err) {
    console.error("🔴 API ERROR:", err);

    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
}
