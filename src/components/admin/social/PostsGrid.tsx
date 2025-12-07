// components/social/PostsGrid.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Typography,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Favorite,
  ChatBubble,
  Share,
  Bookmark,
  Visibility,
  PlayCircle,
  Image as ImageIcon,
  ViewCarousel,
  Article,
} from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import { Post } from "../../../../types/social";

interface PostsGridProps {
  posts: Post[];
  title: string;
  showViews?: boolean;
  showSaves?: boolean;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const getTypeIcon = (type: Post["type"]) => {
  switch (type) {
    case "video":
    case "reel":
      return <PlayCircle fontSize="small" />;
    case "carousel":
      return <ViewCarousel fontSize="small" />;
    case "text":
      return <Article fontSize="small" />;
    default:
      return <ImageIcon fontSize="small" />;
  }
};

export const PostsGrid: React.FC<PostsGridProps> = ({
  posts,
  title,
  showViews = false,
  showSaves = false,
}) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={post.id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={post.thumbnail}
                    alt={post.caption}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                  <Chip
                    icon={getTypeIcon(post.type)}
                    label={post.type}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      textTransform: "capitalize",
                    }}
                  />
                  <Chip
                    label={`${post.engagementRate.toFixed(1)}%`}
                    size="small"
                    color="success"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 1.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      mb: 1,
                    }}
                  >
                    {post.caption}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Tooltip title="Likes">
                      <Chip
                        icon={<Favorite sx={{ fontSize: 14 }} />}
                        label={formatNumber(post.likes)}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 11 }}
                      />
                    </Tooltip>
                    <Tooltip title="Comments">
                      <Chip
                        icon={<ChatBubble sx={{ fontSize: 14 }} />}
                        label={formatNumber(post.comments)}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 11 }}
                      />
                    </Tooltip>
                    <Tooltip title="Shares">
                      <Chip
                        icon={<Share sx={{ fontSize: 14 }} />}
                        label={formatNumber(post.shares)}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 11 }}
                      />
                    </Tooltip>
                    {showSaves && post.saves && (
                      <Tooltip title="Saves">
                        <Chip
                          icon={<Bookmark sx={{ fontSize: 14 }} />}
                          label={formatNumber(post.saves)}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: 11 }}
                        />
                      </Tooltip>
                    )}
                    {showViews && post.views && (
                      <Tooltip title="Views">
                        <Chip
                          icon={<Visibility sx={{ fontSize: 14 }} />}
                          label={formatNumber(post.views)}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: 11 }}
                        />
                      </Tooltip>
                    )}
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {format(parseISO(post.createdAt), "MMM d, yyyy")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
