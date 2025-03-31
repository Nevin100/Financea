/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  // Public Routes
  const publicRoutes = ["/login", "/signup"];
  
  // Private Routes
  const privateRoutes = ["/", "/expenses", "/invoices", "/payments", "/reports", "/settings"];

  // // ✅ Agar user private route pe hai aur login nahi hai, toh login page pe redirect karo
  // if (privateRoutes.includes(req.nextUrl.pathname) && !token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // // ✅ Agar user logged in hai aur login ya signup pe ja raha hai, toh home page pe redirect karo
  // if (publicRoutes.includes(req.nextUrl.pathname) && token) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/expenses", "/invoices", "/payments", "/reports", "/settings", "/login", "/signup"],
};



// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import { decrypt,SessionPayload } from "../app/lib/session";


// const protectedRoutes = ["/"];
// const publicRoutes = ["/login"];



// export default async function middleware(req: NextRequest) {
//     // const path = req.nextUrl.pathname;
//     // const isProtectedRoute = protectedRoutes.includes(path);
//     // const isPublicRoute = publicRoutes.includes(path);

//     // const cookie = (await cookies()).get("session")?.value;
//     // const session : SessionPayload | any = await decrypt(cookie); // watch the type

//     // console.log("Session:", session); // Debugging session content

//     // if (isProtectedRoute && !session?.userId) {
//     //     console.log("Redirecting to login because session is invalid");
//     //     return NextResponse.redirect(new URL("/login", req.nextUrl));
//     // }

//     // if (isPublicRoute && session?.userId) {
//     //     console.log("Redirecting to home because user is already logged in");
//     //     return NextResponse.redirect(new URL("/", req.nextUrl));        
//     // }

//     return NextResponse.next();
// }
