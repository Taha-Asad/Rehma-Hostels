import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Stats from "../ui/Stats";
import { People } from "@mui/icons-material";
import { Quote } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { scrollToSection } from "@/utils/scrollToSection";

const TestCards = [
  {
    text: "“I had been searching for hostels in Lahore, but most places didn’t feel secure or comfortable. REHMA changed that completely. The rooms are clean, the staff is supportive, and I finally found a peaceful environment where I can relax and feel at ease. It truly feels like home.”",
    value: 4.5,
    avatar: "",
    name: "Ahmed Hassan",
    major: "Computer Science",
    uni: "LUMS",
  },
  {
    text: "“As a working professional, I preferred apartments in Lahore over shared hostels. I’m glad I chose REHMA. The furnished rooms, Wi-Fi, and maintenance services are exactly what I needed. It’s rare to find this level of comfort and management at such a reasonable price.”",
    value: 5,
    avatar: "",
    name: "Ahmed Hassan",
    major: "Computer Science",
    uni: "LUMS",
  },
  {
    text: "“My experience at REHMA’s Girls Hostel in Lahore was wonderful! It felt like a second home, safe, clean, and caring, with delicious food and a welcoming atmosphere.”",
    value: 4,
    avatar: "",
    name: "Ahmed Hassan",
    major: "Computer Science",
    uni: "LUMS",
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
function Testimonials() {
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
            label="TESTIMONIALS"
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
            Trusted by Professionals <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Across Lahore{" "}
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
            }}
          >
            Hear from our community of professionals who have found their
            perfect home at REHMA.{" "}
          </Typography>
        </Box>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <motion.div variants={cardVariants}>
                  <Stats
                    value={4.9}
                    rating={4.9}
                    label="Average Rating"
                    suffix=""
                  />
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <motion.div variants={cardVariants}>
                  <Stats
                    value={500}
                    suffix="+"
                    labelIcon={<People />}
                    label="Happy Residents"
                  />{" "}
                </motion.div>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              {TestCards.map((items, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        px: { xs: 1, md: 3 },
                        py: 3,
                        width: "100%",
                        height: { md: 480, lg: 420 },
                        display: "flex", // make Card itself a flex container
                        flexDirection: "column",
                        justifyContent: "space-between", // ensures top and bottom are spaced
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
                      }}
                    >
                      <CardMedia>
                        <Quote size={"30px"} style={{ marginLeft: "5px" }} />
                      </CardMedia>

                      <CardContent
                        sx={{
                          flexGrow: 1, // fills available vertical space
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="body1" fontSize="15px">
                          {items.text}
                        </Typography>

                        <Rating
                          value={items.value}
                          precision={0.5}
                          sx={{
                            mt: 2,
                            "& .MuiRating-iconFilled": { color: "#7B2E2E" },
                            "& .MuiRating-iconEmpty": { color: "#BAB1AD" },
                          }}
                        />

                        {/* Bottom section sticks to bottom */}
                        <Box sx={{ mt: "auto" }}>
                          <Divider sx={{ mb: 2 }} />
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar
                              alt={items.name}
                              src={items.avatar || undefined}
                              sx={{
                                width: 48,
                                height: 48,
                                bgcolor: "#098698",
                                fontWeight: 600,
                                border: "2px solid #fff",
                                "&:hover": {
                                  transform: "scale(1.1)",
                                  transition: "0.2s ease",
                                },
                              }}
                            >
                              {!items.avatar &&
                                items.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                            </Avatar>

                            <Box>
                              <Typography
                                fontWeight="bold"
                                fontSize="14px"
                                color="#1A1A1A"
                              >
                                {items.name}
                              </Typography>
                              <Typography fontSize="13px">
                                {items.major}
                              </Typography>
                              <Typography fontSize="13px" color="#7B2E2E">
                                {items.uni}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box>
            <Container maxWidth={"sm"} sx={{ py: 4 }}>
              <motion.div variants={cardVariants}>
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
                    alignItems={"center"}
                    direction={"column"}
                    justifyContent={"center"}
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
                      <People
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
                    <Typography
                      variant="body1"
                      fontSize={"20px"}
                      fontFamily={"Poppins"}
                    >
                      Join our community of successful professionals
                    </Typography>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      sx={{
                        bgcolor: "#7B2E2E",
                        color: "primary.contrastText",
                        borderRadius: 0.5,
                        py: "10px",
                        px: "15px",
                        width: { sm: 200, md: 250 },
                        textWrap: "nowrap",
                        fontWeight: 600,
                        boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                        transition: "all 0.3s",
                        "&:hover": {
                          bgcolor: "primary.contrastText",
                          color: "#7B2E2E",
                        },
                      }}
                    >
                      Book Your Room Today
                    </Button>
                  </Stack>
                </Paper>
              </motion.div>
            </Container>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Testimonials;
