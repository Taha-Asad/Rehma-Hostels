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

interface FacebookInsightValue {
  value: number | Record<string, number>;
  end_time: string;
}

interface FacebookInsight {
  name: string;
  period: string;
  values: FacebookInsightValue[];
}

interface FacebookPost {
  id: string;
  message?: string;
  full_picture?: string;
  created_time: string;
  permalink_url: string;
  shares?: { count: number };
  likes?: { summary: { total_count: number } };
  comments?: { summary: { total_count: number } };
  insights?: {
    data: { name: string; values: { value: number }[] }[];
  };
}

async function getPageInsights(
  pageId: string,
  accessToken: string,
  dateRange: string
): Promise<FacebookInsight[]> {
  const { since, until } = getDateRange(dateRange);

  const metrics = [
    "page_fans",
    "page_fan_adds",
    "page_fan_removes",
    "page_views_total",
    "page_impressions",
    "page_impressions_unique",
    "page_engaged_users",
    "page_post_engagements",
    "page_fans_by_like_source",
    "page_fans_gender_age",
    "page_fans_country",
    "page_fans_city",
  ].join(",");

  const response = await fetchWithRetry<{ data: FacebookInsight[] }>(
    `${BASE_URL}/${pageId}/insights?metric=${metrics}&since=${since}&until=${until}&access_token=${accessToken}`
  );

  return response.data?.data || [];
}

async function getPagePosts(
  pageId: string,
  accessToken: string,
  limit: number = 25
): Promise<FacebookPost[]> {
  const fields = [
    "id",
    "message",
    "full_picture",
    "created_time",
    "permalink_url",
    "shares",
    "likes.summary(true)",
    "comments.summary(true)",
    "insights.metric(post_impressions,post_impressions_unique,post_engaged_users,post_clicks)",
  ].join(",");

  const response = await fetchWithRetry<{ data: FacebookPost[] }>(
    `${BASE_URL}/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${accessToken}`
  );

  return response.data?.data || [];
}

async function getPageInfo(
  pageId: string,
  accessToken: string
): Promise<{
  followers_count: number;
  fan_count: number;
  name: string;
} | null> {
  const response = await fetchWithRetry<{
    followers_count: number;
    fan_count: number;
    name: string;
  }>(
    `${BASE_URL}/${pageId}?fields=followers_count,fan_count,name&access_token=${accessToken}`
  );

  return response.data || null;
}

function parseInsightValue(insight: FacebookInsight): number {
  if (!insight?.values?.length) return 0;
  const value = insight.values[insight.values.length - 1].value;
  return typeof value === "number" ? value : 0;
}

