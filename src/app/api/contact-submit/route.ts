import { validateContact } from "@/lib/validation/contact";
import { verifyCSRF } from "@/lib/dashboard/auth/verify-csrf";
import { contactRateLimiter } from "@/lib/redis/rate-limit";
import { NextRequest } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

/* =========================
   ✅ GET → Fetch Contacts
========================= */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await supabaseClient
      .from("contact_messages")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Supabase GET Error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data, total: count, page, limit });
  } catch (err) {
    console.error("GET Contacts Error:", err);
    return Response.json(
      { error: "Server error fetching contacts" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /* -------------------- Honeypot -------------------- */
    if (body.company) {
      return new Response(JSON.stringify({ error: "Spam detected" }), {
        status: 400,
      });
    }

    /* -------------------- Validation -------------------- */
    const errors = validateContact(body);
    if (errors.length > 0) {
      return new Response(JSON.stringify({ errors }), { status: 400 });
    }

    /* -------------------- IP Detection -------------------- */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    /* -------------------- CSRF Protection -------------------- */
    if (!verifyCSRF(req)) {
      return new Response(JSON.stringify({ error: "Invalid CSRF token" }), {
        status: 403,
      });
    }

    /* -------------------- Rate Limiting (Redis) -------------------- */
    const { success } = await contactRateLimiter.limit(ip);

    if (!success) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Try again later." }),
        { status: 429 },
      );
    }

    /* -------------------- Enrich Data -------------------- */
    const userAgent = req.headers.get("user-agent") || "unknown";

    const enrichedBody = {
      ...body,
      ip_address: ip,
      user_agent: userAgent,
    };

    /* -------------------- Timeout Protection -------------------- */
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const result = await fetch(
      `${process.env.SUPABASE_FUNCTION_URL}/contact-email`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrichedBody),
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    const text = await result.text();

    return new Response(text, { status: result.status });
  } catch (err) {
    console.error("Contact API Error:", err);

    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const { error } = await supabaseClient
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    const { error } = await supabaseClient
      .from("contact_messages")
      .update({ is_replied: true })
      .eq("id", id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}
