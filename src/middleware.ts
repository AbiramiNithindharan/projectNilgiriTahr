import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get("adminAuth")?.value === "true";
  const isStudio = req.nextUrl.pathname.startsWith("/studio");

  if (isStudio && !isAdmin) {
    return NextResponse.redirect(new URL("/cms-access-portal", req.url));
  }

  return NextResponse.next();
}