function parseDemographicInsight(
  insight: FacebookInsight
): { label: string; value: number; percentage: number }[] {
  if (!insight?.values?.length) return [];
  const value = insight.values[insight.values.length - 1].value;

  if (typeof value !== "object") return [];

  const entries = Object.entries(value as Record<string, number>);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  return entries.map(([label, count]) => ({
    label,
    value: count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));
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

function transformPost(post: FacebookPost): Post {
  const insights = post.insights?.data || [];
  const reach =
    insights.find((i) => i.name === "post_impressions_unique")?.values[0]
      ?.value || 0;
  //   const engagement =
  //     insights.find((i) => i.name === "post_engaged_users")?.values[0]?.value ||
  //     0;
  const likes = post.likes?.summary?.total_count || 0;
  const comments = post.comments?.summary?.total_count || 0;
  const shares = post.shares?.count || 0;

  const totalInteractions = likes + comments + shares;
  const engagementRate = reach > 0 ? (totalInteractions / reach) * 100 : 0;

  return {
    id: post.id,
    thumbnail: post.full_picture || "",
    caption: post.message || "",
    type: post.full_picture ? "image" : "text",
    likes,
    comments,
    shares,
    reach,
    engagementRate,
    createdAt: post.created_time,
    permalink: post.permalink_url,
  };
}

export async function getFacebookData(
  dateRange: string = "30d"
): Promise<ApiResponse<SocialMediaData>> {
  try {
    const accessToken = await getToken("facebook");
    if (!accessToken) {
      return { success: false, error: "Facebook access token not found" };
    }

    const pageId = process.env.FACEBOOK_PAGE_ID;
    if (!pageId) {
      return { success: false, error: "Facebook page ID not configured" };
    }

    // Fetch all data in parallel
    const [pageInfo, insights, posts] = await Promise.all([
      getPageInfo(pageId, accessToken),
      getPageInsights(pageId, accessToken, dateRange),
      getPagePosts(pageId, accessToken, 25),
    ]);

    if (!pageInfo) {
      return { success: false, error: "Failed to fetch page info" };
    }

    // Parse insights
    const insightMap = new Map(insights.map((i) => [i.name, i]));

    const currentFollowers = pageInfo.fan_count || 0;
    const fanAdds = parseInsightValue(insightMap.get("page_fan_adds")!);
    const fanRemoves = parseInsightValue(insightMap.get("page_fan_removes")!);
    const previousFollowers = currentFollowers - fanAdds + fanRemoves;

    const impressions = parseInsightValue(insightMap.get("page_impressions")!);
    const reach = parseInsightValue(insightMap.get("page_impressions_unique")!);
    const engagedUsers = parseInsightValue(
      insightMap.get("page_engaged_users")!
    );
    const pageViews = parseInsightValue(insightMap.get("page_views_total")!);
    // const postEngagements = parseInsightValue(
    //   insightMap.get("page_post_engagements")!
    // );

    // Calculate totals from posts
    const totalLikes = posts.reduce(
      (sum, p) => sum + (p.likes?.summary?.total_count || 0),
      0
    );
    const totalComments = posts.reduce(
      (sum, p) => sum + (p.comments?.summary?.total_count || 0),
      0
    );
    const totalShares = posts.reduce(
      (sum, p) => sum + (p.shares?.count || 0),
      0
    );

    const engagementRate =
      currentFollowers > 0 ? (engagedUsers / currentFollowers) * 100 : 0;

    // Build stats
    const stats: PlatformStats = {
      followers: createStatItem(
        "Page Followers",
        currentFollowers,
        previousFollowers
      ),
      posts: createStatItem("Total Posts", posts.length),
      engagement: createStatItem("Engagement Rate", engagementRate),
      reach: createStatItem("Total Reach", reach),
      impressions: createStatItem("Impressions", impressions),
      likes: createStatItem("Total Likes", totalLikes),
      comments: createStatItem("Comments", totalComments),
      shares: createStatItem("Shares", totalShares),
      profileViews: createStatItem("Profile Views", pageViews),
    };

    // Parse audience data
    const genderAge = parseDemographicInsight(
      insightMap.get("page_fans_gender_age")!
    );
    const countries = parseDemographicInsight(
      insightMap.get("page_fans_country")!
    );
    const cities = parseDemographicInsight(insightMap.get("page_fans_city")!);

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
      const gender =
        item.label.split(".")[0] === "M"
          ? "Male"
          : item.label.split(".")[0] === "F"
          ? "Female"
          : "Other";
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

    // Transform posts
    const transformedPosts = posts.map(transformPost);
    const topPosts = [...transformedPosts]
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 5);

    // Generate chart data from insights
    const chartData: ChartDataPoint[] = [];
    const fanInsight = insightMap.get("page_fans");
    if (fanInsight?.values) {
      fanInsight.values.forEach((v) => {
        chartData.push({
          date: v.end_time.split("T")[0],
          followers: typeof v.value === "number" ? v.value : 0,
          engagement: engagementRate,
          reach: reach / fanInsight.values.length,
          impressions: impressions / fanInsight.values.length,
        });
      });
    }

    return {
      success: true,
      data: {
        platform: "facebook",
        stats,
        chartData,
        recentPosts: transformedPosts.slice(0, 10),
        topPosts,
        audience,
        lastUpdated: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Facebook API Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch Facebook data",
    };
  }
}
