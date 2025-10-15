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
export default function Home() {
  return (
    <Box>
      <Hero />
      <About />
      <StatsSection />
      <Amenities />
      <Rooms />
      <Testimonials />
      <FAQS />
      <Location />
      <Contact />
    </Box>
  );
}
