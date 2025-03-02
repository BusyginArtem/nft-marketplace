// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// import env from "./env";
import { auth } from "./lib/auth";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: env.AUTH_SECRET });

//   if (!token) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   return NextResponse.next();
// }

const protectedRoutes = ["/wallet"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    const session = await auth();
    console.log('session >>>>>>>>>>>>>>>>>>>>>', session)

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*"/((?!api|_next/static|_next/image|favicon.ico).*)", `/markets(.*)`,*/
    "/wallet(.*)",
  ],
};
