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
const aboutUs = [
  {
    icon: <People />,
    title: "Separate Sections for Boys & Girls",
    content:
      "Dedicated sections with separate entrances and facilities ensuring complete privacy and comfort for all residents",
  },
  {
    icon: <AutoAwesomeRounded />,
    title: "HSM Digital Management System",
    content:
      "Smart technology for seamless bookings, payments, maintenance requests, and instant communication",
  },
  {
    icon: <VolunteerActivism />,
    title: "Professional & Caring Staff",
    content:
      "Experienced team dedicated to providing exceptional service and support 24/7 for your peace of mind",
  },
  {
    icon: <Shield />,
    title: "Advanced Security Systems",
    content:
      "CCTV surveillance, biometric access control, and round-the-clock security personnel for your safety",
  },
  {
    icon: <SignalWifiStatusbar4Bar />,
    title: "High-Speed WiFi Connectivity",
    content:
      "Unlimited high-speed internet throughout the facility supporting your studies and entertainment",
  },
  {
    icon: <People />,
    title: "Flexible Accommodation Plans",
    content:
      "Choose from daily, monthly, or semester-based packages tailored to your academic schedule",
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
            variant="h1"
            sx={{
              color: "#3D444B",
              py: 2,
            }}
          >
            Your Home Away <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              From Home
            </Box>{" "}
          </Typography>
        </Box>
        <Box sx={{ py: 3 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ sm: 12, md: 6 }}>
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
                At REHMA Professional Hostel & Apartments, we understand that
                finding the right accommodation is crucial to your academic and
                professional success. That&apos;s why we&apos;ve created a
                living environment that combines the{" "}
                <Box
                  component={"span"}
                  sx={{ color: "#7B2E2E", fontWeight: "bold" }}
                >
                  comfort of home
                </Box>{" "}
                with the{" "}
                <Box
                  component={"span"}
                  sx={{ color: "#7B2E2E", fontWeight: "bold" }}
                >
                  reliability of professional management
                </Box>
                .
              </Typography>
              <Typography>
                Since our establishment, we&apos;ve been committed to providing
                students and working professionals with a safe, comfortable, and
                supportive environment in the heart of Lahore. Our facility is
                designed to help you focus on what matters most — your studies
                and career growth. We believe that where you live shapes how you
                live. That&apos;s why every aspect of REHMA is carefully crafted
                to support your journey, from our modern amenities to our
                dedicated staff who treat every resident like family.
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
                variant="h1"
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
                Experience the REHMA difference with features designed
                specifically for student and professional success{" "}
              </Typography>
            </Box>
          </Container>
          <Grid container spacing={2}>
            {aboutUs.map((items, index) => (
              <Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
                <Stack
                  direction={"row"}
                  spacing={3}
                  alignItems={"center"}
                  sx={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
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
                      width: "80px",
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
