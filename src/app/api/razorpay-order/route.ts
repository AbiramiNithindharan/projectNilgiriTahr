import { NextResponse } from "next/server";
import { razorpay, paiseFromRupee } from "@/lib/razorpay";

// --- Helper: Sanitize and Validate Inputs ---
function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>\/\\'"`;]/g, ""); // strip XSS-sensitive chars
}

function validateEmail(email: string): boolean {
  return /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

function validateName(name: string): boolean {
  return /^[a-zA-Z\s'.-]{2,50}$/.test(name);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawAmount = body.amount;
    const rawName = body.name;
    const rawEmail = body.email;

    const name = sanitizeInput(rawName);
    const email = sanitizeInput(rawEmail);
    const amount = Number(rawAmount);

    // --- Validation checks ---
    if (!amount || isNaN(amount) || amount < 10 || amount > 100000) {
      return NextResponse.json(
        {
          error: "Invalid donation amount. Must be between ₹10 and ₹1,00,000.",
        },
        { status: 400 }
      );
    }

    if (name && !validateName(name)) {
      return NextResponse.json(
        { error: "Invalid donor name format." },
        { status: 400 }
      );
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const options = {
      amount: paiseFromRupee(amount),
      currency: "INR",
      receipt: `donation_rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        donor_name: name || "anonymous",
        donor_email: email || "",
      },
    } as any;

    const order = await razorpay.orders.create(options);

    // ✅ Do not log sensitive order IDs or keys in production
    console.info("✅ Razorpay order created:", {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("❌ Error creating Razorpay order:", err.message);
    return NextResponse.json(
      { error: "Failed to create Razorpay order." },
      { status: 500 }
    );
  }
}
