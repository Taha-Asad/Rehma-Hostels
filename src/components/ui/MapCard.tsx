"use client";
import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import { MapPin, Navigation } from "lucide-react";
import Image from "next/image";

export default function MapCard() {
  return (
    <Card
      sx={{
        px: { xs: 2, md: 3 },
        width: "100%",
        height: 735,
        py: 2,
        pt: 4.5,
        transition: "all 0.3s ease",
        backgroundColor: "rgba(217,212,209,0.25)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 20px rgba(123,46,46,0.25), 0 2px 5px rgba(0,0,0,0.1)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
        },
        bgcolor: "#FFFFFF",
        borderRadius: 1,
        cursor: "default",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", height: 500 }}>
        <CardMedia
          component={"div"}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
          }}
        >
          <Image
            src={"/Images/map-placeholder.png"}
            alt="map"
            fill
            style={{
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </CardMedia>
        {/* Decorative gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom right, rgba(217,212,209,0.25), transparent, rgba(217,212,209,0.25))",
            pointerEvents: "none",
          }}
        />

        {/* Address label */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(123,46,46,0.95), transparent)",
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "50%",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapPin size={20} color="#7B2E2E" />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Rehma Professional Hostels & Apartment
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.85)" }}
            >
              4/1 Davis Road, Lahore{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
      <CardContent sx={{ p: 0 }}>
        {/* Map Container */}

        {/* Directions Button */}
        <Box
          sx={{ p: 3, bgcolor: "rgba(217,212,209,0.2)", height: "20px" }}
        ></Box>
        <Button
          href="https://maps.app.goo.gl/TEvGsEvny16Tn5gx9"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          fullWidth
          startIcon={<Navigation size={20} />}
          sx={{
            bgcolor: "#7B2E2E",
            color: "primary.contrastText",
            borderRadius: 0.5,
            py: "10px",
            px: "15px",
            mt: 7,
            fontWeight: 600,
            boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "primary.contrastText",
              color: "#7B2E2E",
            },
          }}
        >
          Get Directions
        </Button>
      </CardContent>
    </Card>
  );
}
