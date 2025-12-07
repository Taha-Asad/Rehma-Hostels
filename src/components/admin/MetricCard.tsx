// app/components/RightSidebar/MetricCard.tsx
"use client";

import { Box, Typography, Chip, Skeleton } from "@mui/material";
import { TrendingUp, TrendingDown, TrendingFlat } from "@mui/icons-material";
import { ReactNode } from "react";
import { AnalyticsMetric } from "../../../types/analytics";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  metric: AnalyticsMetric | null;
  format?: (value: number) => string;
  loading?: boolean;
}

export default function MetricCard({
  icon,
  label,
  metric,
  format = (v) => v.toLocaleString(),
  loading = false,
}: MetricCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp sx={{ fontSize: 14 }} />;
      case "down":
        return <TrendingDown sx={{ fontSize: 14 }} />;
      default:
        return <TrendingFlat sx={{ fontSize: 14 }} />;
    }
  };

  const getTrendColor = (trend: string, change: number) => {
    // For bounce rate, down is good
    if (label.toLowerCase().includes("bounce")) {
      return trend === "down"
        ? "success"
        : trend === "up"
        ? "error"
        : "default";
    }
    return trend === "up" ? "success" : trend === "down" ? "error" : "default";
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1.5,
          borderRadius: 2,
          bgcolor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={80} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        borderRadius: 2,
        bgcolor: "rgba(255, 255, 255, 0.05)",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.08)",
          transform: "translateX(4px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 1.5,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" noWrap>
          {label}
        </Typography>
        <Typography variant="h6" fontWeight="bold" noWrap>
          {metric ? format(metric.value) : "—"}
        </Typography>
      </Box>
      {metric && metric.change !== 0 && (
        <Chip
          size="small"
          icon={getTrendIcon(metric.trend)}
          label={`${metric.change > 0 ? "+" : ""}${metric.change}%`}
          color={getTrendColor(metric.trend, metric.change)}
          sx={{
            height: 24,
            "& .MuiChip-label": { px: 1, fontSize: "0.75rem" },
          }}
        />
      )}
    </Box>
  );
}
