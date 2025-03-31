/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// ✅ Token ko securely store karne ke liye cookies set karne ka function
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
   cookieStore.set("token", token, {
    httpOnly: true, // ✅ Prevent frontend access
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

// ✅ Cookies se token retrieve karne ka function
export async function getAuthToken(): Promise<string | null> {
  return (await cookies()).get("token")?.value || null;
}

// ✅ Logout hone pe token remove karne ka function
export async function clearAuthCookie() {
  (await cookies()).set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Token immediately expire hoga
  });
}

// ✅ Token verify karne ka function
export function verifyAuthToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return error; // Invalid token
  }
}
