import { clearAuthCookie } from "@/utils/auth";

export async function POST() {
  clearAuthCookie();
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
  });
}
