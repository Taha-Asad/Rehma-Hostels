"use client";
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
  Link as RouterLink,
} from "@mui/material";
import DialpadIcon from "@mui/icons-material/Dialpad";
import Link from "next/link";
import React from "react";
import MapCard from "../ui/MapCard";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function Location() {
  return (
    <Box
      sx={{
        py: 8,
        overflow: "hidden",
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
            variant="h2"
            sx={{
              color: "#3D444B",
              py: 2,
            }}
          >
            Find Us in <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Lahore, Pakistan
            </Box>
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

        <Box sx={{ py: 3 }}>
          <Grid container spacing={2}>
            {/* LEFT SIDE - Map */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                variants={fadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <MapCard />
              </motion.div>
            </Grid>

            {/* RIGHT SIDE - Cards */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Grid container spacing={2}>
                  {[
                    {
                      icon: <LocationPin />,
                      title: "Address",
                      content: (
                        <>
                          Plot No. 25, Main Boulevard DHA Phase 5, <br /> Lahore
                          Punjab, <br /> Pakistan - 54000
                        </>
                      ),
                    },
                    {
                      icon: <DialpadIcon />,
                      title: "Phone Numbers",
                      content: (
                        <>
                          <RouterLink
                            component={Link}
                            href="tel:+923001122334"
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
                            href="https://wa.me/923001122334"
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
                        </>
                      ),
                    },
                    {
                      icon: <Email sx={{ fontSize: "28px" }} />,
                      title: "Email Address",
                      content: (
                        <>
                          <RouterLink
                            component={Link}
                            href="mailto:info@rehmahotel.com"
                            underline="hover"
                            sx={{
                              fontSize: "17px",
                              display: "flex",
                              color: "#505A63",
                              alignItems: "center",
                              gap: 1,
                              "&:hover": { color: "#7B2E2E" },
                            }}
                          >
                            info@rehmahotel.com
                          </RouterLink>
                          <RouterLink
                            component={Link}
                            href="mailto:contact@rehmahotel.com"
                            underline="hover"
                            sx={{
                              fontSize: "17px",
                              display: "flex",
                              alignItems: "center",
                              color: "#505A63",
                              gap: 1,
                              "&:hover": { color: "#7B2E2E" },
                            }}
                          >
                            contact@rehmahotel.com
                          </RouterLink>
                        </>
                      ),
                    },
                    {
                      icon: <AccessTime sx={{ fontSize: "28px" }} />,
                      title: "Visiting Hours",
                      content: (
                        <>
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
                        </>
                      ),
                    },
                  ].map((item, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 12 }} key={i}>
                      <motion.div variants={fadeInRight}>
                        <Card
                          sx={{
                            px: { xs: 2, md: 3 },
                            width: "100%",
                            height: { sm: 250, md: 170 },
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
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
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
                              {item.icon}
                            </CardMedia>
                            <CardContent sx={{ pt: 0 }}>
                              <Stack direction="column" spacing={1}>
                                <Typography variant="h3" color="#3D444B">
                                  {item.title}
                                </Typography>
                                {item.content}
                              </Stack>
                            </CardContent>
                          </Stack>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Location;
