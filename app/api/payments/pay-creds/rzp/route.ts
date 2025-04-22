/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/db_connection";
import RzpModel from "@/lib/models/Razorpay.model";
import { encrypt } from "@/lib/helpers/rpzCredsEncryption";
import { verifyUser } from "@/lib/helpers/verifyAuthUser";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        let userId: string;
        try {
            userId = verifyUser(req);
        } catch (err: any) {
            return NextResponse.json({ message: err.message }, { status: 403 });
        }

        const body = await req.json();
        const { keyId, keySecret } = body;

        if (!keyId || !keySecret) {
            return NextResponse.json({ message: "Key ID and Key Secret are required." }, { status: 400 });
        }

        const encryptedKeySecret = encrypt(keySecret);

        const result = await RzpModel.findOneAndUpdate(
            { userId: userId },
            { keyId, encryptedKeySecret },
            { upsert: true, new: true }
        );

        console.log(result);


        return NextResponse.json({ message: "Credentials saved successfully." }, { status: 201 });
    } catch (error: any) {
        console.error("Error Saving Razorpay Creds:", error.message);
        return NextResponse.json({ error: "Error Saving Razorpay Creds" }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        let userId: string;
        try {
            userId = verifyUser(req);
        } catch (err: any) {
            return NextResponse.json({ message: err.message }, { status: 403 });
        }

        const creds = await RzpModel.findOne({ userId });

        if (!creds) {
            return NextResponse.json({ message: "No Razorpay credentials found." }, { status: 204 });
        }

        return NextResponse.json(
            {
                keyId: creds.keyId,

            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error Checking Razorpay Creds:", error.message);
        return NextResponse.json({ error: "Error Checking Razorpay Creds" }, { status: 500 });
    }
}
