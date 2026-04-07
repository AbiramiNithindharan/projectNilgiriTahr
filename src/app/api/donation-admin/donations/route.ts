import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/dashboard/auth/requireAdmin";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { apiRateLimiter } from "@/lib/redis/rate-limit";
import { getIP } from "@/lib/redis/get-ip";

export async function GET(req: NextRequest) {
  try {
    const ip = getIP(req);

    const { success } = await apiRateLimiter.limit(ip);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const auth = await requireAdmin(req);

    if (!auth.authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data, error } = await supabaseAdmin
      .from("donations")
      .select("payment_id, name, email, amount, created_at, status")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error.message);
      return NextResponse.json({ error: "error.message" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
