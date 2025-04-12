// app/api/create-order/route.ts

import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

interface ApiReqType {
    amount: number,
    currency: "INR" | "USD",

}

// Check and throw if env vars are missing (at startup itself)
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Missing Razorpay environment variables");
}

// Create Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});


// POST API handler
export async function POST(req: NextRequest) {
    try {
        const body: ApiReqType = await req.json();


        // Validate required fields
        if (!body.amount) {
            return NextResponse.json({ error: "Amount is required" }, { status: 400 });
        }



        const notesObj = { message: "This is a note" }

        // Prepare order options
        const options = {
            amount: body.amount,            // Amount in paise (smallest currency unit)
            currency: body.currency,                // Currency
            receipt: `receipt_${Date.now()}`, // Unique receipt ID (optional)
            notes: notesObj, // For Additional info (optional)
            partial_payment: false, //False by default (optional)
        };

        // Create order on Razorpay
        const order = await razorpayInstance.orders.create(options);

        // Send back the order
        return NextResponse.json(order, { status: 200 });
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            { error: "Failed to create order", details: error.message },
            { status: 500 }
        );
    }
}
