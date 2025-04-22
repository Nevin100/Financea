import connectDB from "@/lib/database/db_connection";
import { decrypt } from "@/lib/helpers/rpzCredsEncryption";
import RzpModel from "@/lib/models/Razorpay.model";

interface RazorpayCreds {
    _id: string;
    userId: string;
    keyId: string;
    encryptedKeySecret: string;
    createdAt: Date;
}

interface RzpCredsReturnType {
    keyId: string,
    keySecret: string
}

export async function getRzpCreds(userId: string): Promise<RzpCredsReturnType> {
    await connectDB();

    const rzpCreds = await RzpModel.findOne({ userId }) as RazorpayCreds;

    if (!rzpCreds) {
        throw new Error("Razorpay credentials not found for this user");
    }

    const decryptedKeySecret = decrypt(rzpCreds.encryptedKeySecret);

    return {
        keyId: rzpCreds.keyId,
        keySecret: decryptedKeySecret,
    };
}
