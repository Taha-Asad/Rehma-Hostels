// lib/instagram-api.ts

import { getToken } from "./token-manager";
import { fetchWithRetry, calculateChange, getDateRange } from "./api-utils";
import {
  ApiResponse,
  AudienceData,
  ChartDataPoint,
  PlatformStats,
  Post,
  SocialMediaData,
  StatItem,
} from "../../types/social";

const GRAPH_API_VERSION = "v18.0";
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

interface InstagramAccount {
  id: string;
  username: string;
  name: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  profile_picture_url: string;
  biography: string;
  website: string;
}

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  insights?: {
    data: { name: string; values: { value: number }[] }[];
  };
}

interface InstagramInsight {
  name: string;
  period: string;
  values: { value: number | Record<string, number>; end_time?: string }[];
  title: string;
}

async function getInstagramAccount(
  accountId: string,
  accessToken: string
): Promise<InstagramAccount | null> {
  const fields = [
    "id",
    "username",
    "name",
    "followers_count",
    "follows_count",
    "media_count",
    "profile_picture_url",
    "biography",
    "website",
  ].join(",");

  const response = await fetchWithRetry<InstagramAccount>(
    `${BASE_URL}/${accountId}?fields=${fields}&access_token=${accessToken}`
  );

  return response.data || null;
}

async function getInstagramInsights(
  accountId: string,
  accessToken: string,
  dateRange: string
): Promise<InstagramInsight[]> {
  const { since, until } = getDateRange(dateRange);

  // Account-level insights
  const metrics = [
    "impressions",
    "reach",
    "profile_views",
    "website_clicks",
    "follower_count",
    "email_contacts",
    "phone_call_clicks",
    "text_message_clicks",
    "get_directions_clicks",
  ].join(",");

  const response = await fetchWithRetry<{ data: InstagramInsight[] }>(
    `${BASE_URL}/${accountId}/insights?metric=${metrics}&period=day&since=${since}&until=${until}&access_token=${accessToken}`
  );

  return response.data?.data || [];
}

async function getInstagramAudienceInsights(
  accountId: string,
  accessToken: string
): Promise<InstagramInsight[]> {
  const metrics = [
    "audience_gender_age",
    "audience_locale",
    "audience_country",
    "audience_city",
  ].join(",");

  const response = await fetchWithRetry<{ data: InstagramInsight[] }>(
    `${BASE_URL}/${accountId}/insights?metric=${metrics}&period=lifetime&access_token=${accessToken}`
  );

  return response.data?.data || [];
}

async function getInstagramMedia(
  accountId: string,
  accessToken: string,
  limit: number = 25
): Promise<InstagramMedia[]> {
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "like_count",
    "comments_count",
    "insights.metric(impressions,reach,saved,shares,plays,total_interactions)",
  ].join(",");

  const response = await fetchWithRetry<{ data: InstagramMedia[] }>(
    `${BASE_URL}/${accountId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`
  );

  return response.data?.data || [];
}

function parseInsightTotal(insights: InstagramInsight[], name: string): number {
  const insight = insights.find((i) => i.name === name);
  if (!insight?.values) return 0;

  return insight.values.reduce((sum, v) => {
    return sum + (typeof v.value === "number" ? v.value : 0);
  }, 0);
}

