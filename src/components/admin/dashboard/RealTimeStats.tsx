// app/components/RightSidebar/RealTimeStats.tsx
"use client";

import { Box, Typography, Tooltip, Skeleton, Chip } from "@mui/material";
import { FiberManualRecord, Visibility } from "@mui/icons-material";
import { RealTimeData } from "../../../../types/analytics";

interface RealTimeStatsProps {
  data: RealTimeData | null;
  loading?: boolean;
}

export default function RealTimeStats({
  data,
  loading = false,
}: RealTimeStatsProps) {
  if (loading) {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: "rgba(34, 197, 94, 0.1)",
          borderRadius: 2,
          border: "1px solid rgba(34, 197, 94, 0.2)",
        }}
      >
        <Skeleton variant="text" width={80} height={20} />
        <Skeleton variant="text" width={120} height={50} />
        <Skeleton variant="text" width={100} height={16} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No real-time data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "rgba(34, 197, 94, 0.1)",
        borderRadius: 2,
        border: "1px solid rgba(34, 197, 94, 0.2)",
      }}
    >
      {/* Live Indicator */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <FiberManualRecord
          sx={{
            fontSize: 12,
            color: "#22c55e",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.4 },
              "100%": { opacity: 1 },
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "#22c55e",
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          LIVE NOW
        </Typography>
      </Box>

      {/* Active Users Count */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: "#22c55e", lineHeight: 1 }}
        >
          {data.activeUsers}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          active {data.activeUsers === 1 ? "user" : "users"}
        </Typography>
      </Box>

      {/* Page Views Per Minute */}
      {data.pageViewsPerMinute > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
          <Visibility sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {data.pageViewsPerMinute} page views/min
          </Typography>
        </Box>
      )}

      {/* Top Active Pages */}
      {data.topActivePages && data.topActivePages.length > 0 && (
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 1 }}
          >
            Currently viewing:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {data.topActivePages.slice(0, 3).map((page, index) => (
              <Tooltip
                key={index}
                title={`${page.users} ${
                  page.users === 1 ? "user" : "users"
                } on this page`}
                placement="left"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1.5,
                    py: 0.75,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 1,
                    cursor: "default",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      mr: 1,
                    }}
                  >
                    {page.page}
                  </Typography>
                  <Chip
                    size="small"
                    label={page.users}
                    sx={{
                      height: 18,
                      minWidth: 24,
                      bgcolor: "rgba(34, 197, 94, 0.2)",
                      color: "#22c55e",
                      "& .MuiChip-label": {
                        px: 0.75,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                      },
                    }}
                  />
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
