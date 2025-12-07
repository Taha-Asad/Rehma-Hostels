// app/admin/social/tiktok/page.tsx
"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  Box,
  Grid,
  Skeleton,
  Tabs,
  Tab,
  Alert,
  Button,
  Snackbar,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import {
  People,
  TrendingUp,
  Visibility,
  Favorite,
  ChatBubble,
  Share,
  PlayArrow,
  PersonAdd,
  Whatshot,
  Refresh,
} from "@mui/icons-material";
import { DateRange, SocialMediaData } from "../../../../../types/social";
import { fetchTikTokAnalytics } from "@/actions/social.action";
import { PlatformHeader } from "@/components/admin/social/PlatformHeader";
import { StatsCard } from "@/components/admin/social/stats";
import { GrowthChart } from "@/components/admin/social/GrowthChart";
import { PostsGrid } from "@/components/admin/social/PostsGrid";
import { AudienceInsights } from "@/components/admin/social/AudienceInsights";

export default function TikTokPage() {
  const [data, setData] = useState<SocialMediaData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [activeTab, setActiveTab] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const PLATFORM_COLOR = "#000000";
  const ACCENT_COLOR = "#FE2C55";

  const loadData = async (range: DateRange) => {
    startTransition(async () => {
      const result = await fetchTikTokAnalytics(range);

      if (result.success && result.data) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to load data");
        setSnackbar({
          open: true,
          message: result.error || "Failed to load data",
        });
      }
    });
  };

  useEffect(() => {
    loadData(dateRange);
  }, [dateRange]);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    loadData(range);
  };

  const handleRefresh = () => {
    loadData(dateRange);
    setSnackbar({ open: true, message: "Data refreshed!" });
  };

  if (isPending && !data) {
    return (
      <Box>
        <Skeleton
          variant="rectangular"
          height={100}
          sx={{ mb: 3, borderRadius: 2 }}
        />
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <Skeleton
                variant="rectangular"
                height={140}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error && !data) {
    return (
      <Box>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => loadData(dateRange)}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!data) return null;

  const { stats } = data;
  const isViral = stats.views && stats.views.change > 20;

  return (
    <Box>
      <PlatformHeader
        platform="tiktok"
        lastUpdated={data.lastUpdated}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRefresh={handleRefresh}
      />

      {isPending && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255,255,255,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Refresh
            sx={{ animation: "spin 1s linear infinite", fontSize: 48 }}
          />
        </Box>
      )}

      {/* Viral Alert */}
      {isViral && (
        <Card
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #25F4EE 0%, #FE2C55 100%)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Whatshot sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  You are Going Viral!
                </Typography>
                <Typography variant="body2">
                  Your video views are up {stats.views?.change.toFixed(1)}%
                  compared to last period!
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            stat={stats.followers}
            icon={<People />}
            color={PLATFORM_COLOR}
          />
        </Grid>
        {stats.views && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              stat={stats.views}
              icon={<PlayArrow />}
              color={ACCENT_COLOR}
            />
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            stat={stats.engagement}
            icon={<TrendingUp />}
            color={PLATFORM_COLOR}
            formatAsPercentage
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard stat={stats.reach} icon={<Visibility />} color="#25F4EE" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard stat={stats.likes} icon={<Favorite />} color="#f44336" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            stat={stats.comments}
            icon={<ChatBubble />}
            color="#4caf50"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard stat={stats.shares} icon={<Share />} color="#ff9800" />
        </Grid>
        {stats.profileViews && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              stat={stats.profileViews}
              icon={<PersonAdd />}
              color="#9c27b0"
            />
          </Grid>
        )}
      </Grid>

      {/* Growth Chart */}
      <Box mb={4}>
        <GrowthChart
          data={data.chartData}
          title="TikTok Growth"
          color={ACCENT_COLOR}
        />
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          <Tab label="Top Videos" />
          <Tab label="Recent Videos" />
          <Tab label="Audience" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <PostsGrid
          posts={data.topPosts}
          title="Top Performing Videos"
          showViews
        />
      )}
      {activeTab === 1 && (
        <PostsGrid posts={data.recentPosts} title="Recent Videos" showViews />
      )}
      {activeTab === 2 && (
        <AudienceInsights data={data.audience} color={ACCENT_COLOR} />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
}
