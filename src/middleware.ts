import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow public route
  if (pathname.startsWith("/not-authorized")) return NextResponse.next();

  const secret = process.env.AUTH_SECRET;

  const token = await getToken({ req, secret });

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && (!token || token.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
