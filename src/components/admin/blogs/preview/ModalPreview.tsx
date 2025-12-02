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
import { RenderContent } from "@/components/ui/RenderContent";
import { ContentBlock } from "@/actions/blogs.action";

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
