// app/api/auth/facebook/route.ts
import { NextRequest, NextResponse } from "next/server";

const META_APP_ID = process.env.META_APP_ID!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;

export async function GET(request: NextRequest) {
  const scope = [
    "pages_show_list",
    "pages_read_engagement",
    "pages_read_user_content",
    "read_insights",
    "instagram_basic",
    "instagram_manage_insights",
    "business_management",
  ].join(",");

  const authUrl =
    `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${META_APP_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `scope=${scope}&` +
    `response_type=code`;

  return NextResponse.redirect(authUrl);
}
