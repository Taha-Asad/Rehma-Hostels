// components/social/PlatformHeader.tsx
"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Refresh,
  Download,
  CalendarMonth,
  Facebook,
  Instagram,
} from "@mui/icons-material";
import { DateRange, Platform } from "../../../../types/social";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const platformConfig = {
  facebook: {
    name: "Facebook",
    icon: <Facebook />,
    color: "#1877F2",
    gradient: "linear-gradient(135deg, #1877F2 0%, #42A5F5 100%)",
  },
  instagram: {
    name: "Instagram",
    icon: <Instagram />,
    color: "#E4405F",
    gradient: "linear-gradient(135deg, #833AB4 0%, #E4405F 50%, #FCAF45 100%)",
  },
  tiktok: {
    name: "TikTok",
    icon: <TikTokIcon />,
    color: "#000000",
    gradient: "linear-gradient(135deg, #25F4EE 0%, #FE2C55 50%, #000000 100%)",
  },
};

interface PlatformHeaderProps {
  platform: Platform;
  lastUpdated: string;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onRefresh: () => void;
}

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "14d", label: "Last 14 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export const PlatformHeader: React.FC<PlatformHeaderProps> = ({
  platform,
  lastUpdated,
  dateRange,
  onDateRangeChange,
  onRefresh,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const config = platformConfig[platform];

  return (
    <Box
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 3,
        background: `${config.color}10`,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: config.gradient,
              color: "#fff",
              display: "flex",
            }}
          >
            {config.icon}
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {config.name} Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<CalendarMonth />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ borderColor: config.color, color: config.color }}
          >
            {dateRangeOptions.find((o) => o.value === dateRange)?.label}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {dateRangeOptions.map((option) => (
              <MenuItem
                key={option.value}
                selected={dateRange === option.value}
                onClick={() => {
                  onDateRangeChange(option.value);
                  setAnchorEl(null);
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>

          <Divider orientation="vertical" flexItem />

          <IconButton onClick={onRefresh} sx={{ color: config.color }}>
            <Refresh />
          </IconButton>
          <IconButton sx={{ color: config.color }}>
            <Download />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
