import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import env from "./env";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: env.AUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [/*"/((?!api|_next/static|_next/image|favicon.ico).*)",*/ "/markets(.*)", "/"],
};
