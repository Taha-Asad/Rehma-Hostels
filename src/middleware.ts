export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/not-authorized")) {
    return NextResponse.next();
  }

  const session = await auth();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && (!session || session.user.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
