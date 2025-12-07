// lib/token-manager.ts

import { Platform, SocialToken } from "../../types/social";

// In-memory cache for tokens (use database in production)
const tokenCache = new Map<Platform, SocialToken>();

// For production, you'd use a database like Prisma
// This is a simplified version using environment variables

export async function getToken(platform: Platform): Promise<string | null> {
  // Check cache first
  const cached = tokenCache.get(platform);
  if (cached && new Date(cached.expiresAt) > new Date()) {
    return cached.accessToken;
  }

  // Get from environment variables
  switch (platform) {
    case "facebook":
    case "instagram":
      return process.env.FACEBOOK_ACCESS_TOKEN || null;
    case "tiktok":
      return process.env.TIKTOK_ACCESS_TOKEN || null;
    default:
      return null;
  }
}

export async function refreshFacebookToken(
  currentToken: string
): Promise<string | null> {
  try {
    const appId = process.env.META_APP_ID;
    const appSecret = process.env.META_APP_SECRET;

    const response = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
        `grant_type=fb_exchange_token&` +
        `client_id=${appId}&` +
        `client_secret=${appSecret}&` +
        `fb_exchange_token=${currentToken}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to refresh Facebook token:", error);
    return null;
  }
}

export async function refreshTikTokToken(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const response = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_key: process.env.TIKTOK_CLIENT_KEY!,
          client_secret: process.env.TIKTOK_CLIENT_SECRET!,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.error("Failed to refresh TikTok token:", error);
    return null;
  }
}

export function setTokenCache(platform: Platform, token: SocialToken): void {
  tokenCache.set(platform, token);
}
