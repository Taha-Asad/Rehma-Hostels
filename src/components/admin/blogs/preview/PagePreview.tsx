/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  AccessTime,
  ArrowBack,
  CalendarMonth,
  Person,
  Facebook,
  Twitter,
  WhatsApp,
  Email,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
  Paper,
  Breadcrumbs,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import Link from "next/link";

// Import ContentBlock type
export type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "code"; inline: boolean; text: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "link"; href: string; text: string };

interface PagePreviewProps {
  pagePost: {
    title: string;
    content: string;
    chips: { label: string; position: string }[];
    fullContent: ContentBlock[];
    image: string;
    date: string;
    readTime: string;
    category: string;
    author?: string;
  };
}

// Type guards
const hasText = (
  block: ContentBlock
): block is ContentBlock & { text: string } => {
  return "text" in block;
};

const hasLevel = (
  block: ContentBlock
): block is ContentBlock & { level: 1 | 2 | 3 } => {
  return "level" in block;
};

const hasSrc = (
  block: ContentBlock
): block is ContentBlock & { src: string; alt?: string } => {
  return "src" in block;
};

const hasHref = (
  block: ContentBlock
): block is ContentBlock & { href: string; text: string } => {
  return "href" in block;
};

const hasItems = (
  block: ContentBlock
): block is ContentBlock & { items: string[] } => {
  return "items" in block;
};

const hasInline = (
  block: ContentBlock
): block is ContentBlock & { inline: boolean } => {
  return "inline" in block;
};

