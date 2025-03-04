import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import authConfig from "./lib/auth.config";

const protectedRoutes = ["/wallet"];
const authRoutes = ["/sign-in", "/sign-up"];

export const { auth } = NextAuth(authConfig);

// export default middleware((request: NextRequest & { auth: Session | null }) => {
//   const isLoggedIn = !!request.auth?.user;
//   const { pathname } = request.nextUrl;

//   const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
//   const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

//   if (isLoggedIn && isAuthPage) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (!isLoggedIn && isProtected) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// });

export default async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const session = await auth();
  
  const callbackUrl = searchParams.get("callbackUrl");

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

  if (session && isAuthPage) {
    if (callbackUrl) {
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!session && isProtected) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wallet(.*)", "/sign-in", "/sign-up"],
};
