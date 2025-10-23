// lib/verifyWebhook.ts
import crypto from "crypto";

export function verifyRazorpaySignature(
  bodyBuffer: Buffer,
  headerSignature: string | null,
  webhookSecret: string
) {
  if (!headerSignature) return false;
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(bodyBuffer)
    .digest("hex");
  return expectedSignature === headerSignature;
}
