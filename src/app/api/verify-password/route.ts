import { NextResponse } from "next/server";
import { signCmsToken } from "@/lib/dashboard/auth/jwt";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
      // Signed token, not the literal "true" this used to set — that value was
      // guessable and could be typed straight into the devtools Application panel.
      // src/middleware.ts verifies it (and its "cms" scope) on /studio.
      const token = await signCmsToken();

      const response = NextResponse.json({ success: true });
      response.cookies.set("adminAuth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 },
    );
  }
}
