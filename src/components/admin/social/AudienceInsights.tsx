// components/social/AudienceInsights.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { AudienceData } from "../../../../types/social";

interface AudienceInsightsProps {
  data: AudienceData;
  color: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export const AudienceInsights: React.FC<AudienceInsightsProps> = ({
  data,
  color,
}) => {
  return (
    <Grid container spacing={3}>
      {/* Age Distribution */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%" }}>
          <CardHeader title="Age Distribution" />
          <CardContent>
            <Stack spacing={2}>
              {data.ageGroups.map((group, idx) => (
                <Box key={group.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={0.5}
                  >
                    <Typography variant="body2">{group.label}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {group.percentage}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={group.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: `${COLORS[idx]}20`,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: COLORS[idx],
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Gender Distribution */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%" }}>
          <CardHeader title="Gender Distribution" />
          <CardContent>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.genders}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="label"
                  >
                    {data.genders.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              {data.genders.map((g, idx) => (
                <Stack
                  key={g.label}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: COLORS[idx],
                    }}
                  />
                  <Typography variant="body2">
                    {g.label}: {g.percentage}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Top Countries */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%" }}>
          <CardHeader title="Top Countries" />
          <CardContent>
            <Stack spacing={2}>
              {data.countries.map((country) => (
                <Box key={country.country}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={0.5}
                  >
                    <Typography variant="body2">{country.country}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {country.count.toLocaleString()} ({country.percentage}%)
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={country.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: `${color}20`,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Peak Hours */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ height: "100%" }}>
          <CardHeader title="Audience Active Hours" />
          <CardContent>
            <Box sx={{ height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={data.peakHours}>
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(h) => `${h}:00`}
                    fontSize={10}
                    interval={2}
                  />
                  <YAxis hide />
                  <Tooltip
                    labelFormatter={(h) => `${h}:00 - ${h}:59`}
                    formatter={(val: number) => [val, "Activity"]}
                  />
                  <Bar dataKey="activity" fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
