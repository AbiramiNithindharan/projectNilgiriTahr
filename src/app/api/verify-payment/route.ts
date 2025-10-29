import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      name,
      email,
      amount,
    } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid signature",
      });
    }
    // ✅ Store to Supabase
    const { error } = await supabaseAdmin.from("donations").insert({
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      razorpay_signature,
      name,
      email,
      amount,
      status: "paid",
    });

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { error: "Database save failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Verification Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
