import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { sendDonationReceipt } from "@/lib/email";
// --- Helpers ---
function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>\/\\'"`;]/g, "");
}

function validateEmail(email: string): boolean {
  return /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

function validateName(name: string): boolean {
  return /^[a-zA-Z\s'.-]{2,50}$/.test(name);
}

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

    // --- Sanitize all incoming values ---
    const paymentId = sanitizeInput(razorpay_payment_id);
    const orderId = sanitizeInput(razorpay_order_id);
    const signature = sanitizeInput(razorpay_signature);
    const safeName = sanitizeInput(name);
    const safeEmail = sanitizeInput(email);
    const safeAmount = Number(amount);

    // --- Validation ---
    if (!paymentId || !orderId || !signature) {
      return NextResponse.json(
        { error: "Missing payment fields." },
        { status: 400 },
      );
    }

    if (
      !safeAmount ||
      isNaN(safeAmount) ||
      safeAmount < 10 ||
      safeAmount > 100000
    ) {
      return NextResponse.json(
        { error: "Invalid payment amount." },
        { status: 400 },
      );
    }

    if (safeEmail && !validateEmail(safeEmail)) {
      return NextResponse.json(
        { error: "Invalid donor email." },
        { status: 400 },
      );
    }

    if (safeName && !validateName(safeName)) {
      return NextResponse.json(
        { error: "Invalid donor name." },
        { status: 400 },
      );
    }

    // --- Signature Verification ---
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      console.warn("⚠️ Invalid Razorpay signature detected");
      return NextResponse.json({
        success: false,
        message: "Invalid signature",
      });
    }

    const { data: existingPayment } = await supabaseAdmin
      .from("donations")
      .select("id")
      .eq("payment_id", paymentId)
      .single();

    if (existingPayment) {
      console.warn("⚠️ Duplicate payment verification attempt");

      return NextResponse.json({
        success: true,
        referenceId: orderId,
        amount: safeAmount,
      });
    }
    const receiptNo = `NT-${new Date().getFullYear()}-${orderId.slice(-6)}`;
    // --- Store in Supabase ---
    const { error } = await supabaseAdmin.from("donations").insert([
      {
        payment_id: paymentId,
        order_id: orderId,
        razorpay_signature: signature,
        receipt_no: receiptNo,
        name: safeName || "anonymous",
        email: safeEmail || "",
        amount: safeAmount,
        status: "paid",
        created_at: new Date().toISOString(),
      },
    ]);
    await sendDonationReceipt({
      name: safeName,
      email: safeEmail,
      amount: safeAmount,
      paymentId: razorpay_payment_id,
    });

    if (error) {
      console.error("❌ Supabase insertion error:", error.message);
      return NextResponse.json(
        { error: "Failed to store payment record." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      referenceId: receiptNo,
    });
  } catch (err: any) {
    console.error("❌ Verification error:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
