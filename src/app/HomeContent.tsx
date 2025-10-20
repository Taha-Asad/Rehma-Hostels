// app/HomeContent.tsx
"use client";

import useSectionTracking from "@/hooks/useSectionTracking";
import About from "@/components/home/About";
import Amenities from "@/components/home/Amenities";
import Contact from "@/components/home/Contact";
import FAQS from "@/components/home/FAQS";
import { Hero } from "@/components/home/Hero";
import Location from "@/components/home/Location";
import Rooms from "@/components/home/Rooms";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import { Box } from "@mui/material";
import News from "@/components/home/News";

export default function HomeContent() {
  useSectionTracking(); // client-side scroll tracking

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
      </Box>
      <Box component="section" id="rooms">
        <Rooms />
      </Box>
      <Box component="section" id="reviews">
        <Testimonials />
      </Box>
      <Box component="section" id="faqs">
        <FAQS />
      </Box>
      <Box component="section" id="news">
        <News />
      </Box>
      <Box component="section" id="location">
        <Location />
      </Box>
      <Box component="section" id="contact">
        <Contact />
      </Box>
    </Box>
  );
}
