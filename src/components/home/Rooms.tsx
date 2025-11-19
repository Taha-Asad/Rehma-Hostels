/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ArrowLeft,
  ArrowRight,
  Campaign,
  Elevator,
  HotTub,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Rating,
  Avatar,
} from "@mui/material";
import {
  CircleCheckBig,
  Star,
  X,
  Users,
  Clock,
  Shield,
  Wallet,
  Bed,
  BedSingle,
  Router,
  DoorClosedLocked,
  CircleParking,
  Utensils,
  PlugZap,
  AirVent,
  MonitorPlay,
  Cable,
  Refrigerator,
  Zap,
  Gem,
  CalendarCheck,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { scrollToSection } from "@/utils/scrollToSection";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import package1 from "../../../public/Images/package1.png";
import package2 from "../../../public/Images/package2.png";
import package3 from "../../../public/Images/package3.png";
import package4 from "../../../public/Images/package4.png";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Image, { StaticImageData } from "next/image";

interface RoomChip {
  icon: React.ReactElement;
  label: string;
  bgcolor?: string;
  textColor?: string;
  color?: string;
  position: string;
}

interface Room {
  image: string | StaticImageData;
  title: string;
  content: string;
  serviceList: string[];
  chips: RoomChip[];
  price: string;
  duration: string;
  btnText: string;
  capacity?: number;
  size?: string;
  availability?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  amenities?: { icon: React.ReactElement; label: string }[];
  interval?: number;
}

const cards: Room[] = [
  {
    image: package1,
    title: "Standard Non-AC Room",
    content:
      "Comfortable accommodation with essential amenities for extended stays.",
    serviceList: [
      "Comfortable mattress",
      "Personal cubed storage area",
      "Reliable UPS power backup",
      "High-speed Wi-Fi",
      "Secure on-site parking",
      "Optional paid meal plan (Mess)",
      "Electricity billed separately for transparency",
    ],
    chips: [
      { icon: <Wallet />, label: "Economy Stay", position: "bottom-left" },
    ],
    price: "PKR 10,000",
    duration: "Per Person / Per Month",
    btnText: "Show Details",
    capacity: 1,
    availability: "2 rooms available",
    rating: 4.5,
    reviews: 32,
    description:
      "Designed for simplicity and affordability, our non-AC rooms provide a quiet space with dependable power backup and strong connectivity. Perfect for professionals looking for a budget-friendly yet organized stay.",
    amenities: [
      { icon: <Router />, label: "Wi-Fi" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <PlugZap />, label: "UPS Backup" },
      { icon: <BedSingle />, label: "Mattress" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
  {
    image: package2,
    title: "Standard Room (With AC)",
    content:
      "Comfortable AC accommodation with essential amenities at affordable rates.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Wi-Fi",
      "Secure Parking",
      "Single Bed",
      "Elevator Access",
      "Optional Paid Meal Plan (Mess)",
      "Electricity billed separately",
    ],
    chips: [
      { icon: <AirVent />, label: "AC Room", position: "bottom-left" },
      { icon: <Star />, label: "Featured", position: "top-right" },
    ],
    price: "PKR 13,000",
    duration: "Per Person / Per Month",
    btnText: "Reserve Now",
    capacity: 1,
    size: "Single Room",
    availability: "Available",
    rating: 4.3,
    reviews: 26,
    description:
      "A cozy, well-equipped room offering cool comfort and modern facilities. Perfect for professionals or students seeking long-term accommodation with reliable service and privacy.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-Fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
  {
    image: package3,
    title: "Luxury Stay",
    content:
      "Premium accommodation with modern amenities for a comfortable, elegant stay.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Wi-Fi",
      "Secure Parking",
      "Double Bed",
      "Elevator Access",
      "Personal Fridge",
      "Included Electricity Bill",
      "Optional Paid Meal Plan (Mess)",
    ],
    chips: [{ icon: <Gem />, label: "Luxury", position: "bottom-left" }],
    price: "PKR 5,000",
    duration: "Per Day",
    btnText: "Show Details",
    capacity: 2,
    size: "Double Room",
    availability: "Available",
    rating: 4.8,
    reviews: 42,
    description:
      "A high-end stay designed for comfort and style. Ideal for travelers who prefer convenience with all bills included. Offers a private fridge and full-service environment.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-Fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Double Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Refrigerator />, label: "Fridge (Included)" },
      { icon: <Zap />, label: "Electricity Included" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
  {
    image: package4,
    title: "Standard Daily Stay",
    content:
      "Affordable short-term stay with all basic amenities and utilities included.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Wi-Fi",
      "Secure Parking",
      "Single Bed with Mattress",
      "Elevator Access",
      "Electricity Bill Included",
    ],
    chips: [
      { icon: <CalendarCheck />, label: "Short Stay", position: "bottom-left" },
    ],
    price: "PKR 3,500",
    duration: "Per Day",
    btnText: "Book Now",
    capacity: 1,
    size: "Single Room",
    availability: "Available",
    rating: 4.1,
    reviews: 18,
    description:
      "Affordable daily accommodation perfect for quick stays or short visits. Includes all utilities and comfortable essentials for a hassle-free experience.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-Fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Bed with Mattress" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Zap />, label: "Electricity Included" },
    ],
  },
  // I haven't received data for this one
  {
    image:
      "https://images.unsplash.com/photo-1697603899008-a4027a95fd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBjb21tb24lMjByb29tfGVufDF8fHx8MTc2MDQ0NzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Office Package",
    content:
      "Premium accommodation with modern amenities for a comfortable, elegant stay.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Wi-Fi",
      "Secure Parking",
      "Double Bed",
      "Elevator Access",
      "Personal Fridge",
      "Included Electricity Bill",
      "Optional Paid Meal Plan (Mess)",
    ],
    chips: [{ icon: <Gem />, label: "Luxury", position: "bottom-left" }],
    price: "PKR 5,000",
    duration: "Per Day",
    btnText: "Show Details",
    capacity: 2,
    size: "Office Package",
    availability: "Available",
    rating: 4.8,
    reviews: 42,
    description:
      "A high-end stay designed for comfort and style. Ideal for travelers who prefer convenience with all bills included. Offers a private fridge and full-service environment.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-Fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Double Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Refrigerator />, label: "Fridge (Included)" },
      { icon: <Zap />, label: "Electricity Included" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
];


const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface RoomDetailsModalProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  open,
  onClose,
  room,
}) => {
  useEffect(() => {
    const scrollContainer =
      (document.scrollingElement as HTMLElement) ||
      (document.documentElement as HTMLElement);
    let scrollY = 0;

    if (open) {
      scrollY = scrollContainer.scrollTop;

      // Lock scroll
      scrollContainer.style.overflow = "hidden";
      scrollContainer.style.position = "fixed";
      scrollContainer.style.top = `-${scrollY}px`;
      scrollContainer.style.width = "100%";
    } else {
      const top = scrollContainer.style.top;

      // Restore normal flow
      scrollContainer.style.overflow = "";
      scrollContainer.style.position = "";
      scrollContainer.style.top = "";
      scrollContainer.style.width = "";

      // Smoothly return to previous scroll position
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: parseInt(top || "0") * -1,
          behavior: "instant",
        });
      });
    }
  }, [open]);
  if (!room) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          overflow: { xs: "auto", lg: "hidden" },
          height: { xs: "auto", lg: "85vh" },
          maxHeight: { xs: "90vh", lg: "85vh" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          height: "100%",
        }}
      >
        {/* Left Side - Image */}
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" },
            height: { xs: 800, lg: "100%" },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={room.image}
            alt={room.title}
            fill={true}
            style={{
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
          <Chip
            label={room.title}
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              px: 2,
              py: 1,
              height: "auto",
              "& .MuiChip-label": {
                px: 1,
                textWrap: "wrap",
              },
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Right Side - Details */}
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent
            sx={{
              flex: 1,
              p: { xs: 3, lg: 4 },
              overflow: "hidden",
              scrollbarWidth: "thin", // Firefox
              scrollbarColor: "#7B2E2E transparent",
              transition: "all 1s ease-in-out",
              scrollbarGutter: "stable",
              "&:hover": {
                overflowY: "overlay",
              },
              "&::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "transparent", // track
              },
              "&::-webkit-scrollbar:hover": {
                boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7B2E2E",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#D4A373",
                boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
              },
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  color: "#3D444B",
                  mb: 1,
                }}
              >
                {room.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#505A63", mb: 2 }}>
                {room.content}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Rating
                  value={room.rating || 4.5}
                  readOnly
                  precision={0.5}
                  sx={{
                    mt: 0.5,
                    "& .MuiRating-iconFilled": {
                      color: "#7B2E2E",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#BAB1AD",
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: "#505A63" }}>
                  {room.rating} ({room.reviews} reviews)
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Quick Info */}
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Users size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      {room.capacity} Person
                      {room.capacity && room.capacity > 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Clock size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      Available
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Shield size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      Secure
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
              >
                About This Room
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#505A63", lineHeight: 1.8 }}
              >
                {room.description}
              </Typography>
            </Box>

            {/* Amenities */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
              >
                Amenities & Services
              </Typography>
              <Grid container spacing={2}>
                {room.amenities?.map((amenity, index) => (
                  <Grid
                    size={{ xs: 12, sm: 4 }}
                    sx={{
                      placeItems: "center",
                    }}
                    key={index}
                  >
                    <Chip
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 1,
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          <Box
                            sx={{
                              color: "#7B2E2E",
                              display: "flex",
                              alignItems: "center",
                              flexShrink: 0,
                              fontSize: 20,
                            }}
                          >
                            {amenity.icon}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3D444B",
                              fontWeight: 500,
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {amenity.label}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        minWidth: "160px",
                        maxWidth: "160px",
                        py: 3.5,
                        px: 1.5,
                        borderRadius: 0.5,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        bgcolor: "#ECE1E1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Pricing */}
            <Container maxWidth={"sm"}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: "#7B2E2E",
                  background:
                    "linear-gradient(135deg, #7B2E2E 0%, #5F2424 100%)",
                  boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: { xs: "center", sm: "left" },
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Monthly Rent
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#D4A373" }}
                    >
                      {room.price}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {room.duration}
                    </Typography>
                  </Box>
                  <Chip
                    label={room.availability}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      my: 2,
                    }}
                  />
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        scrollToSection("contact");
                      }, 400);
                    }}
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "#D4A373",
                      color: "#FDF9F6",
                      borderRadius: 0.5,
                      width: { xs: 150, sm: 250 },
                      py: "10px",
                      px: "15px",
                      fontWeight: 600,
                      border: "1px solid #7B2E2E",
                      boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.25)",
                      transition: "all 0.3s",
                      "&:hover": {
                        bgcolor: "primary.contrastText",
                        color: "#7B2E2E",
                        boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    href="https://wa.me/923259881310"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: "primary.contrastText",
                      color: "#7B2E2E",
                      borderRadius: 0.5,
                      width: { xs: 150, sm: 250 },
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
                    Contact
                  </Button>
                </Stack>
              </Paper>
            </Container>
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
};

function Rooms() {
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
            {cards.map((items, index) => (
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
                        src={items.image}
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
                        {items.btnText}
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
