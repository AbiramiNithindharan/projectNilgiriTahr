// src/lib/razorpay.ts
import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY_ID!;
const key_secret = process.env.RAZORPAY_KEY_SECRET!;

if (!key_id || !key_secret) {
  throw new Error("❌ Missing Razorpay keys in environment variables.");
}

export const razorpay = new Razorpay({
  key_id,
  key_secret,
});

export const paiseFromRupee = (amountInRupee: number) =>
  Math.round(amountInRupee * 100);
