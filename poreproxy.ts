// // proxy.ts  (project root, next to app/)
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get("session")?.value;
//   console.log("Middlewere Reached");
  

//   const PROTECTED_PREFIXES = [
//     "/dashboard",
//     "/utilities",
//     "/bills",
//     "/recharge-now",
//     "/payments",
//     "/notifications",
//     "/settings",
//   ];
//   const AUTH_PREFIXES = ["/login", "/register"];

//   const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
//   const isAuthRoute = AUTH_PREFIXES.some((p) => pathname.startsWith(p));  

//   // Optimistic check only — verify the session properly in your data layer / route handlers.
//   if (isProtected && !token) {
//     console.log("ashche");
    
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
