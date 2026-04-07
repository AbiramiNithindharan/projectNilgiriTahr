import { NextRequest } from "next/server";

export function verifyCSRF(req: NextRequest) {
  const cookieToken = req.cookies.get("csrf_token")?.value;
  const headerToken = req.headers.get("x-csrf-token");

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return false;
  }

  return true;
}
