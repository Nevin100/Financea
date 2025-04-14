/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/database/db_connection";
import RzpModel from "@/lib/models/Razorpay.model";
import { encrypt } from "@/lib/helpers/encryption";
import { verifyUser } from "@/lib/helpers/verifyAuthUser";

export async function POST(req: Request) {
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
        console.error("Razorpay Creds Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
