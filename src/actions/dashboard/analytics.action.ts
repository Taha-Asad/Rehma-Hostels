// app/actions/analytics.ts
"use server";

import {
  getAnalyticsClient,
  formatDuration,
  calculateChange,
} from "@/lib/googleAnalytics";
import { AnalyticsData, RealTimeData, TopPage } from "../../../types/analytics";

const propertyId = process.env.GA_PROPERTY_ID;

export async function getAnalyticsData(): Promise<{
  success: boolean;
  data?: AnalyticsData;
  error?: string;
}> {
  try {
    const client = getAnalyticsClient();

    // Current period data
    const [currentResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
        { name: "newUsers" },
      ],
    });

    // Previous period data for comparison
    const [previousResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "14daysAgo", endDate: "8daysAgo" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
        { name: "newUsers" },
      ],
    });

    const current = currentResponse.rows?.[0]?.metricValues || [];
    const previous = previousResponse.rows?.[0]?.metricValues || [];

    const getValue = (arr: any[], index: number): number =>
      parseFloat(arr[index]?.value || "0");

    const activeUsersChange = calculateChange(
      getValue(current, 0),
      getValue(previous, 0)
    );
    const pageViewsChange = calculateChange(
      getValue(current, 1),
      getValue(previous, 1)
    );
    const sessionsChange = calculateChange(
      getValue(current, 2),
      getValue(previous, 2)
    );
    const bounceRateChange = calculateChange(
      getValue(current, 3),
      getValue(previous, 3)
    );
    const newUsersChange = calculateChange(
      getValue(current, 5),
      getValue(previous, 5)
    );

    const data: AnalyticsData = {
      activeUsers: {
        value: getValue(current, 0),
        ...activeUsersChange,
      },
      pageViews: {
        value: getValue(current, 1),
        ...pageViewsChange,
      },
      sessions: {
        value: getValue(current, 2),
        ...sessionsChange,
      },
      bounceRate: {
        value: Math.round(getValue(current, 3) * 100) / 100,
        ...bounceRateChange,
      },
      avgSessionDuration: formatDuration(getValue(current, 4)),
      newUsers: {
        value: getValue(current, 5),
        ...newUsersChange,
      },
    };

    return { success: true, data };
  } catch (error) {
    console.error("Analytics error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch analytics",
    };
  }
}

export async function getTopPages(): Promise<{
  success: boolean;
  data?: TopPage[];
  error?: string;
}> {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
      orderBys: [
        {
          metric: { metricName: "screenPageViews" },
          desc: true,
        },
      ],
      limit: 10,
    });

    const topPages: TopPage[] =
      response.rows?.map((row) => ({
        path: row.dimensionValues?.[0]?.value || "/",
        title: row.dimensionValues?.[1]?.value || "Unknown",
        views: parseInt(row.metricValues?.[0]?.value || "0"),
        uniqueViews: parseInt(row.metricValues?.[1]?.value || "0"),
      })) || [];

    return { success: true, data: topPages };
  } catch (error) {
    console.error("Top pages error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch top pages",
    };
  }
}

export async function getRealTimeData(): Promise<{
  success: boolean;
  data?: RealTimeData;
  error?: string;
}> {
  try {
    const client = getAnalyticsClient();

    const [response] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: "unifiedScreenName" }],
      metrics: [{ name: "activeUsers" }],
    });

    const totalActiveUsers =
      response.rows?.reduce(
        (sum, row) => sum + parseInt(row.metricValues?.[0]?.value || "0"),
        0
      ) || 0;

    const topActivePages =
      response.rows?.slice(0, 5).map((row) => ({
        page: row.dimensionValues?.[0]?.value || "Unknown",
        users: parseInt(row.metricValues?.[0]?.value || "0"),
      })) || [];

    // Get page views per minute
    const [minuteResponse] = await client.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: "screenPageViews" }],
      minuteRanges: [{ startMinutesAgo: 1, endMinutesAgo: 0 }],
    });

    const pageViewsPerMinute = parseInt(
      minuteResponse.rows?.[0]?.metricValues?.[0]?.value || "0"
    );

    return {
      success: true,
      data: {
        activeUsers: totalActiveUsers,
        pageViewsPerMinute,
        topActivePages,
      },
    };
  } catch (error) {
    console.error("Real-time error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch real-time data",
    };
  }
}
