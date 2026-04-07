import { NextRequest } from "next/server";
import { verifyToken, AdminJWTPayload } from "./jwt";

type AdminAuthResult =
  | { authorized: false; error: string }
  | { authorized: true; payload: AdminJWTPayload };

export async function requireAdmin(req: NextRequest): Promise<AdminAuthResult> {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return { authorized: false, error: "No token" };
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return { authorized: false, error: "Invalid token" };
  }

  return { authorized: true, payload };
}
