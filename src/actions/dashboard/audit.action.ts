// app/actions/audit.ts
"use server";

import { AuditData } from "../../../types/analytics";

const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;
const SITE_URL = process.env.SITE_URL;

interface LighthouseAudit {
  numericValue?: number;
  displayValue?: string;
}

interface LighthouseCategory {
  score: number;
}

interface PageSpeedResponse {
  lighthouseResult: {
    categories: {
      performance: LighthouseCategory;
      accessibility: LighthouseCategory;
      "best-practices": LighthouseCategory;
      seo: LighthouseCategory;
    };
    audits: {
      "first-contentful-paint": LighthouseAudit;
      "largest-contentful-paint": LighthouseAudit;
      "cumulative-layout-shift": LighthouseAudit;
      "total-blocking-time": LighthouseAudit;
    };
  };
}

export async function getAuditData(url?: string): Promise<{
  success: boolean;
  data?: AuditData;
  error?: string;
}> {
  try {
    const targetUrl = url || SITE_URL;

    if (!targetUrl) {
      throw new Error("No URL provided for audit");
    }

    const apiUrl = new URL(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    );
    apiUrl.searchParams.set("url", targetUrl);
    apiUrl.searchParams.set("key", PAGESPEED_API_KEY || "");
    apiUrl.searchParams.set("category", "performance");
    apiUrl.searchParams.append("category", "accessibility");
    apiUrl.searchParams.append("category", "best-practices");
    apiUrl.searchParams.append("category", "seo");
    apiUrl.searchParams.set("strategy", "mobile");

    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.statusText}`);
    }

    const result: PageSpeedResponse = await response.json();
    const { categories, audits } = result.lighthouseResult;

    const data: AuditData = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
      fcp: audits["first-contentful-paint"].displayValue || "N/A",
      lcp: audits["largest-contentful-paint"].displayValue || "N/A",
      cls:
        Math.round(
          (audits["cumulative-layout-shift"].numericValue || 0) * 1000
        ) / 1000,
      tbt: audits["total-blocking-time"].displayValue || "N/A",
    };

    return { success: true, data };
  } catch (error) {
    console.error("Audit error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to run audit",
    };
  }
}

export async function runCustomAudit(url: string): Promise<{
  success: boolean;
  data?: AuditData;
  error?: string;
}> {
  // Validate URL
  try {
    new URL(url);
  } catch {
    return { success: false, error: "Invalid URL provided" };
  }

  return getAuditData(url);
}
