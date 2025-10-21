import React from "react";
import {
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import hero from "../../../public/Images/Hero.jpeg";
import {
  AutoAwesomeRounded,
  People,
  Shield,
  SignalWifiStatusbar4Bar,
  VolunteerActivism,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const aboutUs = [
  {
    icon: <People />,
    title: "Separate Sections for Boys & Girls",
    content:
      "Rehma offers dedicated and secure spaces for all residents. Whether you’re looking for a boys hostel in Lahore or a girls hostel in Lahore, our facilities ensure privacy, comfort, and a peaceful stay.",
  },
  {
    icon: <AutoAwesomeRounded />,
    title: "Rehma's Digital Management System",
    content:
      "Our smart management system makes living effortless — from online bookings and payments to maintenance requests and instant communication with our team.",
  },
  {
    icon: <VolunteerActivism />,
    title: "Professional & Caring Staff",
    content:
      "Our trained and friendly staff are available around the clock, ensuring every resident receives the care, respect, and assistance they deserve.",
  },
  {
    icon: <Shield />,
    title: "Advanced Security Systems",
    content:
      "Your safety is our top priority. With 24/7 CCTV monitoring, biometric access, and security personnel on duty, you can live with peace of mind.",
  },
  {
    icon: <SignalWifiStatusbar4Bar />,
    title: "High-Speed WiFi Connectivity",
    content:
      "Enjoy unlimited, reliable, and high-speed internet across the entire facility, perfect for studying, working, or streaming your favorite shows.",
  },
  {
    icon: <People />,
    title: "Flexible Accommodation Plans",
    content:
      "Choose from a variety of stay options — daily, monthly, or semester-based packages designed to match your schedule and lifestyle.",
  },
];

function About() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            pb: 5,
          }}
        >
          <Chip
            label="About Rehma"
            variant="outlined"
            sx={{
              bgcolor: "#F1E9E9",
              "& .MuiChip-label": {
                color: "#7B2E2E",
                fontWeight: 600,
              },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              color: "#3D444B",
              py: 2,
            }}
          >
            Affordable Hostels & Apartments <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              In Lahore
            </Box>{" "}
          </Typography>
        </Box>
        <Box sx={{ py: 3 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ sm: 12, md: 6 }}>
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 60, damping: 14 }}
                style={{ width: "100%" }}
              >
                <Box
                  sx={{
                    borderRadius: "20px",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                  }}
                >
                  <Box
                    component={Image}
                    src={hero}
                    alt="About Section"
                    sx={{
                      borderRadius: "20px",
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "#3D444B",
                  py: 2,
                }}
              >
                More Than Just{" "}
                <Box component="span" sx={{ color: "#7B2E2E" }}>
                  Accommodation{" "}
                </Box>{" "}
              </Typography>
              <Typography variant="body1">
                Rehma Professional Hostels & Apartments, comfort and reliability
                make all the difference when it comes to finding the right place
                to live. Situated in a peaceful and convenient area of Lahore,
                we offer well-managed and fully maintained spaces that truly
                feel like home. Our rooms for rent in Lahore are designed to
                provide the perfect mix of privacy, convenience, and modern
                amenities, making everyday living simple and stress-free. With a
                calm environment, responsive management,
                <Box
                  component={"span"}
                  sx={{ color: "#7B2E2E", fontWeight: "bold" }}
                >
                  {" "}
                  focus on cleanliness and comfort,{" "}
                </Box>{" "}
                Rehma ensures you can settle in easily and{" "}
                <Box
                  component={"span"}
                  sx={{ color: "#7B2E2E", fontWeight: "bold" }}
                >
                  enjoy a pleasant, worry-free stay
                </Box>
                .
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Paper
          elevation={16}
          sx={{
            py: 4,
            pb: 8,
            px: 2,
            bgcolor: "#F6F4F4",
            boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                textAlign: "center",
                pb: 2,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "#3D444B",
                  py: 2,
                }}
              >
                What Sets Us Apart
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#505A63",
                }}
              >
                Experience the Rehma difference, where comfort, security, and
                reliability come together to make everyday living easier for
                professionals and residents.
              </Typography>
            </Box>
          </Container>
          <Grid container spacing={2}>
            {aboutUs.map((items, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
                <Stack
                  component={motion.div}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: index * 0.12,
                    type: "spring",
                    stiffness: 70,
                  }}
                  direction={"row"}
                  spacing={3}
                  alignItems={"center"}
                  sx={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    mt: `${index * 1.5}px`,
                    "&:hover > :nth-of-type(1)": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                      transition: "all 0.3s ease",
                    },
                    "&:hover > :nth-of-type(2) > :nth-of-type(1)": {
                      transition: "all 0.4s ease",
                      color: "#7B2E2E",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      border: "1px solid transparent",
                      color: "#7B2E2E",
                      bgcolor: "#E8DDDC",
                      borderRadius: 1,
                      height: "50px",
                      minWidth: "55px",
                      placeItems: "center",
                    }}
                  >
                    {items.icon}
                  </Box>
                  <Stack direction={"column"}>
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      color="#3D444B"
                      fontFamily={"Poppins"}
                      fontSize={"16px"}
                    >
                      {items.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#505A63"
                      fontSize={"14px"}
                    >
                      {items.content}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default About;
