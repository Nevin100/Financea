import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/"];
const publicRoutes = ["/login"];



export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    console.log("Session:", session); // Debugging session content

    if (isProtectedRoute && !session?.userId) {
        console.log("Redirecting to login because session is invalid");
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
        console.log("Redirecting to home because user is already logged in");
        return NextResponse.redirect(new URL("/", req.nextUrl));        
    }

    return NextResponse.next();
}
