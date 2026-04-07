import { supabaseClient } from "@/lib/supabaseClient";

export async function logAdminAction({
  action,
  admin,
  ip,
  userAgent,
}: {
  action: string;
  admin: string;
  ip: string;
  userAgent: string;
}) {
  try {
    await supabaseClient.from("admin_logs").insert([
      {
        action,
        admin_username: admin,
        ip,
        user_agent: userAgent,
      },
    ]);
  } catch (err) {
    console.error("Audit log failed:", err);
  }
}
