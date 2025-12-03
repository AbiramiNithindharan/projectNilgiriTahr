export async function POST(req: Request) {
  const body = await req.json();

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/volunteer-register`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return new Response(await result.text(), { status: result.status });
}
