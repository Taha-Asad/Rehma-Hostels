// app/HomeContent.tsx
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
const Rooms = dynamic(() => import("@/components/home/Rooms"), { ssr: false });

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  ssr: false,
});
const FAQS = dynamic(() => import("@/components/home/FAQS"), { ssr: false });
const News = dynamic(() => import("@/components/home/News"), { ssr: false });
const Location = dynamic(() => import("@/components/home/Location"), {
  ssr: false,
});

const Contact = dynamic(() => import("@/components/home/Contact"), {
  ssr: false,
});

import Box from "@mui/material/Box";
import useSectionTracking from "@/hooks/useSectionTracking";

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
