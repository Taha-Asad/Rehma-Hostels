import { ArrowForward, CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
type PreviewPost = {
  image: string;
  title: string;
  content: string;
  chips: { label: string; position: string }[];
  date: string;
  readTime: string;
  category: string;
  status: string;
};

function CardPreview({ cardPost }: { cardPost: PreviewPost }) {
  return (
    <Container
      sx={{
        py: 2,
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 40px rgba(123,46,46,0.25)",
          borderRadius: 2,
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 25px 50px rgba(123,46,46,0.3)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="div"
            sx={{
              width: "100%",
              height: 250,
              objectFit: "cover",
              overflow: "hidden",
            }}
          >
            {cardPost.image && (
              <Image
                src={cardPost.image}
                alt={cardPost.title}
                fill
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                loading="lazy"
              />
            )}
          </CardMedia>

          {/* Chips on image */}
          {cardPost.chips.map((chip, i) => (
            <Chip
              key={i}
              label={chip.label}
              sx={{
                position: "absolute",
                ...(chip.position === "top-right" && {
                  top: 16,
                  right: 16,
                }),
                ...(chip.position === "bottom-left" && {
                  bottom: 16,
                  left: 16,
                }),
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: "0.875rem",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                ...(chip.position === "top-right"
                  ? {
                      background: "rgba(123,46,46,0.85)",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.2)",
                      "& .MuiChip-icon": {
                        color: "#FFFFFF",
                      },
                    }
                  : {
                      background: "rgba(255,255,255,0.85)",
                      color: "#7B2E2E",
                      border: "1px solid rgba(123,46,46,0.2)",
                      "& .MuiChip-icon": {
                        color: "#7B2E2E",
                      },
                    }),
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
              }}
            />
          ))}
        </Box>

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          {/* Date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              color: "#7B2E2E",
            }}
          >
            <CalendarMonth sx={{ fontSize: 18 }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              {cardPost.date}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              color: "#3D444B",
              mb: 2,
              lineHeight: 1.3,
            }}
          >
            {cardPost.title}
          </Typography>

          {/* Content */}
          <Typography
            variant="body2"
            sx={{
              color: "#505A63",
              lineHeight: 1.7,
              mb: 3,
              flex: 1,
            }}
          >
            {cardPost.content}
          </Typography>

          {/* Read More - Modal Trigger */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "#7B2E2E",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              mt: "auto",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#D4A373",
                gap: 1.5,
                "& .arrow-icon": {
                  transform: "translateX(4px)",
                },
              },
            }}
          >
            Read More
            <ArrowForward
              className="arrow-icon"
              sx={{
                fontSize: 18,
                transition: "transform 0.3s ease",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CardPreview;
