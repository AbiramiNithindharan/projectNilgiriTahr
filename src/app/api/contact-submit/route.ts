export async function POST(req: Request) {
  const body = await req.json();

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
}
