// app/api/auth/facebook/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?error=${error}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?error=no_code`
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
        `client_id=${process.env.META_APP_ID}&` +
        `client_secret=${process.env.META_APP_SECRET}&` +
        `redirect_uri=${encodeURIComponent(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`
        )}&` +
        `code=${code}`
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error.message);
    }

    // Get long-lived token
    const longLivedResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
        `grant_type=fb_exchange_token&` +
        `client_id=${process.env.META_APP_ID}&` +
        `client_secret=${process.env.META_APP_SECRET}&` +
        `fb_exchange_token=${tokenData.access_token}`
    );

    const longLivedData = await longLivedResponse.json();

    // In production, save this token to your database
    console.log("Long-lived access token:", longLivedData.access_token);
    console.log("Expires in:", longLivedData.expires_in, "seconds");

    // For now, redirect with success message
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?success=facebook_connected`
    );
  } catch (error) {
    console.error("Facebook OAuth Error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/social?error=auth_failed`
    );
  }
}
