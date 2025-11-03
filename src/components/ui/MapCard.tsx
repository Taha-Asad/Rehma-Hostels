/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const position: [number, number] = [31.5611293, 74.3371308];

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
      <CardContent sx={{ p: 0 }}>
        {/* Map Container */}
        <Box sx={{ position: "relative", height: 500 }}>
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", borderRadius: "4px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                Relax Inn Hotel <br />
                Near MM Alam Road, Lahore
              </Popup>
            </Marker>
          </MapContainer>

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
                Relax Inn Hotel
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.85)" }}
              >
                Near MM Alam Road, Lahore
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Directions Button */}
        <Box
          sx={{ p: 3, bgcolor: "rgba(217,212,209,0.2)", height: "20px" }}
        ></Box>
        <Button
          href="https://www.google.com/maps/dir/?api=1&destination=Relax+Inn+Hotel,+Lahore"
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