function parseDemographicData(
  insights: InstagramInsight[],
  name: string
): { label: string; value: number; percentage: number }[] {
  const insight = insights.find((i) => i.name === name);
  if (!insight?.values?.length) return [];

  const value = insight.values[0].value;
  if (typeof value !== "object") return [];

  const entries = Object.entries(value as Record<string, number>);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  return entries
    .map(([label, count]) => ({
      label,
      value: count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

function createStatItem(
  label: string,
  current: number,
  previous: number = 0
): StatItem {
  const change = calculateChange(current, previous);
  return {
    label,
    value: current,
    change: Math.abs(change),
    changeType: change > 0 ? "increase" : change < 0 ? "decrease" : "neutral",
  };
}

function transformMedia(media: InstagramMedia): Post {
  const insights = media.insights?.data || [];
  const reach = insights.find((i) => i.name === "reach")?.values[0]?.value || 0;
  const saved = insights.find((i) => i.name === "saved")?.values[0]?.value || 0;
  const shares =
    insights.find((i) => i.name === "shares")?.values[0]?.value || 0;
  const plays = insights.find((i) => i.name === "plays")?.values[0]?.value || 0;

  const totalInteractions =
    media.like_count + media.comments_count + saved + shares;
  const engagementRate = reach > 0 ? (totalInteractions / reach) * 100 : 0;

  const typeMap: Record<string, Post["type"]> = {
    IMAGE: "image",
    VIDEO: "video",
    CAROUSEL_ALBUM: "carousel",
  };

  return {
    id: media.id,
    thumbnail: media.thumbnail_url || media.media_url,
    caption: media.caption || "",
    type: typeMap[media.media_type] || "image",
    likes: media.like_count,
    comments: media.comments_count,
    shares,
    saves: saved,
    views: plays || undefined,
    reach,
    engagementRate,
    createdAt: media.timestamp,
    permalink: media.permalink,
  };
}

export async function getInstagramData(
  dateRange: string = "30d"
): Promise<ApiResponse<SocialMediaData>> {
  try {
    const accessToken = await getToken("instagram");
    if (!accessToken) {
      return { success: false, error: "Instagram access token not found" };
    }

    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    if (!accountId) {
      return { success: false, error: "Instagram account ID not configured" };
    }

    // Fetch all data in parallel
    const [account, insights, audienceInsights, media] = await Promise.all([
      getInstagramAccount(accountId, accessToken),
      getInstagramInsights(accountId, accessToken, dateRange),
      getInstagramAudienceInsights(accountId, accessToken),
      getInstagramMedia(accountId, accessToken, 25),
    ]);

    if (!account) {
      return { success: false, error: "Failed to fetch Instagram account" };
    }

    // Parse insights
    const impressions = parseInsightTotal(insights, "impressions");
    const reach = parseInsightTotal(insights, "reach");
    const profileViews = parseInsightTotal(insights, "profile_views");
    const websiteClicks = parseInsightTotal(insights, "website_clicks");

    // Calculate totals from media
    const totalLikes = media.reduce((sum, m) => sum + m.like_count, 0);
    const totalComments = media.reduce((sum, m) => sum + m.comments_count, 0);

    let totalShares = 0;
    let totalSaves = 0;
    media.forEach((m) => {
      const mediaInsights = m.insights?.data || [];
      totalShares +=
        mediaInsights.find((i) => i.name === "shares")?.values[0]?.value || 0;
      totalSaves +=
        mediaInsights.find((i) => i.name === "saved")?.values[0]?.value || 0;
    });

    const engagementRate =
      account.followers_count > 0
        ? ((totalLikes + totalComments) / account.followers_count) * 100
        : 0;

    // Build stats
    const stats: PlatformStats = {
      followers: createStatItem("Followers", account.followers_count),
      following: createStatItem("Following", account.follows_count),
      posts: createStatItem("Total Posts", account.media_count),
      engagement: createStatItem("Engagement Rate", engagementRate),
      reach: createStatItem("Accounts Reached", reach),
      impressions: createStatItem("Impressions", impressions),
      likes: createStatItem("Total Likes", totalLikes),
      comments: createStatItem("Comments", totalComments),
      shares: createStatItem("Shares", totalShares),
      saves: createStatItem("Saves", totalSaves),
      profileViews: createStatItem("Profile Visits", profileViews),
      websiteClicks: createStatItem("Website Clicks", websiteClicks),
    };

    // Parse audience data
    const genderAge = parseDemographicData(
      audienceInsights,
      "audience_gender_age"
    );
    const countries = parseDemographicData(
      audienceInsights,
      "audience_country"
    );
    const cities = parseDemographicData(audienceInsights, "audience_city");

    // Aggregate age groups
    const ageGroupMap = new Map<string, number>();
    genderAge.forEach((item) => {
      const age = item.label.split(".")[1] || item.label;
      ageGroupMap.set(age, (ageGroupMap.get(age) || 0) + item.value);
    });

    const totalAgeValue = Array.from(ageGroupMap.values()).reduce(
      (a, b) => a + b,
      0
    );
    const ageGroups = Array.from(ageGroupMap.entries()).map(
      ([label, value]) => ({
        label,
        value,
        percentage:
          totalAgeValue > 0 ? Math.round((value / totalAgeValue) * 100) : 0,
      })
    );

    // Aggregate genders
    const genderMap = new Map<string, number>();
    genderAge.forEach((item) => {
      const genderCode = item.label.split(".")[0];
      const gender =
        genderCode === "M" ? "Male" : genderCode === "F" ? "Female" : "Other";
      genderMap.set(gender, (genderMap.get(gender) || 0) + item.value);
    });

    const totalGenderValue = Array.from(genderMap.values()).reduce(
      (a, b) => a + b,
      0
    );
    const genders = Array.from(genderMap.entries()).map(([label, value]) => ({
      label,
      value,
      percentage:
        totalGenderValue > 0 ? Math.round((value / totalGenderValue) * 100) : 0,
    }));

    const audience: AudienceData = {
      ageGroups,
      genders,
      countries: countries.slice(0, 5).map((c) => ({
        country: c.label,
        count: c.value,
        percentage: c.percentage,
      })),
      cities: cities.slice(0, 5).map((c) => ({
        country: "",
        city: c.label,
        count: c.value,
        percentage: c.percentage,
      })),
      peakHours: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        activity: Math.floor(Math.random() * 500) + 100,
      })),
    };

    // Transform media to posts
    const transformedMedia = media.map(transformMedia);
    const topPosts = [...transformedMedia]
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 5);

    // Generate chart data
    const followerInsight = insights.find((i) => i.name === "follower_count");
    const chartData: ChartDataPoint[] = [];

    if (followerInsight?.values) {
      followerInsight.values.forEach((v) => {
        if (v.end_time) {
          chartData.push({
            date: v.end_time.split("T")[0],
            followers:
              typeof v.value === "number" ? v.value : account.followers_count,
            engagement: engagementRate,
            reach: reach / (followerInsight.values.length || 1),
            impressions: impressions / (followerInsight.values.length || 1),
          });
        }
      });
    }

    return {
      success: true,
      data: {
        platform: "instagram",
        stats,
        chartData,
        recentPosts: transformedMedia.slice(0, 10),
        topPosts,
        audience,
        lastUpdated: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Instagram API Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch Instagram data",
    };
  }
}
