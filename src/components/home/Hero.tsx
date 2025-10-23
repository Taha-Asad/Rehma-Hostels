"use client";
import React from "react";
import { Box, Button, Container, Typography, Chip } from "@mui/material";
import { Shield, HomeWork, Groups } from "@mui/icons-material";
import Link from "next/link";

export function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        pt: { xs: "50px", md: 0 },
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwc3R1ZHklMjBsb3VuZ2V8ZW58MXx8fHwxNzYwNDQ3NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="REHMA Hostel"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Sophisticated overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(61,68,75,0.95), rgba(61,68,75,0.85), rgba(61,68,75,0.75))",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent, transparent, rgba(123,46,46,0.3))",
          }}
        />
      </Box>

      {/* Subtle pattern overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 10,
          py: { xs: 8, md: 16 },
          px: { xs: 3, md: 16 },
          mt: { xs: 8, md: 10 },
        }}
      >
        <Box sx={{}}>
          {/* Eyebrow */}
          <Box sx={{ mb: 4, display: "inline-block" }}>
            <Chip
              label="Luxury made effortless."
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                px: 2,
                py: 2,
                height: "auto",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                "& .MuiChip-label": {
                  px: 1,
                  textWrap: "wrap",
                },
              }}
            />
          </Box>

          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
              fontWeight: 700,
              color: "white",
              mb: 3,
              lineHeight: 1.1,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Welcome to REHMA
            <Box
              component="span"
              sx={{
                display: "block",
                color: "#D9D4D1",
                mt: 1,
              }}
            >
              Professional Rooms for Rent in Lahore{" "}
            </Box>
          </Typography>

          {/* Subtext */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: "grey.200",
              mb: 5,
              lineHeight: 1.6,
              maxWidth: { lg: "42rem" },
              mx: { xs: "auto", lg: 0 },
            }}
          >
            Experience a secure, comfortable, and professional living space
            designed specifically for working professionals.
          </Typography>

          {/* Trust Badges */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 6,
              justifyContent: { xs: "center", lg: "flex-start" },
            }}
          >
            {[
              { icon: <Shield />, text: "Safe & Secure" },
              { icon: <HomeWork />, text: "Like Home" },
              { icon: <Groups />, text: "Professional" },
            ].map((badge, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  px: 2.5,
                  py: 1.5,
                  borderRadius: 2,
                  transition: "All 0.4s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 32px rgba(255, 255, 255, 0.15)",
                    background:
                      "linear-gradient(135deg, rgba(217,212,209,0.25), rgba(123,46,46,0.25))",
                    borderColor: "rgba(255,255,255,0.3)",
                    backdropFilter: "blur(8px)",
                  },
                }}
              >
                <Box sx={{ color: "#D9D4D1", display: "flex" }}>
                  {badge.icon}
                </Box>
                <Typography sx={{ color: "white", fontWeight: 500 }}>
                  {badge.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* CTAs */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: { xs: "center", lg: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              sx={{
                bgcolor: "#7B2E2E",
                color: "white",
                px: 5,
                py: 2,
                fontSize: "1.25rem",
                fontWeight: 600,
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "primary.contrastText",
                  color: "#7B2E2E",
                },
              }}
            >
              Book Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/rooms"
              sx={{
                borderWidth: 2,
                borderColor: "rgba(255,255,255,0.6)",
                color: "white",
                px: 5,
                py: 2,
                fontSize: "1.25rem",
                fontWeight: 600,
                backdropFilter: "blur(4px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "primary.contrastText",
                  bgcolor: "#7B2E2E",
                  borderWidth: 2,
                  borderColor: "#7B2E2E",
                },
              }}
            >
              Explore Rooms
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Bottom fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 128,
          background: "linear-gradient(to top, #D9D4D1, transparent)",
          zIndex: 5,
        }}
      />
    </Box>
  );
}
