// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "./lib/auth";
import { Session } from "next-auth";

// export async function middleware(req: NextRequest) {
//   const session = await auth();

//   if (!session) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   return NextResponse.next();
// }

const protectedRoutes = ["/wallet"];

export default auth(async function middleware(req: NextRequest & { auth: Session | null }) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    const session = req.auth;

    if (!session) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    console.log(`Authenticated request to ${pathname} by ${session.user?.email}`);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/wallet/:path*"],
  // matcher: ["/wallet(.*)"],
};

// export const runtime = "nodejs";
