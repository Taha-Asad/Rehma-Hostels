export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth"; // <-- THIS is correct for v5

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow this route
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
