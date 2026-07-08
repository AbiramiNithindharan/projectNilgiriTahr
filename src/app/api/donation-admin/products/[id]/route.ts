import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/dashboard/auth/requireAdmin";
import { verifyCSRF } from "@/lib/dashboard/auth/verify-csrf";
import { supabaseClient } from "@/lib/supabaseClient";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const admin = await requireAdmin(req);
  if (!admin.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ product: data });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const admin = await requireAdmin(req);
  if (!admin.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!verifyCSRF(req)) {
    return NextResponse.json({ error: "Invalid CSRF" }, { status: 403 });
  }

  const formData = await req.formData();

  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File | null;
  let imageUrl: string | undefined;

  if (image && image.size > 0) {
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

    imageUrl = supabaseClient.storage.from("products").getPublicUrl(filePath)
      .data.publicUrl;
  }

  const updateData: {
    title: string;
    description: string;
    price: number;
    category: string;
    image_url?: string;
  } = {
    title,
    description,
    price: Number(price),
    category,
  };

  if (imageUrl) {
    updateData.image_url = imageUrl;
  }

  const { error } = await supabaseClient
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const admin = await requireAdmin(req);

  if (!admin.authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!verifyCSRF(req)) {
    return NextResponse.json({ error: "Invalid CSRF" }, { status: 403 });
  }

  const { error } = await supabaseClient.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
