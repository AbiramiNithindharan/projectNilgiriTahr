import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/dashboard/auth/jwt";

function applySecurityHeaders(res: NextResponse) {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-XSS-Protection", "1; mode=block");

  //  Strong CSP (adjust if something breaks)
  /* res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
    ].join("; "),
  );
 */
  // Extra headers (IMPORTANT)
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  // Only in production
  if (process.env.NODE_ENV === "production") {
    res.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect Admin Routes
  if (pathname.startsWith("/donation-admin")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      const res = NextResponse.redirect(
        new URL("/admin?tab=donation&error=unauthorized", req.url),
      );
      return applySecurityHeaders(res);
    }

    const payload = await verifyToken(token);

    if (!payload) {
      const res = NextResponse.redirect(
        new URL("/admin?tab=donation&error=unauthorized", req.url),
      );
      return applySecurityHeaders(res);
    }
  }

  //Studio protection — remove if unused
  /* if (pathname.startsWith("/studio")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      const res = NextResponse.redirect(
        new URL("/admin?tab=donation&error=unauthorized", req.url),
      );
      return applySecurityHeaders(res);
    }
  }
 */
  const res = NextResponse.next();
  return applySecurityHeaders(res);
}

export const config = {
  matcher: ["/donation-admin/:path*", "/studio/:path*"],
};
