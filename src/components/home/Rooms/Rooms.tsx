/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowLeft, ArrowRight, Campaign } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { CircleCheckBig } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Image from "next/image";
import { RoomDetailsModal } from "./RoomModal";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function Rooms({ rooms }: { rooms: Room[] }) {
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const swiperRef = useRef<any>(null);

  const handleOpen = (room: Room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        py: 8,
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
            label="ACCOMMODATION OPTIONS"
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
            Choose Your <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Perfect Room{" "}
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
            }}
          >
            Explore comfortable rooms for rent in Lahore from private spaces to
            shared options, each designed to support both your comfort and your
            goals.
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            py: 4,
          }}
        >
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
            {rooms?.map((items, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "fit-content",
                  height: "auto",
                }}
              >
                <Card
                  sx={{
                    mt: 5,
                    ml: { xs: 3.5, md: 1 },
                    width: "100%",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(217,212,209,0.25)",
                    backdropFilter: "blur(8px)",
                    boxShadow:
                      index === 1
                        ? "0 20px 40px rgba(123,46,46,0.45)"
                        : "0 8px 20px rgba(123,46,46,0.25), 0 2px 5px rgba(0,0,0,0.1)",
                    transform: index === 1 ? "translateY(-10px)" : "none",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                    },
                    borderRadius: 1,
                    cursor: "default",
                    height: { xs: 900, sm: 850 },
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="div" // switch from 'img' to 'div' to nest <Image>
                      sx={{
                        width: "100%",
                        maxHeight: "260px",
                        minHeight: "260px",
                        objectFit: "cover",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                        display: "block",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={items.image || "/placeholder.png"}
                        alt={`Room ${index + 1}`}
                        fill // fills the CardMedia container
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        loading="lazy"
                      />
                    </CardMedia>

                    {items.chips.map((chip, i) => (
                      <Chip
                        key={i}
                        icon={chip.icon}
                        label={chip.label}
                        sx={{
                          position: "absolute",
                          ...(chip.position === "top-right" && {
                            top: 10,
                            right: 10,
                          }),
                          ...(chip.position === "top-left" && {
                            top: 10,
                            left: 10,
                          }),
                          ...(chip.position === "bottom-right" && {
                            bottom: 10,
                            right: 10,
                          }),
                          ...(chip.position === "bottom-left" && {
                            bottom: "70%",
                            left: 10,
                          }),

                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          px: 2.5,
                          py: 1.2,
                          borderRadius: "10px",
                          fontWeight: 600,
                          fontFamily: "Inter",
                          fontSize: "0.9rem",
                          border: "1px solid rgba(255,255,255,0.3)",
                          backdropFilter: "blur(8px)",
                          transition: "all 0.4s ease-in-out",

                          ...(chip.position === "top-right"
                            ? {
                                background: "rgba(123,46,46,0.6)",
                                color: "#FFFFFF",
                                "& .MuiChip-icon": { color: "#FFFFFF" },
                              }
                            : {
                                background: "rgba(255,255,255,0.65)",
                                color: "#7B2E2E",
                                "& .MuiChip-icon": { color: "#7B2E2E" },
                              }),

                          "&:hover": {
                            transform: "translateY(-6px)",
                            boxShadow:
                              chip.position === "top-right"
                                ? "0 10px 25px rgba(123,46,46,0.5)"
                                : "0 10px 25px rgba(255,255,255,0.6)",
                            background:
                              chip.position === "top-right"
                                ? "rgba(123,46,46,0.8)"
                                : "rgba(255,255,255,0.85)",
                          },
                        }}
                      />
                    ))}

                    <CardContent
                      sx={{
                        px: 2,
                        py: 3,
                      }}
                    >
                      <Typography
                        variant="h3"
                        fontFamily="Poppins"
                        color="#7B2E2E"
                        sx={{
                          pb: 1,
                        }}
                      >
                        {items.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        fontSize="16px"
                        color="#505A63"
                      >
                        {items.content}
                      </Typography>

                      {/* Top Divider */}
                      <Divider sx={{ my: 2, bgcolor: "rgba(123,46,46,0.3)" }} />

                      {/* Scrollable List */}
                      <Box
                        sx={{
                          position: "relative",
                          maxHeight: 200,
                          overflowY: "auto",
                          py: 1.5,
                          pr: 1,
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(123,46,46,0.5)",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "rgba(123,46,46,0.8)",
                          },
                          // top fade
                          "&::before": {
                            content: '""',
                            position: "sticky",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 12,
                            background:
                              "linear-gradient(to bottom, rgba(246,244,244,1), rgba(246,244,244,0))",
                            zIndex: 1,
                          },
                          // bottom fade
                          "&::after": {
                            content: '""',
                            position: "sticky",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 12,
                            background:
                              "linear-gradient(to top, rgba(246,244,244,1), rgba(246,244,244,0))",
                            zIndex: 1,
                          },
                        }}
                      >
                        {items.serviceList.map((list, j) => (
                          <List key={j} dense disablePadding>
                            <ListItem
                              sx={{
                                alignItems: "flex-start",
                                py: 0.3,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: "30px",
                                  color: "#7B2E2E",
                                }}
                              >
                                <CircleCheckBig size="20px" />
                              </ListItemIcon>

                              <ListItemText
                                primary={list}
                                sx={{
                                  mt: "-2px",
                                  "& .MuiListItemText-primary": {
                                    fontFamily: "Inter",
                                    color: "#505A63",
                                    fontSize: "0.95rem",
                                  },
                                }}
                              />
                            </ListItem>
                          </List>
                        ))}
                      </Box>

                      {/* Bottom Divider */}
                      <Divider sx={{ my: 2, bgcolor: "rgba(123,46,46,0.3)" }} />

                      {/* Price Section */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "6px",
                          mt: "auto",
                          px: 1,
                        }}
                      >
                        <Typography
                          variant="h3"
                          color="#7B2E2E"
                          fontFamily="Inter"
                          fontWeight={700}
                        >
                          {items.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#505A63"
                          sx={{ fontFamily: "Poppins" }}
                        >
                          {items.duration}
                        </Typography>
                      </Box>
                    </CardContent>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: "auto",
                        mb: 5,
                      }}
                    >
                      <Button
                        onClick={() => handleOpen(items)}
                        sx={{
                          bgcolor: index === 1 ? "white" : "#7B2E2E",
                          color: index === 1 ? "#7B2E2E" : "white",
                          border: "2px solid #7B2E2E",
                          borderRadius: 0.5,
                          mb: 2,
                          py: "10px",
                          px: "15px",
                          width: 200,
                          fontWeight: 600,
                          boxShadow:
                            index === 1
                              ? "5px 5px 10px rgba(0,0,0,0.15)"
                              : "5px 5px 10px rgba(123, 46, 46, 0.2)",
                          transition: "all 0.3s",
                          "&:hover": {
                            bgcolor: index === 1 ? "#7B2E2E" : "white",
                            color: index === 1 ? "white" : "#7B2E2E",
                          },
                        }}
                      >
                        Show More Details
                      </Button>
                    </Box>
                  </Stack>
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

          <Box>
            <Container maxWidth={"sm"} sx={{ py: 4 }}>
              <motion.div variants={cardVariants}>
                <Paper
                  elevation={16}
                  sx={{
                    pt: 4,
                    pb: 6,
                    px: 2,
                    bgcolor: "#7B2E2E",
                    boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <Stack direction={"column"}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "rgba(255,255,255,0.1)",
                        border: "2px solid rgba(255,255,255,0.2)",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <Campaign
                        sx={{
                          fontSize: 48,
                          color: "#D4A373",
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
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Special Promotion
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }} color="#D4A373">
                      Book for 6 months and get{" "}
                      <Box component="span" sx={{ fontWeight: 800 }}>
                        1 month FREE
                      </Box>
                      !
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Limited time offer. Contact us for details.
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        pt: 2,
                      }}
                    >
                      <Button
                        component={Link}
                        href="/rooms"
                        sx={{
                          bgcolor: "primary.contrastText",
                          color: "#7B2E2E",
                          borderRadius: 0.5,
                          width: { xs: 200, md: 300 },
                          py: "10px",
                          px: "15px",
                          fontWeight: 600,
                          border: "1px solid #7B2E2E",
                          boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                          transition: "all 0.3s",
                          "&:hover": {
                            color: "#D9D4D1",
                            bgcolor: "#D4A373",
                            boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                          },
                        }}
                      >
                        Show More Room
                      </Button>
                    </Box>
                  </Stack>
                </Paper>
              </motion.div>
            </Container>
          </Box>
        </Box>
      </Container>

      <RoomDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        room={selectedRoom}
      />
    </Box>
  );
}

export default Rooms;
