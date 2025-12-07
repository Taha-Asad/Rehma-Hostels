// lib/googleAnalytics.ts
import { BetaAnalyticsDataClient } from "@google-analytics/data";

let analyticsClient: BetaAnalyticsDataClient | null = null;

export const getAnalyticsClient = (): BetaAnalyticsDataClient => {
  if (!analyticsClient) {
    analyticsClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    });
  }
  return analyticsClient;
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}m ${secs}s`;
};

export const calculateChange = (
  current: number,
  previous: number
): { change: number; trend: "up" | "down" | "neutral" } => {
  if (previous === 0) return { change: 0, trend: "neutral" };
  const change = Math.round(((current - previous) / previous) * 100);
  return {
    change,
    trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
  };
};