function PagePreview({ pagePost }: PagePreviewProps) {
  const article = {
    ...pagePost,
    author: pagePost.author || "Admin",
  };

  // Render content blocks
  const RenderContent = ({ content }: { content: ContentBlock[] }) => {
    if (!content || content.length === 0) {
      return (
        <Typography variant="body1" sx={{ color: "#505A63", lineHeight: 1.9 }}>
          {article.content || "No content available"}
        </Typography>
      );
    }

    return (
      <>
        {content.map((block, i) => {
          switch (block.type) {
            case "heading":
              return hasLevel(block) && hasText(block) ? (
                <Typography
                  key={i}
                  variant={
                    block.level === 1 ? "h3" : block.level === 2 ? "h4" : "h5"
                  }
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    color: "#3D444B",
                    mt: 5,
                    mb: 3,
                    fontSize:
                      block.level === 1
                        ? "1.75rem"
                        : block.level === 2
                        ? "1.5rem"
                        : "1.25rem",
                    position: "relative",
                    paddingLeft: 3,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 4,
                      height: "100%",
                      bgcolor: "#7B2E2E",
                      borderRadius: 2,
                    },
                  }}
                >
                  {block.text}
                </Typography>
              ) : null;

            case "paragraph":
              return hasText(block) ? (
                <Typography
                  key={i}
                  sx={{
                    color: "#505A63",
                    lineHeight: 1.9,
                    mb: 3,
                    fontSize: "1.125rem",
                  }}
                >
                  {block.text}
                </Typography>
              ) : null;

            case "list":
              return hasItems(block) ? (
                <Box
                  key={i}
                  component={(block as any).ordered ? "ol" : "ul"}
                  sx={{
                    color: "#505A63",
                    pl: 4,
                    mb: 3,
                    "& li": {
                      mb: 2,
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                      position: "relative",
                      "&::marker": {
                        color: "#7B2E2E",
                      },
                    },
                  }}
                >
                  {block.items.map((item, j) => (
                    <Box component="li" key={j}>
                      {item}
                    </Box>
                  ))}
                </Box>
              ) : null;

            case "blockquote":
              return hasText(block) ? (
                <Box
                  key={i}
                  sx={{
                    borderLeft: "4px solid #7B2E2E",
                    pl: 3,
                    ml: 2,
                    my: 3,
                    py: 2,
                    bgcolor: "rgba(123,46,46,0.03)",
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      color: "#505A63",
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                    }}
                  >
                    {block.text}
                  </Typography>
                </Box>
              ) : null;

            case "code":
              return hasText(block) && hasInline(block) ? (
                block.inline ? (
                  <Box
                    key={i}
                    component="code"
                    sx={{
                      bgcolor: "#F1E9E9",
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.5,
                      fontFamily: "monospace",
                      fontSize: "0.95em",
                      color: "#7B2E2E",
                    }}
                  >
                    {block.text}
                  </Box>
                ) : (
                  <Box
                    key={i}
                    component="pre"
                    sx={{
                      bgcolor: "#F1E9E9",
                      p: 3,
                      borderRadius: 1,
                      overflow: "auto",
                      mb: 3,
                      border: "1px solid rgba(123,46,46,0.1)",
                      fontFamily: "monospace",
                      fontSize: "0.95em",
                    }}
                  >
                    <code style={{ color: "#3D444B" }}>{block.text}</code>
                  </Box>
                )
              ) : null;

            case "image":
              return hasSrc(block) && block.src ? (
                <Box
                  key={i}
                  sx={{
                    my: 4,
                    textAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={block.src}
                    alt={block.alt || ""}
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: 1,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  {block.alt && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "#909090",
                        mt: 2,
                        fontStyle: "italic",
                      }}
                    >
                      {block.alt}
                    </Typography>
                  )}
                </Box>
              ) : null;

            case "link":
              return hasHref(block) && hasText(block) ? (
                <Box
                  key={i}
                  component="a"
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#7B2E2E",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#D4A373",
                    },
                  }}
                >
                  {block.text}
                </Box>
              ) : null;

            default:
              return null;
          }
        })}
      </>
    );
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", pt: 10 }}>
      {/* Hero Section with Gradient Overlay */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 450, md: 500 },
          background: article.image
            ? `linear-gradient(180deg, rgba(123,46,46,0.8) 0%, rgba(0,0,0,0.9) 100%), url(${article.image})`
            : `linear-gradient(180deg, rgba(123,46,46,0.8) 0%, rgba(0,0,0,0.9) 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { md: "fixed" },
        }}
      >
        {/* Back Button */}
        <IconButton
          sx={{
            display: { xs: "none", sm: "grid" },
            position: "absolute",
            top: 100,
            left: { xs: 20, md: 40 },
            bgcolor: "primary.main",
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: "white",
              color: "primary.main",
              transform: "scale(1.1)",
            },
          }}
          aria-label="arrow-back"
        >
          <ArrowBack />
        </IconButton>

        {/* Content Overlay */}
        <Container
          maxWidth="lg"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            pb: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ color: "white", maxWidth: "800px" }}>
            {article.category && (
              <Chip
                label={article.category}
                sx={{
                  bgcolor: "#D4A373",
                  color: "white",
                  mb: 2,
                  fontWeight: 600,
                  px: 2,
                }}
              />
            )}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "2rem", md: "3rem" },
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              {article.title || "Untitled Article"}
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ flexWrap: "wrap", gap: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Person />
                </Avatar>
                <Typography variant="body1">{article.author}</Typography>
              </Box>
              {article.date && (
                <>
                  <Typography variant="body1">•</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarMonth sx={{ fontSize: 20 }} />
                    <Typography variant="body1">{article.date}</Typography>
                  </Box>
                </>
              )}
              {article.readTime && (
                <>
                  <Typography variant="body1">•</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTime sx={{ fontSize: 20 }} />
                    <Typography variant="body1">{article.readTime}</Typography>
                  </Box>
                </>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ mt: 8, pb: 5, position: "relative", zIndex: 1 }}
      >
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={16}
              sx={{
                py: 4,
                pb: 8,
                px: 2,
                bgcolor: "#F6F4F4",
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
              }}
            >
              {/* Breadcrumbs */}
              <Breadcrumbs sx={{ mb: 4 }}>
                <Link
                  href="/"
                  style={{ color: "#7B2E2E", textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  style={{ color: "#7B2E2E", textDecoration: "none" }}
                >
                  News
                </Link>
                <Typography color="text.primary">Article</Typography>
              </Breadcrumbs>

              {/* Display Chips if any */}
              {article.chips && article.chips.length > 0 && (
                <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {article.chips.map((chip, i) => (
                    <Chip
                      key={i}
                      label={chip.label}
                      sx={{
                        bgcolor: "rgba(123,46,46,0.1)",
                        color: "#7B2E2E",
                        border: "1px solid rgba(123,46,46,0.2)",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Article Content */}
              <Box>
                <RenderContent content={article.fullContent} />
              </Box>

              <Divider sx={{ my: 5 }} />

              {/* Share Section */}
              <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#3D444B", fontWeight: 600 }}
                >
                  Share this article
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <IconButton
                    sx={{
                      bgcolor: "#7B2E2E",
                      color: "white",
                      "&:hover": { bgcolor: "#5f2424" },
                    }}
                    aria-label="Facebook Link"
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#1DA1F2",
                      color: "white",
                      "&:hover": { bgcolor: "#1a8cd8" },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#25D366",
                      color: "white",
                      "&:hover": { bgcolor: "#20bd5a" },
                    }}
                  >
                    <WhatsApp />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#505A63",
                      color: "white",
                      "&:hover": { bgcolor: "#3d444b" },
                    }}
                  >
                    <Email />
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12 }}>
            {/* Author Card */}
            <Paper
              elevation={16}
              sx={{
                py: 4,
                pb: 8,
                px: 2,
                mb: 7,
                bgcolor: "primary.contrastText",
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#3D444B",
                }}
              >
                About the Author
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#7B2E2E",
                  }}
                >
                  <Person />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                    color="#3D444B"
                  >
                    {article.author || "Admin"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Content Writer
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Passionate about creating engaging content for REHMA Hostel
                community.
              </Typography>
            </Paper>

            {/* CTA Card */}
            <Paper
              elevation={16}
              sx={{
                pt: 4,
                pb: 6,
                px: 2,
                bgcolor: "#7B2E2E",
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Ready to Join REHMA?
              </Typography>
              <Typography sx={{ mb: 3, opacity: 0.9, color: "#D4A373" }}>
                Experience premium professional accommodation with modern
                facilities
              </Typography>
              <Stack spacing={2} alignItems={"center"}>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  href="/#contact"
                  sx={{
                    bgcolor: "#D4A373",
                    color: "#FDF9F6",
                    borderRadius: 0.5,
                    width: 200,
                    py: "10px",
                    px: "15px",
                    fontWeight: 600,
                    border: "1px solid #7B2E2E",
                    boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.25)",
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: "primary.contrastText",
                      color: "#7B2E2E",
                      boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                    },
                  }}
                >
                  Book a Tour
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  href="/#contact"
                  sx={{
                    bgcolor: "white",
                    color: "#7B2E2E",
                    border: "2px solid #7B2E2E",
                    borderRadius: 0.5,
                    mb: 2,
                    py: "10px",
                    px: "15px",
                    width: 200,
                    fontWeight: 600,
                    boxShadow: "5px 5px 10px rgba(0,0,0,0.15)",
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: "#7B2E2E",
                      color: "white",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PagePreview;
