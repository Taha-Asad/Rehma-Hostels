"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Cctv, Wifi } from "lucide-react";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  DinnerDining,
  Diversity3,
  Engineering,
  Explore,
  Weekend,
} from "@mui/icons-material";
import { scrollToSection } from "@/utils/scrollToSection";

const cards = [
  {
    icon: <Weekend />,
    title: "Furnished Rooms",
    content:
      "Enjoy fully furnished rooms with comfortable bedding, essential furniture, and a ready-to-move-in setup.",
  },
  {
    icon: <Wifi />,
    title: "High-Speed WiFi",
    content:
      "Unlimited high-speed internet throughout the facility for seamless connectivity",
  },
  {
    icon: <Cctv />,
    title: "CCTV Monitoring",
    content:
      "Live with peace of mind under round-the-clock security and CCTV surveillance across all common areas.",
  },
  {
    icon: <DinnerDining />,
    title: "Mess Service",
    content:
      "Healthy, home-style meals served daily, thoughtfully prepared for a balanced and comfortable living experience.",
  },
  {
    icon: <Engineering />,
    title: "Free Maintenance Services",
    content:
      "No extra charges for repairs or cleaning, take care of room and facility maintenance for you.",
  },
  {
    icon: <Diversity3 />,
    title: "Social Interaction",
    content:
      "Be part of a friendly community where you can connect, share, and grow with like-minded residents.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function Amenities() {
  return (
    <Box
      sx={{
        py: 8,
        backgroundImage: "linear-gradient(to bottom, #D9D4D1, white, #D9D4D1)",
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
          }}
        >
          <Chip
            label="PREMIUM AMENITIES"
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
            Everything You Need <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              For Comfortable Living
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: { xs: "90%", md: "60%" },
            }}
          >
            Experience modern amenities designed to support your academic Our
            rooms for rent in Lahore offer essential comforts and services,
            making everyday living simple, secure, and stress-free.
          </Typography>
        </Box>

        {/* Cards Section with Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={2} sx={{ py: 2 }}>
            {cards.map((items, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <motion.div variants={cardVariants}>
                  <Card
                    sx={{
                      px: { xs: 2, md: 3 },
                      width: "100%",
                      minHeight: { xs: "80%", sm: "300px" },
                      maxHeight: { xs: "80%", sm: "300px" },
                      py: 3,
                      transition: "all 0.3s ease",
                      backgroundColor: "rgba(217,212,209,0.25)",
                      backdropFilter: "blur(8px)",
                      boxShadow:
                        "0 8px 20px rgba(123,46,46,0.25), 0 2px 5px rgba(0,0,0,0.1)",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                      },
                      bgcolor: "#FFFFFF",
                      borderRadius: 1,
                      cursor: "default",
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{
                        transition: "all 0.3s ease",
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
                      <CardMedia
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          color: "#7B2E2E",
                          width: "60px",
                          height: "55px",
                          py: 1,
                          px: 2,
                          ml: 2,
                          borderRadius: 1,
                          bgcolor: "#ECE1E1",
                        }}
                      >
                        {items.icon}
                      </CardMedia>
                      <CardContent>
                        <Box>
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{ py: { xs: 2, sm: 1 }, mb: { xs: "auto" } }}
                          >
                            {items.title}
                          </Typography>
                          <Typography>{items.content}</Typography>
                        </Box>
                      </CardContent>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Quote Section */}
        <Box>
          <Container maxWidth="sm" sx={{ py: 4 }}>
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
              <Stack
                alignItems="center"
                direction="column"
                justifyContent="center"
                textAlign="center"
                spacing={3}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#ECE1E1",
                    border: "2px solid rgba(255,255,255,0.2)",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Explore
                    sx={{
                      fontSize: 48,
                      color: "#7B2E2E",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.1)" },
                        "100%": { transform: "scale(1)" },
                      },
                    }}
                  />
                </Avatar>
                <Typography variant="h3" fontFamily="Poppins">
                  &quot;At REHMA, we believe in providing more than just
                  accommodation — we offer a{" "}
                  <Box component="span" color="#7B2E2E" fontWeight="bold">
                    complete living experience
                  </Box>{" "}
                  that supports your success.&quot;
                </Typography>
                <Button
                  onClick={() => scrollToSection("contact")}
                  sx={{
                    bgcolor: "#7B2E2E",
                    color: "primary.contrastText",
                    borderRadius: 0.5,
                    py: "10px",
                    px: "15px",
                    width: { xs: 200, md: 300 },
                    fontWeight: 600,
                    boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: "primary.contrastText",
                      color: "#7B2E2E",
                    },
                  }}
                >
                  Schedule A Tour
                </Button>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}

export default Amenities;
