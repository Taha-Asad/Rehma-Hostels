import {
  AccessTime,
  Call,
  Email,
  LocationPin,
  WhatsApp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DialpadIcon from "@mui/icons-material/Dialpad";
import Link from "next/link";
import React from "react";
import { Link as RouterLink } from "@mui/material";
import MapCard from "../ui/MapCard";
function Location() {
  return (
    <Box
      sx={{
        py: 8,
        backgroundImage: "linear-gradient(to bottom, #D9D4D1, white, #D9D4D1);",
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
            label="LOCATION"
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
            Find Us in <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Lahore, Pakistan
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
            }}
          >
            Conveniently located with excellent access to major universities and
            city amenities.
          </Typography>
        </Box>

        <Box
          sx={{
            py: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <MapCard />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{
                      px: { xs: 2, md: 3 },
                      width: "100%",
                      pt: 2,
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
                    <Stack direction={"row"} spacing={2}>
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
                        <LocationPin />
                      </CardMedia>
                      <CardContent sx={{ pt: 0 }}>
                        <Stack direction={"column"}>
                          <Typography variant="h2" color="#3D444B">
                            Address
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontSize: "15px", pt: 2, color: "#505A63" }}
                          >
                            Plot No. 25, Main Boulevard DHA Phase 5, <br />{" "}
                            Lahore Punjab, <br /> Pakistan - 54000
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Stack>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{
                      px: { xs: 2, md: 3 },
                      width: "100%",
                      pt: 2,
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
                    <Stack direction="row" spacing={2}>
                      <CardMedia
                        sx={{
                          mt: "4px",
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
                        <DialpadIcon />
                      </CardMedia>

                      <CardContent sx={{ pt: 0 }}>
                        <Stack direction={"column"} spacing={1} sx={{ pt: 0 }}>
                          <Typography variant="h2" color="#3D444B">
                            Phone Numbers
                          </Typography>

                          <RouterLink
                            component={Link}
                            href="tel:+1234567890"
                            underline="hover"
                            sx={{
                              fontSize: "17px",

                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: "#7B2E2E",
                            }}
                          >
                            <Call sx={{ fontSize: "22px" }} />
                            +92 300 1122334
                          </RouterLink>

                          <RouterLink
                            component={Link}
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{
                              fontSize: "17px",

                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: "#25D366",
                            }}
                          >
                            <WhatsApp sx={{ fontSize: "24px" }} />
                            +92 300 1122334
                          </RouterLink>

                          <Typography
                            fontSize={"14px"}
                            fontFamily={"Inter"}
                            color="#098698"
                          >
                            Available 24/7 for emergencies
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Stack>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{
                      px: { xs: 2, md: 3 },
                      width: "100%",
                      pt: 2,
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
                    <Stack direction="row" spacing={2}>
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
                        <Email sx={{ fontSize: "28px" }} />
                      </CardMedia>

                      <CardContent sx={{ pt: 0 }}>
                        <Stack direction={"column"} spacing={1}>
                          <Typography variant="h2" color="#3D444B">
                            Email Address
                          </Typography>

                          <RouterLink
                            component={Link}
                            href="mailto:hostelmanagement@gmail.com"
                            underline="hover"
                            sx={{
                              fontSize: "17px",
                              display: "flex",
                              color: "#505A63",
                              alignItems: "center",
                              gap: 1,
                              "&:hover": {
                                color: "#7B2E2E",
                              },
                            }}
                          >
                            info@rehmahotel.com
                          </RouterLink>
                          <RouterLink
                            component={Link}
                            href="mailto:hostelmanagement@gmail.com"
                            underline="hover"
                            sx={{
                              fontSize: "17px",
                              display: "flex",
                              alignItems: "center",
                              color: "#505A63",
                              gap: 1,
                              "&:hover": {
                                color: "#7B2E2E",
                              },
                            }}
                          >
                            info@rehmahotel.com
                          </RouterLink>
                        </Stack>
                      </CardContent>
                    </Stack>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{
                      px: { xs: 2, md: 3 },
                      width: "100%",
                      py: 2,
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
                    <Stack direction="row" spacing={2}>
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
                        <AccessTime sx={{ fontSize: "28px" }} />
                      </CardMedia>

                      <CardContent sx={{ pt: 0 }}>
                        <Stack direction={"column"} spacing={1}>
                          <Typography variant="h2" color="#3D444B">
                            Visiting Hours
                          </Typography>
                          <Typography color="#505A63" variant="body1">
                            Monday - Sunday
                          </Typography>
                          <Typography
                            color="#7B2E2E"
                            variant="body1"
                            fontWeight={"bold"}
                          >
                            9:00 AM - 7:00 PM
                          </Typography>
                          <Typography
                            color="#505A63"
                            variant="body1"
                            fontSize={"14px"}
                          >
                            Walk-ins welcome, appointments preferred
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Location;
