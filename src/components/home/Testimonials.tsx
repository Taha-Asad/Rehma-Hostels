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
    text: '"REHMA feels like a home away from home. The professional environment combined with genuine care from the staff makes it perfect for serious students. Highly recommended!"',
    value: 4.5,
    avatar: "",
    name: "Ahmed Hassan",
    major: "Computer Science",
    uni: "LUMS",
  },
  {
    text: '"REHMA feels like a home away from home. The professional environment combined with genuine care from the staff makes it perfect for serious students. Highly recommended!"',
    value: 5,
    avatar: "",
    name: "Ahmed Hassan",
    major: "Computer Science",
    uni: "LUMS",
  },
  {
    text: '""REHMA feels like a home away from home. The professional environment combined with genuine care from the staff makes it perfect for serious students. Highly recommended!""',
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
            label="STUDENT TESTIMONIALS"
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
            Trusted by Students <br />
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
            Hear from our community of students and professionals who have found
            their perfect home at REHMA.{" "}
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
                        width: "100%",
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
                      <Stack direction={"column"} alignItems={"left"}>
                        <CardMedia>
                          <Quote size={"30px"} style={{ marginLeft: "5px" }} />
                        </CardMedia>
                        <CardContent>
                          <Typography variant="body1" fontSize={"15px"}>
                            {items.text}
                          </Typography>

                          <Rating
                            value={items.value}
                            precision={0.5}
                            sx={{
                              mt: 2,
                              "& .MuiRating-iconFilled": {
                                color: "#7B2E2E",
                              },
                              "& .MuiRating-iconEmpty": {
                                color: "#BAB1AD",
                              },
                            }}
                          />
                          <Divider sx={{ mt: 2, mb: 2 }} />
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
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
                            </Avatar>{" "}
                            <Box>
                              <Stack
                                direction={"column"}
                                alignItems={"flex-start"}
                              >
                                <Typography
                                  fontWeight={"bold"}
                                  fontFamily={"Inter"}
                                  fontSize={"14px"}
                                  color="#1A1A1A"
                                >
                                  {items.name}
                                </Typography>
                                <Typography
                                  fontFamily={"Inter"}
                                  fontSize={"13px"}
                                >
                                  {items.major}
                                </Typography>
                                <Typography
                                  fontFamily={"Inter"}
                                  fontSize={"13px"}
                                  color="#7B2E2E"
                                >
                                  {items.uni}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Stack>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box>
            <Container maxWidth={"md"} sx={{ py: 4 }}>
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
                    <Typography
                      variant="body1"
                      fontSize={"20px"}
                      fontFamily={"Poppins"}
                    >
                      Join our community of successful students and
                      professionals
                    </Typography>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      sx={{
                        bgcolor: "#7B2E2E",
                        color: "primary.contrastText",
                        borderRadius: 0.5,
                        py: "10px",
                        px: "15px",
                        width: "250px",
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
