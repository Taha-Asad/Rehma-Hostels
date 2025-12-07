// app/api/auth/tiktok/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const storedState = request.cookies.get("tiktok_csrf_state")?.value;

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?error=${error}`
    );
  }

  if (!code || state !== storedState) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?error=invalid_state`
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_key: process.env.TIKTOK_CLIENT_KEY!,
          client_secret: process.env.TIKTOK_CLIENT_SECRET!,
          code,
          grant_type: "authorization_code",
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tiktok/callback`,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error.error_description || tokenData.error);
    }

    // In production, save these tokens to your database
    console.log("TikTok access token:", tokenData.access_token);
    console.log("TikTok refresh token:", tokenData.refresh_token);
    console.log("Expires in:", tokenData.expires_in, "seconds");

    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?success=tiktok_connected`
    );
    response.cookies.delete("tiktok_csrf_state");

    return response;
  } catch (error) {
    console.error("TikTok OAuth Error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?error=auth_failed`
    );
  }
}
