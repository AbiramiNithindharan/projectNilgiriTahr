import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const DONATE_ADMIN_USER = process.env.DONATE_ADMIN_USER;
    const DONATE_ADMIN_PASS = process.env.DONATE_ADMIN_PASS;

    if (!DONATE_ADMIN_USER || !DONATE_ADMIN_PASS) {
      console.error("Missing DONATE_ADMIN_USER or DONATE_ADMIN_PASS in .env");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    if (username !== DONATE_ADMIN_USER || password !== DONATE_ADMIN_PASS) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({ id: "1", username: DONATE_ADMIN_USER });

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    });

    return res;
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
