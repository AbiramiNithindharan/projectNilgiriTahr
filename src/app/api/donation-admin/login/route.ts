import { NextResponse, NextRequest } from "next/server";
import { signToken } from "@/lib/dashboard/auth/jwt";
import { loginRateLimiter } from "@/lib/redis/rate-limit";
import { getIP } from "@/lib/redis/get-ip";
import { randomBytes } from "node:crypto";
import { logAdminAction } from "@/lib/dashboard/security/audit-log";

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req);

    const userAgent = req.headers.get("user-agent") || "unknown";

    const { success } = await loginRateLimiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429 },
      );
    }

    const { username, password } = await req.json();

    const DONATE_ADMIN_USER = process.env.DONATE_ADMIN_USER;
    const DONATE_ADMIN_PASS = process.env.DONATE_ADMIN_PASS;

    if (!DONATE_ADMIN_USER || !DONATE_ADMIN_PASS) {
      console.error("Missing DONATE_ADMIN_USER or DONATE_ADMIN_PASS in .env");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 },
      );
    }

    if (username !== DONATE_ADMIN_USER || password !== DONATE_ADMIN_PASS) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = await signToken({ id: "1", username: DONATE_ADMIN_USER });
    const csrfToken = randomBytes(32).toString("hex");
    const res = NextResponse.json({ success: true });

    //auth cookie
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    });

    //CSRF cookie
    res.cookies.set("csrf_token", csrfToken, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    await logAdminAction({
      action: "ADMIN_LOGIN_SUCCESS",
      admin: DONATE_ADMIN_USER,
      ip,
      userAgent,
    });
    await logAdminAction({
      action: "ADMIN_LOGIN_FAILED",
      admin: username,
      ip,
      userAgent,
    });
    return res;
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
