import { Resend } from "resend";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Buffer } from "buffer";
import path from "path";
import { readFile } from "fs/promises";

export const resend = new (Resend as any)(process.env.RESEND_API_KEY!);

export async function sendDonationReceipt({
  name,
  email,
  amount,
  paymentId,
}: {
  name: string;
  email: string;
  amount: number;
  paymentId: string;
}) {
  try {
    // ✅ Generate a professional PDF receipt dynamically
    const pdfBuffer = await generateReceiptPDF({ name, amount, paymentId });

    const subject = `Thank You for Your Donation - Receipt #${paymentId}`;
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Thank You, ${sanitize(name)}!</h2>
        <p>We sincerely appreciate your generous contribution of <strong>₹${amount}</strong> to the Nilgiri Tahr Conservation Project.</p>
        <p>Your donation helps protect wildlife and conserve biodiversity for future generations.</p>
        <p style="margin-top: 15px;">Please find your official donation receipt attached as a PDF.</p>
        <p>Warm regards,<br/>Nilgiri Tahr Project Team</p>
      </div>
    `;

    // ✅ Send the email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject,
      html,
      attachments: [
        {
          filename: `Donation_Receipt_${paymentId}.pdf`,
          content: Buffer.from(pdfBuffer).toString("base64"),
        },
      ],
    });

    console.log(`✅ Email receipt sent to ${email}`);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw new Error("Failed to send receipt email");
  }
}

/** Generate a donation receipt as a PDF buffer */
/** Generate a donation receipt as a professional PDF buffer */
async function generateReceiptPDF({
  name,
  amount,
  paymentId,
  orderId,
}: {
  name: string;
  amount: number;
  paymentId: string;
  orderId?: string;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const leftLogoPath = path.join(
    process.cwd(),
    "public",
    "logo",
    "header-left-logo.png"
  );
  const rightLogoPath = path.join(
    process.cwd(),
    "public",
    "logo",
    "header-right-logo.png"
  );

  // === TOP MARGIN BASE ===
  const topMargin = 150; // everything starts below this Y offset
  const centerX = width / 2;
  let y = height - topMargin;

  // === HEADER LOGOS ===
  try {
    const leftLogoBytes = await readFile(leftLogoPath);
    const leftLogo = await pdf.embedPng(leftLogoBytes);
    const leftDims = leftLogo.scale(0.2); // slightly smaller (was 0.25)
    page.drawImage(leftLogo, {
      x: 70,
      y: y - leftDims.height + 10, // align to margin base
      width: leftDims.width,
      height: leftDims.height,
    });
  } catch {
    console.warn("⚠️ Left logo missing");
  }

  try {
    const rightLogoBytes = await readFile(rightLogoPath);
    const rightLogo = await pdf.embedPng(rightLogoBytes);
    const rightDims = rightLogo.scale(0.2);
    page.drawImage(rightLogo, {
      x: width - rightDims.width - 70,
      y: y - rightDims.height + 10,
      width: rightDims.width,
      height: rightDims.height,
    });
  } catch {
    console.warn("⚠️ Right logo missing");
  }

  // === HEADER TEXT ===
  y -= 50; // push text below logos

  page.drawText("Government of Tamil Nadu", {
    x: centerX - 100,
    y: y + 20,
    size: 16,
    font: bold,
    color: rgb(0.1, 0.3, 0.1),
  });

  y -= 18;
  page.drawText("Tamil Nadu Forest Department", {
    x: centerX - 110,
    y: y + 10,
    size: 16,
    font: bold,
    color: rgb(0.1, 0.3, 0.1),
  });

  y -= 25;
  page.drawText("Project Nilgiri Tahr", {
    x: centerX - 70,
    y: y + 10,
    size: 16,
    font: bold,
    color: rgb(0.1, 0.3, 0.1),
  });

  // === DIVIDER LINE ===
  page.drawLine({
    start: { x: 60, y: y - 20 },
    end: { x: width - 60, y: y - 20 },
    thickness: 0.8,
    color: rgb(0.6, 0.6, 0.6),
  });

  y -= 60;
  page.drawText("Official Donation Receipt", {
    x: centerX - 80,
    y,
    size: 14,
    font: bold,
    color: rgb(0, 0.3, 0.6),
  });

  // === RECEIPT DETAILS ===
  const formattedAmount = `INR. ${amount.toLocaleString("en-IN")}`;
  const detailX = 90;
  y -= 60;

  const lineGap = 22;
  const details = [
    [`Donor Name`, name || "Anonymous"],
    [`Amount Donated`, formattedAmount],
    [`Payment ID`, paymentId],
    ...(orderId ? [[`Order ID`, orderId]] : []),
    [`Date`, new Date().toLocaleDateString("en-IN")],
  ];

  details.forEach(([label, value]) => {
    page.drawText(`${label}:`, {
      x: detailX,
      y,
      size: 12,
      font: bold,
      color: rgb(0.1, 0.1, 0.1),
    });
    page.drawText(`${value}`, {
      x: detailX + 140,
      y,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= lineGap;
  });

  // === ACKNOWLEDGMENT ===
  y -= 40;
  const acknowledgment = [
    "Thank you for your valuable contribution towards conserving the Nilgiri Tahr species.",
    "This receipt serves as official acknowledgment of your donation.",
  ];

  acknowledgment.forEach((line) => {
    page.drawText(line, {
      x: detailX,
      y,
      size: 11,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 18;
  });

  y -= 30;
  page.drawText("– Nilgiri Tahr Project Administration", {
    x: detailX,
    y,
    size: 11,
    font: bold,
    color: rgb(0.1, 0.3, 0.1),
  });

  // === FOOTER LINE & NOTE ===
  y -= 60;
  page.drawLine({
    start: { x: 60, y },
    end: { x: width - 60, y },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  y -= 25;
  page.drawText("This is a system-generated receipt. No signature required.", {
    x: centerX - 150,
    y,
    size: 9,
    font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdf.save();
  return pdfBytes;
}

// ✅ Simple sanitization
function sanitize(input: string) {
  return input.replace(/[<>]/g, "").trim();
}
