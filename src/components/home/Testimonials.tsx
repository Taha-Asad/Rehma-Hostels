/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import Stats from "../ui/Stats";
import { ArrowLeft, ArrowRight, People } from "@mui/icons-material";
import { Quote } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { scrollToSection } from "@/utils/scrollToSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
const TestCards = [
  {
    text: `"Stayed here during a work assignment in Lahore, and it was the perfect choice. The environment is peaceful, the rooms are clean, and the Wi-Fi is reliable—everything a working professional needs. The location made commuting to meetings extremely convenient."`,
    value: 4.5,
    avatar: "",
    name: "Ayesha Malik",
  },
  {
    text: '"I frequently travel for tech projects, and this hostel really impressed me. The workspace areas are quiet, the staff is professional, and the atmosphere feels safe and mature. Great option for anyone who needs both affordability and comfort."',
    value: 5,
    avatar: "",
    name: "Muhammad Hamza",
  },
  {
    text: '"I spent a week here during a recruitment drive in Lahore, and I loved the calm, organized environment. The common areas are well-designed for professionals, and the proximity to business districts saved me a lot of time. Highly recommended."',
    value: 4,
    avatar: "",
    name: "Abdullah Ahmad",
  },
  {
    text: "“My experience at REHMA's Girls Hostel in Lahore was wonderful! It felt like a second home, safe, clean, and caring, with delicious food and a welcoming atmosphere.”",
    value: 4,
    avatar: "",
    name: "Saba khan",
  },
  {
    text: '"I stayed here while working on a project in Lahore and had a great experience. The atmosphere is respectful, the facilities are well-maintained, and the location is ideal for professionals. Definitely planning to stay again on my next trip."',
    value: 5,
    avatar: "",
    name: "Ali Usman",
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
  const swiperRef = useRef<any>(null);
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
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              py: 4,
            }}
          >
            {" "}
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={3}
              loop={true}
              freeMode={true}
              allowTouchMove={true}
              speed={1000} // reduce speed for smoother animation
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Autoplay, FreeMode, Navigation, Pagination]}
              spaceBetween={30}
              grabCursor={false}
              centeredSlides={false}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              {" "}
              {TestCards.map((items, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    width: "fit-content",
                    height: "auto",
                    gap: 2,
                  }}
                >
                  {" "}
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
                        <Stack direction="row" alignItems="center" spacing={2}>
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
                          </Box>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
              <Box
                className="swiper-controls"
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Box
                  className="swiper-button custom-prev"
                  onClick={() => swiperRef.current?.slidePrev()}
                  sx={{ cursor: "pointer" }}
                >
                  <ArrowLeft />
                </Box>

                {/* Swiper will render bullets into .swiper-pagination automatically */}
                <div className="swiper-pagination" />
                <Box
                  className="swiper-button custom-next"
                  onClick={() => swiperRef.current?.slideNext()}
                  sx={{ cursor: "pointer" }}
                >
                  <ArrowRight />
                </Box>
              </Box>
              <style jsx global>{`
                .swiper {
                  overflow: visible !important;
                  padding-right: 60px;
                }

                .swiper-wrapper {
                  display: flex;
                  align-items: stretch;
                  transition-timing-function: linear !important;
                }

                .swiper-slide {
                  width: 32% !important;
                  flex-shrink: 0 !important;
                  height: auto !important;
                }

                .swiper-controls {
                  /* centered, same as you wanted */
                }

                .swiper-button {
                  display: grid;
                  place-items: center;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  background-color: #7b2e2e;
                  color: #fff;
                  font-size: 24px;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 10px rgba(123, 46, 46, 0.25);
                  z-index: 30;
                }

                .swiper-button:hover {
                  background-color: #d4a373;
                  transform: scale(1.1);
                }
                .swiper-pagination,
                .custom-pagination {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 8px;
                }
                .swiper-pagination-bullet {
                  background-color: #7b2e2e;
                  opacity: 0.6;
                  width: 10px;
                  border-radius: 50%;
                  height: 10px;
                  margin: 0 4px;
                  transition: all 0.25s ease;
                }

                .swiper-pagination-bullet-active {
                  background-color: #d4a373;
                  opacity: 1;
                  transform: scale(1.2);
                }

                @media (max-width: 1024px) {
                  .swiper-slide {
                    width: 50% !important;
                  }
                }

                @media (max-width: 640px) {
                  .swiper-slide {
                    width: 100% !important;
                  }
                }
              `}</style>
            </Swiper>
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
