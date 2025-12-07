// app/api/auth/tiktok/route.ts
import { NextRequest, NextResponse } from "next/server";

const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tiktok/callback`;

export async function GET(request: NextRequest) {
  const csrfState = Math.random().toString(36).substring(2);

  const scope = [
    "user.info.basic",
    "user.info.profile",
    "user.info.stats",
    "video.list",
  ].join(",");

  const authUrl =
    `https://www.tiktok.com/v2/auth/authorize/?` +
    `client_key=${CLIENT_KEY}&` +
    `scope=${scope}&` +
    `response_type=code&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `state=${csrfState}`;

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("tiktok_csrf_state", csrfState, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  return response;
}
