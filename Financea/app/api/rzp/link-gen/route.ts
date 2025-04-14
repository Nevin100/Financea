/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";  // <-- ADD THIS

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

        const notesObj = { message: "This is a note" };

        const paymentLinkPayload = {
            amount: body.amount,
            currency: body.currency,
            description: "Payment for your order",
            customer: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9876543210",
            },
            notify: {
                sms: true,
                email: true,
            },
            reminder_enable: true,
            notes: notesObj,
        };

        const authHeader = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

        // Axios call instead of fetch
        const razorpayRes = await axios.post(
            "https://api.razorpay.com/v1/payment_links",
            paymentLinkPayload,
            {
                headers: {
                    "Authorization": `Basic ${authHeader}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Send back the payment link data
        return NextResponse.json(razorpayRes.data, { status: 200 });

    } catch (error: any) {
        console.error("Error creating Razorpay Payment Link:", error.response?.data || error.message);
        return NextResponse.json(
            { error: "Failed to create payment link", details: error.response?.data || error.message },
            { status: 500 }
        );
    }
}
