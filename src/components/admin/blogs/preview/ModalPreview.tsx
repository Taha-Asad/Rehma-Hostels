/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  Divider,
  Stack,
  Paper,
  DialogContent,
} from "@mui/material";
import Image from "next/image";
import {
  Close,
  Person,
  CalendarMonth,
  AccessTime,
  Circle,
  Share,
  OpenInNew,
} from "@mui/icons-material";

// Import ContentBlock type from parent component or define it here
export type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "code"; inline: boolean; text: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "link"; href: string; text: string };

interface ModalPreviewProps {
  modalPost: {
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

const ModalPreview: React.FC<ModalPreviewProps> = ({ modalPost }) => {
  const chipStyle = {
    backgroundColor: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    fontWeight: 600,
    px: 1.5,
    py: 0.5,
    height: "auto",
    "& .MuiChip-icon": {
      fontSize: "16px",
      color: "white",
    },
  };

  const circleStyle = {
    fontSize: "4px",
    color: "rgba(255,255,255,0.6)",
    display: { xs: "none", sm: "block" },
  };

  // Render content blocks
  const RenderContent = ({ content }: { content: ContentBlock[] }) => {
    if (!content || content.length === 0) return null;

    return (
      <>
        {content.map((block, i) => {
          switch (block.type) {
            case "heading":
              return hasLevel(block) && hasText(block) ? (
                <Typography
                  key={i}
                  variant={
                    block.level === 1 ? "h4" : block.level === 2 ? "h5" : "h6"
                  }
                  sx={{
                    color: "primary.contrastText",
                    mt: 3,
                    mb: 1.5,
                    fontWeight: 600,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {block.text}
                </Typography>
              ) : null;

            case "paragraph":
              return hasText(block) ? (
                <Typography
                  key={i}
                  variant="body1"
                  sx={{ color: "#505A63", lineHeight: 1.8, mb: 2 }}
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
                    pl: 3,
                    mb: 2,
                    color: "#505A63",
                    "& li": {
                      mb: 0.75,
                      lineHeight: 1.6,
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
                    pl: 2,
                    ml: 0,
                    my: 2,
                    py: 1,
                    bgcolor: "rgba(123,46,46,0.03)",
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      color: "#505A63",
                      lineHeight: 1.7,
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
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 0.5,
                      fontFamily: "monospace",
                      fontSize: "0.9em",
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
                      p: 2,
                      borderRadius: 1,
                      overflow: "auto",
                      mb: 2,
                      border: "1px solid rgba(123,46,46,0.1)",
                      fontFamily: "monospace",
                      fontSize: "0.9em",
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
                    my: 3,
                    textAlign: "center",
                    "& img": {
                      borderRadius: 1,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={block.src}
                    alt={block.alt || ""}
                    sx={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "inline-block",
                    }}
                  />
                  {block.alt && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "#909090",
                        mt: 1,
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
    <Paper
      sx={{
        overflow: "hidden",
        height: "600px",
        maxHeight: "600px",
        borderRadius: 2,
        bgcolor: "background.main",
        position: "relative",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Modal Header with Image */}
        <Box
          sx={{
            width: "100%",
            height: 240,
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {modalPost.image ? (
            <Image
              src={modalPost.image}
              alt={modalPost.title || "Preview"}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No image selected
              </Typography>
            </Box>
          )}

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            }}
          />

          {/* Close Button */}
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "primary.main",
              backdropFilter: "blur(10px)",
              zIndex: 10,
              width: 36,
              height: 36,
              "&:hover": {
                bgcolor: "white",
                color: "primary.main",
                transform: "scale(1.1)",
              },
            }}
          >
            <Close fontSize="small" />
          </IconButton>

          {/* Title Overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
            }}
          >
            {/* Category Badge */}
            {modalPost.category && (
              <Chip
                label={modalPost.category}
                size="small"
                sx={{
                  bgcolor: "#7B2E2E",
                  color: "white",
                  mb: 1,
                  fontWeight: 600,
                  height: 24,
                }}
              />
            )}

            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: 700,
                fontFamily: "Poppins, sans-serif",
                mb: 1.5,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                lineHeight: 1.3,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {modalPost.title || "Untitled"}
            </Typography>

            {/* Meta Info */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Chip
                icon={<Person />}
                label={modalPost.author || "Admin"}
                size="small"
                sx={chipStyle}
              />

              <Circle sx={circleStyle} />

              {modalPost.date && (
                <>
                  <Chip
                    icon={<CalendarMonth />}
                    label={modalPost.date}
                    size="small"
                    sx={chipStyle}
                  />
                  <Circle sx={circleStyle} />
                </>
              )}

              {modalPost.readTime && (
                <Chip
                  icon={<AccessTime />}
                  label={modalPost.readTime}
                  size="small"
                  sx={chipStyle}
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Modal Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            bgcolor: "#fff",
          }}
        >
          <DialogContent
            sx={{
              flex: 1,
              p: 3,
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7B2E2E",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#D4A373",
                },
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#F1E9E9",
                borderRadius: "10px",
              },
            }}
          >
            {/* Chips Display */}
            {modalPost.chips && modalPost.chips.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 2,
                }}
              >
                {modalPost.chips.map((chip, i) => (
                  <Chip
                    key={i}
                    label={chip.label}
                    size="small"
                    sx={{
                      bgcolor: "rgba(123,46,46,0.1)",
                      color: "#7B2E2E",
                      border: "1px solid rgba(123,46,46,0.2)",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Content Summary */}
            {modalPost.content && (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#505A63",
                    lineHeight: 1.8,
                    mb: 2,
                    fontSize: "1.05rem",
                  }}
                >
                  {modalPost.content}
                </Typography>
                <Divider sx={{ my: 3, borderColor: "rgba(123,46,46,0.1)" }} />
              </>
            )}

            {/* Full Content */}
            {modalPost.fullContent && modalPost.fullContent.length > 0 ? (
              <Box sx={{ mb: 3 }}>
                <RenderContent content={modalPost.fullContent} />
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color: "#909090",
                  fontStyle: "italic",
                  textAlign: "center",
                  py: 4,
                }}
              >
                No detailed content available
              </Typography>
            )}

            <Divider sx={{ my: 3, borderColor: "rgba(123,46,46,0.1)" }} />

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
              }}
            >
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  color: "#7B2E2E",
                  borderColor: "#7B2E2E",
                  borderRadius: 1,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#D4A373",
                    bgcolor: "rgba(123,46,46,0.05)",
                  },
                }}
              >
                Close Preview
              </Button>

              <Stack direction="row" spacing={1}>
                <IconButton
                  sx={{
                    border: "1px solid rgba(123,46,46,0.2)",
                    "&:hover": {
                      bgcolor: "rgba(123,46,46,0.05)",
                    },
                  }}
                >
                  <Share fontSize="small" />
                </IconButton>

                <Button
                  variant="contained"
                  size="medium"
                  endIcon={<OpenInNew fontSize="small" />}
                  sx={{
                    bgcolor: "#7B2E2E",
                    color: "white",
                    borderRadius: 1,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#5f2424",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(123,46,46,0.3)",
                    },
                  }}
                >
                  View Full Article
                </Button>
              </Stack>
            </Box>
          </DialogContent>
        </Box>
      </Box>
    </Paper>
  );
};

export default ModalPreview;
