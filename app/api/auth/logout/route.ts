import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth/cookies"; 

export async function POST() {
  clearAuthCookie(); // ✅ Logout hone pe cookies clear karo
  return NextResponse.json({ message: "Logout successful" });
}