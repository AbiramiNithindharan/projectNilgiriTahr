import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  const expire = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 0,
  };

  res.cookies.set("admin_token", "", { httpOnly: true, ...expire });
  // csrf_token used to survive logout, leaving a stale token in the browser.
  res.cookies.set("csrf_token", "", { httpOnly: false, ...expire });

  return res;
}
