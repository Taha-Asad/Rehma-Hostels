// app/components/RightSidebar/AuditScore.tsx
"use client";

import { safeScore } from "@/actions/dashboard/audit.action";
import {
  Box,
  Typography,
  LinearProgress,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { ReactNode } from "react";

interface AuditScoreProps {
  label: string;
  score: number | null;
  icon: ReactNode;
  loading?: boolean;
}

export default function AuditScore({
  label,
  score,
  icon,
  loading = false,
}: AuditScoreProps) {
  const getColor = (score: number) => {
    if (score >= 90) return "#22c55e"; // green
    if (score >= 50) return "#f59e0b"; // orange
    return "#ef4444"; // red
  };

  console.log(score);

  const getLabel = (score: number) => {
    if (score >= 90) return "Good";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
  };

  if (loading) {
    return (
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={80} />
        </Box>
        <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 4 }} />
      </Box>
    );
  }

  const displayScore = safeScore(score);

  return (
    <Tooltip title={`${label}: ${getLabel(displayScore)}`} placement="left">
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Box sx={{ color: getColor(displayScore), display: "flex" }}>
            {icon}
          </Box>
          <Typography variant="body2" sx={{ flex: 1 }}>
            {label}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ color: getColor(displayScore) }}
          >
            {score !== null ? displayScore : "—"}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={displayScore}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "rgba(255, 255, 255, 0.1)",
            "& .MuiLinearProgress-bar": {
              bgcolor: getColor(displayScore),
              borderRadius: 4,
            },
          }}
        />
      </Box>
    </Tooltip>
  );
}
