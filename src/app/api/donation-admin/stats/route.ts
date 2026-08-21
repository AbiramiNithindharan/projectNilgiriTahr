import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/dashboard/auth/requireAdmin";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { apiRateLimiter, safeLimit } from "@/lib/redis/rate-limit";
import { getIP } from "@/lib/redis/get-ip";

export async function GET(req: NextRequest) {
  try {
    const ip = getIP(req);

    const { success } = await safeLimit(apiRateLimiter, ip);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const auth = await requireAdmin(req);

    if (!auth.authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* -------------------- Donation Stats -------------------- */
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

    // Fetch ONLY required fields + ONLY success
    const { data: donations, error: donationsError } = await supabaseAdmin
      .from("donations")
      .select("amount, email, created_at")
      .eq("status", "paid");

    if (donationsError) {
      console.error("❌ Supabase donations error:", donationsError.message);
      return NextResponse.json(
        { error: "Failed to load donation stats" },
        { status: 500 },
      );
    }

    const rows = donations ?? [];

    // TOTAL AMOUNT
    const totalAmount = rows.reduce((sum, d) => sum + d.amount, 0);

    // LAST MONTH FILTER
    const lastMonthAmount = rows
      .filter((d) => {
        const date = new Date(d.created_at);
        return date >= firstDayLastMonth && date < firstDayThisMonth;
      })
      .reduce((sum, d) => sum + d.amount, 0);

    // UNIQUE DONORS
    const totalDonors = new Set(rows.map((d) => d.email)).size;

    /* -------------------- Contact Stats -------------------- */
    const last7Days = new Date();
    last7Days.setDate(now.getDate() - 7);

    const { count: recentCount } = await supabaseAdmin
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .gte("created_at", last7Days.toISOString());

    const { count: notRepliedCount } = await supabaseAdmin
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("is_replied", false);

    const { data: messages, error: messagesError } = await supabaseAdmin
      .from("contact_messages")
      .select("id, name, message, created_at, is_replied")
      .order("created_at", { ascending: false })
      .limit(5);

    if (messagesError) {
      console.error("❌ Supabase messages error:", messagesError.message);
      return NextResponse.json(
        { error: "Failed to load contact stats" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      stats: {
        totalAmount,
        lastMonthAmount,
        totalDonors,
      },
      contactStats: {
        recentMessages: recentCount ?? 0,
        notReplied: notRepliedCount ?? 0,
      },
      latestMessages: messages ?? [],
    });
  } catch (err) {
    console.error("❌ Dashboard stats error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
