// actions/social-media.ts
"use server";

import { revalidatePath } from "next/cache";
import { ApiResponse, DateRange, SocialMediaData } from "../../types/social";
import { getFacebookData } from "@/lib/facebookApi";
import { getInstagramData } from "@/lib/instagramApi";
import { getTikTokData } from "@/lib/tiktokApi";

export async function fetchFacebookAnalytics(
  dateRange: DateRange = "30d"
): Promise<ApiResponse<SocialMediaData>> {
  try {
    const result = await getFacebookData(dateRange);

    if (result.success) {
      revalidatePath("/admin/social/facebook");
    }

    return result;
  } catch (error) {
    console.error("Server Action Error - Facebook:", error);
    return {
      success: false,
      error: "Failed to fetch Facebook analytics",
    };
  }
}

export async function fetchInstagramAnalytics(
  dateRange: DateRange = "30d"
): Promise<ApiResponse<SocialMediaData>> {
  try {
    const result = await getInstagramData(dateRange);

    if (result.success) {
      revalidatePath("/admin/social/instagram");
    }

    return result;
  } catch (error) {
    console.error("Server Action Error - Instagram:", error);
    return {
      success: false,
      error: "Failed to fetch Instagram analytics",
    };
  }
}

export async function fetchTikTokAnalytics(
  dateRange: DateRange = "30d"
): Promise<ApiResponse<SocialMediaData>> {
  try {
    const result = await getTikTokData(dateRange);

    if (result.success) {
      revalidatePath("/admin/social/tiktok");
    }

    return result;
  } catch (error) {
    console.error("Server Action Error - TikTok:", error);
    return {
      success: false,
      error: "Failed to fetch TikTok analytics",
    };
  }
}

export async function fetchAllPlatformsAnalytics(
  dateRange: DateRange = "30d"
): Promise<{
  facebook: ApiResponse<SocialMediaData>;
  instagram: ApiResponse<SocialMediaData>;
  tiktok: ApiResponse<SocialMediaData>;
}> {
  const [facebook, instagram, tiktok] = await Promise.all([
    getFacebookData(dateRange),
    getInstagramData(dateRange),
    getTikTokData(dateRange),
  ]);

  revalidatePath("/admin/social");

  return { facebook, instagram, tiktok };
}

export async function refreshPlatformData(
  platform: "facebook" | "instagram" | "tiktok",
  dateRange: DateRange = "30d"
): Promise<ApiResponse<SocialMediaData>> {
  switch (platform) {
    case "facebook":
      return fetchFacebookAnalytics(dateRange);
    case "instagram":
      return fetchInstagramAnalytics(dateRange);
    case "tiktok":
      return fetchTikTokAnalytics(dateRange);
    default:
      return { success: false, error: "Invalid platform" };
  }
}
