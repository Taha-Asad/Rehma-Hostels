// components/social/StatsCard.tsx
"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import { TrendingUp, TrendingDown, Remove } from "@mui/icons-material";
import { StatItem } from "../../../../types/social";

interface StatsCardProps {
  stat: StatItem;
  icon: React.ReactNode;
  color?: string;
  formatAsPercentage?: boolean;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

export const StatsCard: React.FC<StatsCardProps> = ({
  stat,
  icon,
  color = "#1976d2",
  formatAsPercentage = false,
}) => {
  const TrendIcon =
    stat.changeType === "increase"
      ? TrendingUp
      : stat.changeType === "decrease"
      ? TrendingDown
      : Remove;

  const trendColor =
    stat.changeType === "increase"
      ? "success"
      : stat.changeType === "decrease"
      ? "error"
      : "default";

  return (
    <Card
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {stat.label}
            </Typography>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: `${color}15`,
                color: color,
                display: "flex",
              }}
            >
              {icon}
            </Box>
          </Stack>

          <Typography variant="h4" fontWeight={700} color={color}>
            {formatAsPercentage
              ? `${stat.value.toFixed(1)}%`
              : formatNumber(stat.value)}
          </Typography>

          <Chip
            icon={<TrendIcon fontSize="small" />}
            label={`${
              stat.changeType === "decrease" ? "-" : "+"
            }${stat.change.toFixed(1)}%`}
            size="small"
            color={trendColor}
            variant="outlined"
            sx={{ width: "fit-content", fontWeight: 600 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
