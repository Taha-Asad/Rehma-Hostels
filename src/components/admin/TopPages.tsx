// app/components/RightSidebar/TopPages.tsx
"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Chip,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { TopPage } from "../../../types/analytics";

interface TopPagesProps {
  pages: TopPage[];
  loading?: boolean;
}

export default function TopPages({ pages, loading = false }: TopPagesProps) {
  if (loading) {
    return (
      <List dense disablePadding>
        {[...Array(5)].map((_, i) => (
          <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
            <Skeleton variant="text" width="100%" height={40} />
          </ListItem>
        ))}
      </List>
    );
  }

  if (pages.length === 0) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        py={2}
      >
        No page data available
      </Typography>
    );
  }

  const maxViews = Math.max(...pages.map((p) => p.views));

  return (
    <List dense disablePadding>
      {pages.map((page, index) => (
        <ListItem
          key={`${page.path}-${index}`}
          disablePadding
          sx={{
            py: 1,
            px: 1.5,
            borderRadius: 1,
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          {/* Background bar */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${(page.views / maxViews) * 100}%`,
              bgcolor: "primary.main",
              opacity: 0.1,
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                width: 20,
                color: "text.secondary",
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </Typography>
            <ListItemText
              primary={page.path}
              secondary={page.title}
              primaryTypographyProps={{
                variant: "body2",
                noWrap: true,
                fontWeight: 500,
              }}
              secondaryTypographyProps={{
                variant: "caption",
                noWrap: true,
              }}
              sx={{ flex: 1, minWidth: 0, mr: 1 }}
            />
            <Chip
              size="small"
              icon={<Visibility sx={{ fontSize: 14 }} />}
              label={page.views.toLocaleString()}
              sx={{
                height: 22,
                "& .MuiChip-label": { px: 0.5, fontSize: "0.7rem" },
                "& .MuiChip-icon": { ml: 0.5 },
              }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
