// app/types/analytics.ts
export interface AnalyticsMetric {
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
}

export interface AnalyticsData {
  activeUsers: AnalyticsMetric;
  pageViews: AnalyticsMetric;
  sessions: AnalyticsMetric;
  bounceRate: AnalyticsMetric;
  avgSessionDuration: string;
  newUsers: AnalyticsMetric;
}

export interface TopPage {
  path: string;
  title: string;
  views: number;
  uniqueViews: number;
}

export interface AuditData {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  fcp: string; // First Contentful Paint
  lcp: string; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  tbt: string; // Total Blocking Time
}

export interface RealTimeData {
  activeUsers: number;
  pageViewsPerMinute: number;
  topActivePages: { page: string; users: number }[];
}

export interface AnalyticsState {
  data: AnalyticsData | null;
  topPages: TopPage[];
  realTime: RealTimeData | null;
  audit: AuditData | null;
  loading: boolean;
  error: string | null;
}
