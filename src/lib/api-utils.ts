// lib/api-utils.ts

import { ApiResponse } from "../../types/social";

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retries: number = 3
): Promise<ApiResponse<T>> {
  let lastError: Error | null = null;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      lastError = error as Error;
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || "Request failed after retries",
  };
}

export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function getDateRange(range: string): { since: string; until: string } {
  const now = new Date();
  const until = now.toISOString().split("T")[0];

  let days = 30;
  switch (range) {
    case "7d":
      days = 7;
      break;
    case "14d":
      days = 14;
      break;
    case "30d":
      days = 30;
      break;
    case "90d":
      days = 90;
      break;
  }

  const sinceDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const since = sinceDate.toISOString().split("T")[0];

  return { since, until };
}

export function formatUnixTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString();
}
