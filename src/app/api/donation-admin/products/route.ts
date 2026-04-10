import { NextResponse, NextRequest } from "next/server";
import { verifyCSRF } from "@/lib/dashboard/auth/verify-csrf";
import { requireAdmin } from "@/lib/dashboard/auth/requireAdmin";
import { supabaseClient } from "@/lib/supabaseClient";
import { logAdminAction } from "@/lib/dashboard/security/audit-log";
import { getIP } from "@/lib/redis/get-ip";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);

  if (!admin.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error: fetchError } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (fetchError) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}
export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req);
    //Verify admin (JWT cookie)
    const admin = await requireAdmin(req);
    if (!admin.authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = admin.payload.username;
    // Verify CSRF
    if (!verifyCSRF(req)) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 },
      );
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const productCode = formData.get("productCode") as string;
    const image = formData.get("image") as File;
    const sizes = JSON.parse(formData.get("sizes") as string);

    if (!title || !price || !image) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Upload image
    const filePath = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabaseClient.storage
      .from("products")
      .upload(filePath, image, {
        contentType: image.type,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 },
      );
    }

    const imageUrl = supabaseClient.storage
      .from("products")
      .getPublicUrl(filePath).data.publicUrl;

    // Insert product
    const { data: product, error: insertError } = await supabaseClient
      .from("products")
      .insert([
        {
          title,
          price: Number(price),
          description,
          product_code: productCode,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: "Product creation failed" },
        { status: 500 },
      );
    }

    // Insert stock
    for (const s of sizes) {
      await supabaseClient.from("product_stock").insert([
        {
          product_id: product.id,
          size: s.size,
          stock: Number(s.stock) || 0,
        },
      ]);
    }
    await logAdminAction({
      action: `PRODUCT_CREATED: ${title}`,
      admin: username,
      ip: ip,
      userAgent: req.headers.get("user-agent") || "unknown",
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
