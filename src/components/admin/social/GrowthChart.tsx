/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ChartDataPoint } from "../../../../types/social";

interface GrowthChartProps {
  data: ChartDataPoint[];
  title: string;
  color: string;
}

type Metric = "followers" | "engagement" | "reach" | "impressions";

export const GrowthChart: React.FC<GrowthChartProps> = ({
  data,
  title,
  color,
}) => {
  const theme = useTheme();
  const [metric, setMetric] = useState<Metric>("followers");

  const formatXAxis = (date: string) => {
    try {
      return format(parseISO(date), "MMM d");
    } catch {
      return date;
    }
  };

  const formatYAxis = (value: number) => {
    if (metric === "engagement") return `${value.toFixed(1)}%`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 1.5,
          boxShadow: 3,
        }}
      >
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>
          {format(parseISO(label), "MMM d, yyyy")}
        </Box>
        {payload.map((entry: any, idx: number) => (
          <Box key={idx} sx={{ color: entry.color }}>
            {entry.name}:{" "}
            {metric === "engagement"
              ? `${entry.value.toFixed(2)}%`
              : entry.value.toLocaleString()}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <ToggleButtonGroup
            value={metric}
            exclusive
            onChange={(_, val) => val && setMetric(val)}
            size="small"
          >
            <ToggleButton value="followers">Followers</ToggleButton>
            <ToggleButton value="engagement">Engagement</ToggleButton>
            <ToggleButton value="reach">Reach</ToggleButton>
            <ToggleButton value="impressions">Impressions</ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <CardContent>
        <Box sx={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${color}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                stroke={theme.palette.text.secondary}
                fontSize={12}
              />
              <YAxis
                tickFormatter={formatYAxis}
                stroke={theme.palette.text.secondary}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={color}
                strokeWidth={3}
                fill={`url(#gradient-${color})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
