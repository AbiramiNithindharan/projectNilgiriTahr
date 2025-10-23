// app/api/razorpay-order/route.ts
import { NextResponse } from 'next/server';
import { razorpay, paiseFromRupee } from '@/lib/razorpay';


export async function POST(req: Request) {
try {
const { amount, name, email } = await req.json();


if (!amount || typeof amount !== 'number') {
return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
}


const options = {
amount: paiseFromRupee(amount),
currency: 'INR',
receipt: `donation_rcpt_${Date.now()}`,
payment_capture: 1,
notes: {
donor_name: name || 'anonymous',
donor_email: email || '',
},
} as any;


const order = await razorpay.orders.create(options);


// Return the order to client (do NOT return secrets)
return NextResponse.json(order);
} catch (err: any) {
console.error('Error creating razorpay order', err);
return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
}
}