"use server";

import { AuditData } from "../../../types/analytics";

const PROXY_API = "https://your-vercel-deployment.vercel.app/api"; // <- use your actual proxy URL

export async function getAuditData(url?: string): Promise<{
  success: boolean;
  data?: AuditData;
  error?: string;
}> {
  try {
    if (!url) {
      return { success: false, error: "No URL provided for audit" };
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return { success: false, error: "Invalid URL provided" };
    }

    // Build proxy URL with query params
    const apiUrl = new URL(PROXY_API);
    const safeScore = (value: number | null | undefined) => {
       if (typeof value !== "number") return 0;
       return Math.round(value * 100);
     };
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("strategy", "mobile");
    apiUrl.searchParams.append("category", "performance");
    apiUrl.searchParams.append("category", "accessibility");
    apiUrl.searchParams.append("category", "best-practices");
    apiUrl.searchParams.append("category", "seo");

    console.log("Fetching PageSpeed data via proxy for:", url);

    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Proxy PageSpeed error:", response.status, errorText);
      return {
        success: false,
        error: `Proxy PageSpeed error: ${response.status}`,
      };
    }

    const result = await response.json();

    if (!result.lighthouseResult) {
      return { success: false, error: "Invalid PageSpeed response" };
    }

    const { categories, audits } = result.lighthouseResult;

    // Convert score to 0–100 scale safely

    const data: AuditData = {
      performance: safeScore(categories?.performance?.score),
      accessibility: safeScore(categories?.accessibility?.score),
      bestPractices: safeScore(categories?.["best-practices"]?.score),
      seo: safeScore(categories?.seo?.score),

      fcp: audits?.["first-contentful-paint"]?.displayValue ?? "N/A",
      lcp: audits?.["largest-contentful-paint"]?.displayValue ?? "N/A",
      cls: Number.isFinite(audits?.["cumulative-layout-shift"]?.numericValue)
        ? Math.round(audits["cumulative-layout-shift"].numericValue * 1000) /
          1000
        : 0,
      tbt: audits?.["total-blocking-time"]?.displayValue ?? "N/A",
    };

    console.log("✔ PageSpeed data fetched successfully via proxy");
    return { success: true, data };
  } catch (error) {
    console.error("Audit error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to run audit",
    };
  }
}

// Helper function for client hook
export async function runCustomAudit(url: string) {
  return getAuditData(url);
}
