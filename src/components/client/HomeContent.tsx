"use client";
const Hero = dynamic(() => import("@/components/home/Hero"), { ssr: false });
import dynamic from "next/dynamic";
const About = dynamic(() => import("@/components/home/About"), { ssr: false });
const StatsSection = dynamic(() => import("@/components/home/StatsSection"), {
  ssr: false,
});
const Amenities = dynamic(() => import("@/components/home/Amenities"), {
  ssr: false,
});

import Box from "@mui/material/Box";

export default function HomeContent() {
  return (
    <Box>
      <Box component="section" id="home">
        <Hero />
      </Box>
      <Box component="section" id="about">
        <About />
      </Box>
      <Box component="section" id="stats">
        <StatsSection />
      </Box>
      <Box component="section" id="amenities">
        <Amenities />
      </Box>{" "}
    </Box>
  );
}
