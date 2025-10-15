import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Identify document type and slug
    const docType = body?._type;
    const slug = body?.slug?.current;

    console.log("🔔 Revalidate triggered:", docType, slug);

    // Always revalidate homepage
    revalidatePath("/");

    // Revalidate specific paths
    if (docType === "category" && slug) {
      revalidatePath(`/news-categories/${slug}`);
    }

    if (docType === "post" && slug) {
      // You might have posts nested under a category
      revalidatePath(`/news/${slug}`);
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error("❌ Revalidate error:", err);
    return NextResponse.json(
      { revalidated: false, error: "Invalid request" },
      { status: 500 }
    );
  }
}
