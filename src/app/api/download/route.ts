import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("file");

  if (!url) {
    return NextResponse.json({ error: "Missing file URL" }, { status: 400 });
  }

  const response = await fetch(url);

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
