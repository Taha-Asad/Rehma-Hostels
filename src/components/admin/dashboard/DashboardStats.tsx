"use client";

import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJs,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJs.register(ArcElement, Title, Tooltip, Legend);

// Define some colors for the charts
const chartColors = {
  primary: "#4BC0C0", // Cyan
  secondary: "#FF6384", // Red
  tertiary: "#FFCE56", // Yellow
  gray: "#E0E0E0",
};
type ChartDataType = ChartData<"pie", number[], string>;
type MetricKey = "users" | "posts" | "rooms";
// DashboardStats.tsx (Your component file)

interface DashboardStatsProps {
  stats: {
    // This is the desired and now correct structure:
    usersByRole: { role: string; _count: { _all: number } }[];
    postsByStatus: { status: string; _count: { _all: number } }[];
    rooms: number;
  } | null;
}
// ... (metricsOption array remains the same) ...
const metricsOption: { label: string; value: MetricKey }[] = [
  { value: "users", label: "Users" },
  { value: "posts", label: "Posts" },
  { value: "rooms", label: "Rooms" },
];

export default function DashboardStats({ stats }: DashboardStatsProps) {
  // We need a clearer structure for metricData now that we support multi-segment data
  const metricData = {
    users: {
      label: "Users",
      breakdownLabels: stats?.usersByRole.map((u) => u.role) || [],
      breakdownData: stats?.usersByRole.map((u) => u._count._all) || [],
      totalValue:
        stats?.usersByRole.reduce((sum, r) => sum + r._count._all, 0) || 0,
    },
    posts: {
      label: "Posts",
      breakdownLabels: stats?.postsByStatus.map((p) => p.status) || [],
      breakdownData: stats?.postsByStatus.map((p) => p._count._all) || [],
      totalValue:
        stats?.postsByStatus.reduce((sum, p) => sum + p._count._all, 0) || 0,
    },
    rooms: {
      label: "Rooms",
      breakdownLabels: [],
      breakdownData: [],
      totalValue: stats?.rooms || 0,
    },
  };

  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("users");

  // Dynamically generate chart data based on selected metric
  const currentMetric = metricData[selectedMetric];

  // Logic to determine if we show a detailed breakdown or a simple total/remaining chart
  const showBreakdown =
    selectedMetric === "users" || selectedMetric === "posts";

  const dynamicChartData = showBreakdown
    ? {
        labels: currentMetric.breakdownLabels,
        datasets: [
          {
            data: currentMetric.breakdownData,
            backgroundColor: [
              chartColors.primary,
              chartColors.secondary,
              chartColors.tertiary,
            ],
            hoverBackgroundColor: [
              chartColors.primary,
              chartColors.secondary,
              chartColors.tertiary,
            ],
          },
        ],
      }
    : {
        labels: [currentMetric.label, "Remaining"],
        datasets: [
          {
            data: [
              currentMetric.totalValue,
              Math.max(1, currentMetric.totalValue * 0.2),
            ],
            backgroundColor: [chartColors.primary, chartColors.gray],
            hoverBackgroundColor: [chartColors.primary, chartColors.gray],
          },
        ],
      };

  // Force TypeScript to accept the structure we built
  const chartData = dynamicChartData as ChartDataType;

  console.log(stats?.usersByRole);
  console.log("Stats prop:", stats);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // Show legend only for breakdown charts
      legend: { display: showBreakdown },
      title: {
        display: true,
        text: `${currentMetric.label} Stats`,
        font: { size: 16 },
      },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        marginTop: 0,
      }}
    >
      {/* ... (Paper styling remains the same) ... */}
      <Paper
        elevation={4}
        sx={{
          bgcolor: "background.paper",
          p: 1,
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: 2,
          marginTop: 0,
          transition: "box-shadow 0.3s ease",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.12)", // subtle shadow
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)", // slightly stronger on hover
          },
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <div
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "210px",
                margin: "10px auto 2px",
              }}
            >
              <Pie data={chartData} options={options} />
            </div>
            {/* ... (Autocomplete remains the same) ... */}
            <Autocomplete
              disablePortal
              options={metricsOption}
              value={
                metricsOption.find((m) => m.value === selectedMetric) || null
              }
              onChange={(e, newValue) =>
                setSelectedMetric(newValue?.value || selectedMetric)
              }
              getOptionLabel={(opt) => opt.label}
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    {...rest}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Typography variant="body2">{option.label}</Typography>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Metrics"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h2">Overview</Typography>

            {/* Use totalValue here for the list display */}
            {Object.entries(metricData).map(([key, { label, totalValue }]) => (
              <p
                key={key}
                style={{
                  fontWeight: selectedMetric === key ? "bold" : "normal",
                  color: selectedMetric === key ? "#4BC0C0" : "inherit",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedMetric(key as MetricKey)}
              >
                <strong>{label}:</strong> {totalValue}
              </p>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
