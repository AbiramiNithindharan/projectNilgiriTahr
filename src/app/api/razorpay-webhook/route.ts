// app/api/razorpay-webhook/route.ts
import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/verifyWebhook';


export async function POST(req: Request) {
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
if (!webhookSecret) {
console.error('MISSING RAZORPAY_WEBHOOK_SECRET');
return NextResponse.json({ ok: false }, { status: 500 });
}


const arrayBuffer = await req.arrayBuffer();
const buf = Buffer.from(arrayBuffer);
const headerSig = req.headers.get('x-razorpay-signature');


const isValid = verifyRazorpaySignature(buf, headerSig, webhookSecret);


if (!isValid) {
console.warn('Invalid webhook signature');
return NextResponse.json({ ok: false }, { status: 400 });
}


try {
const event = JSON.parse(buf.toString());
// handle events e.g. payment.captured
const eventType = event.event;
console.log('Razorpay webhook event:', eventType);


if (eventType === 'payment.captured') {
const payment = event.payload.payment.entity;
// TODO: idempotently store donation in DB and send receipt email
// Example fields: payment.id, payment.order_id, payment.amount
console.log('Payment captured for amount:', payment.amount);
}


return NextResponse.json({ ok: true });
} catch (err) {
console.error('Webhook handler error', err);
return NextResponse.json({ ok: false }, { status: 500 });
}
}