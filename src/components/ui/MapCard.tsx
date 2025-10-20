"use client";

import React from "react";
import { Card, CardContent, Button, Box } from "@mui/material";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Leaflet icon fix */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Dynamic import for browser-only component */
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const position: [number, number] = [31.5611293, 74.3371308];

export default function MapCard() {
  return (
    <Card sx={{ px: 3, py: 2, borderRadius: 1, bgcolor: "#FFFFFF" }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ position: "relative", height: 500 }}>
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
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
        </Box>

        <Button
          href="https://www.google.com/maps/dir/?api=1&destination=Relax+Inn+Hotel,+Lahore"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          sx={{ mt: 2, bgcolor: "#7B2E2E", color: "#fff" }}
        >
          Get Directions
        </Button>
      </CardContent>
    </Card>
  );
}
