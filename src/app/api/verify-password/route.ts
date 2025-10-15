import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
      // Set cookie valid for 1 hour
      const response = NextResponse.json({ success: true });
      response.cookies.set("adminAuth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
