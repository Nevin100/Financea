import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function verifyUser(req: NextRequest): string {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            throw new Error("Forbidden: Invalid Token");
        }
        throw new Error("Unknown Error while verifying token");
    }
}
