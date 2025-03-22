import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
    userId: string;
    expiresAt: number; // Store as a timestamp (milliseconds)
};


export async function createSession(userId: string) {
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    // Encrypt the session data (create JWT)
    const session = await encrypt({ userId, expiresAt });

    // Set the session cookie
    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true, 
        expires: new Date(expiresAt), // Convert timestamp back to Date for the cookie
    });
}




export async function encrypt(payload: SessionPayload) {
    const signedJWT = new SignJWT({
        ...payload,
        expiresAt: Number(payload.expiresAt), // Ensure expiresAt is a number
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(Math.floor(payload.expiresAt / 1000)) // Convert to seconds
        .sign(encodedKey);

    return signedJWT;
}

export async function decrypt(sessionCookie: string | undefined) {
    if (!sessionCookie) {
        console.error("Session cookie is missing");
        return null;
    }

    try {
        const { payload } = await jwtVerify(sessionCookie, encodedKey, { algorithms: ["HS256"] });

        // Convert `expiresAt` explicitly to a number and check expiration
        const expiresAt = Number(payload.expiresAt);

        if (expiresAt && expiresAt > Date.now()) {
            return {
                ...payload,
                expiresAt: new Date(expiresAt), // Convert to Date object
            };
        } else {
            console.error("Session has expired");
            return null;
        }

    } catch (error) {
        console.error("Failed to verify session", error);
        return null;
    }
}

