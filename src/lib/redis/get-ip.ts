import { NextRequest } from "next/server";

export function getIP(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  return ip.split(",")[0];
}
