import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("file");

  if (!url) {
    return NextResponse.json({ error: "Missing file URL" }, { status: 400 });
  }

  // Only proxy files hosted on Sanity's CDN — otherwise this is an open proxy.
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
  }
  if (parsed.protocol !== "https:" || parsed.hostname !== "cdn.sanity.io") {
    return NextResponse.json({ error: "File host not allowed" }, { status: 400 });
  }

  const response = await fetch(parsed);
  if (!response.ok) {
    console.error("❌ Download fetch failed:", response.status, url);
    return NextResponse.json({ error: "File not found" }, { status: 502 });
  }

  const blob = await response.arrayBuffer();
  const filename = url.split("/").pop() || "poster";

  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
