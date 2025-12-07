// types/social-media.ts

export type Platform = "facebook" | "instagram" | "tiktok";
export type DateRange = "7d" | "14d" | "30d" | "90d";

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StatItem {
  label: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
}

export interface ChartDataPoint {
  date: string;
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
}

export interface Post {
  id: string;
  thumbnail: string;
  caption: string;
  type: "image" | "video" | "carousel" | "reel" | "story" | "text";
  likes: number;
  comments: number;
  shares: number;
  saves?: number;
  views?: number;
  reach: number;
  engagementRate: number;
  createdAt: string;
  permalink?: string;
}

export interface DemographicItem {
  label: string;
  value: number;
  percentage: number;
  [key: string]: string | number; // <- this allows it to match ChartDataInput
}

export interface LocationItem {
  country: string;
  city?: string;
  count: number;
  percentage: number;
}

export interface AudienceData {
  ageGroups: DemographicItem[];
  genders: DemographicItem[];
  countries: LocationItem[];
  cities: LocationItem[];
  peakHours: { hour: number; activity: number }[];
}

export interface PlatformStats {
  followers: StatItem;
  following?: StatItem;
  posts: StatItem;
  engagement: StatItem;
  reach: StatItem;
  impressions: StatItem;
  likes: StatItem;
  comments: StatItem;
  shares: StatItem;
  saves?: StatItem;
  views?: StatItem;
  profileViews?: StatItem;
  websiteClicks?: StatItem;
}

export interface SocialMediaData {
  platform: Platform;
  stats: PlatformStats;
  chartData: ChartDataPoint[];
  recentPosts: Post[];
  topPosts: Post[];
  audience: AudienceData;
  lastUpdated: string;
}

// Meta API Types
export interface MetaPageInsight {
  name: string;
  period: string;
  values: { value: number; end_time: string }[];
}

export interface MetaMediaInsight {
  name: string;
  values: { value: number }[];
}

// TikTok API Types
export interface TikTokUserInfo {
  open_id: string;
  union_id: string;
  avatar_url: string;
  display_name: string;
  follower_count: number;
  following_count: number;
  likes_count: number;
  video_count: number;
}

export interface TikTokVideo {
  id: string;
  title: string;
  cover_image_url: string;
  share_url: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  create_time: number;
}

// Token Types
export interface SocialToken {
  id: string;
  platform: Platform;
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
