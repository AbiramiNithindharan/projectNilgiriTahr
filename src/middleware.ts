import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/dashboard/auth/jwt";

function applySecurityHeaders(res: NextResponse) {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-XSS-Protection", "1; mode=block");

  // CSP — REPORT-ONLY. The browser reports what it *would* have blocked without
  // blocking anything, so this cannot break the live site. Collect violations from
  // the console across every page (Studio, /donate, /e-com, gallery, news), tighten
  // the directives, and only then rename the header to "Content-Security-Policy"
  // to start enforcing. Do not enforce before that pass is done.
  res.headers.set(
    "Content-Security-Policy-Report-Only",
    [
      "default-src 'self'",
      // 'unsafe-eval' is required by Sanity Studio; checkout.razorpay.com serves checkout.js
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      // Sanity CDN + Supabase Storage images
      "img-src 'self' blob: data: https:",
      "connect-src 'self' https://*.supabase.co https://*.sanity.io wss://*.sanity.io https://api.razorpay.com https://lumberjack.razorpay.com",
      // Razorpay checkout renders in an iframe
      "frame-src https://api.razorpay.com https://checkout.razorpay.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  );

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

  // /studio is gated by Sanity's own login — see CLAUDE.md "Auth model".
  // It stays in the matcher below so security headers still apply.

  const res = NextResponse.next();
  return applySecurityHeaders(res);
}

export const config = {
  matcher: ["/donation-admin/:path*", "/studio/:path*"],
};
