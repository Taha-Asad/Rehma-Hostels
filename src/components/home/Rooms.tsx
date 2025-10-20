"use client";
import { People } from "@mui/icons-material";
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
} from "@mui/material";
import {
  CircleCheckBig,
  Star,
  X,
  Wifi,
  Wind,
  Bath,
  Users,
  BedDouble,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import DeskIcon from "@mui/icons-material/Desk";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { scrollToSection } from "@/utils/scrollToSection";
interface RoomChip {
  icon: React.ReactElement;
  label: string;
  bgcolor?: string;
  textColor?: string;
  color?: string;
  position: string;
}

interface Room {
  image: string;
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
}

const cards: Room[] = [
  {
    image:
      "https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkb3JtJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDQ0NzY5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Single Room",
    content: "Private sanctuary for focused study and personal space",
    serviceList: [
      "Private Room",
      "Study Desk & Chair",
      "Wardrobe",
      "AC",
      "Attached Bath",
      "WiFi",
    ],
    chips: [{ icon: <People />, label: "1 Person", position: "bottom-left" }],
    price: "PKR 15,000",
    duration: "per month",
    btnText: "Show Details",
    capacity: 1,
    size: "120 sq ft",
    availability: "2 rooms available",
    rating: 4.5,
    reviews: 32,
    description:
      "Our single rooms offer the perfect balance of privacy and comfort. Each room is equipped with modern amenities to ensure a productive and comfortable stay.",
    amenities: [
      { icon: <Wifi />, label: "High-Speed WiFi" },
      { icon: <Wind />, label: "Air Conditioning" },
      { icon: <Bath />, label: "Attached Bathroom" },
      { icon: <DeskIcon />, label: "Study Desk" },
      { icon: <CheckroomIcon />, label: "Built-in Wardrobe" },
      { icon: <Shield />, label: "24/7 Security" },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1697603899008-a4027a95fd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBjb21tb24lMjByb29tfGVufDF8fHx8MTc2MDQ0NzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Twin Room",
    content: "Shared space with modern amenities and excellent value",
    serviceList: [
      "2 Beds",
      "2 Study Desks",
      "Wardrobes",
      "AC",
      "Shared Bath",
      "WiFi",
    ],
    chips: [
      {
        icon: <Star />,
        label: "Popular",
        bgcolor: "#7B2E2E",
        textColor: "#FFFFFF",
        position: "top-right",
      },
      {
        icon: <People />,
        label: "2 Persons",
        color: "#F1E9E9",
        textColor: "#7B2E2E",
        position: "bottom-left",
      },
    ],
    price: "PKR 10,000",
    duration: "per person/month",
    btnText: "Book Now",
    capacity: 2,
    size: "180 sq ft",
    availability: "5 rooms available",
    rating: 4.8,
    reviews: 67,
    description:
      "Our twin rooms are perfect for students who prefer to share their living space. Each occupant gets their own bed, study desk, and storage space.",
    amenities: [
      { icon: <Wifi />, label: "High-Speed WiFi" },
      { icon: <Wind />, label: "Air Conditioning" },
      { icon: <Bath />, label: "Shared Bathroom" },
      { icon: <DeskIcon />, label: "2 Study Desks" },
      { icon: <CheckroomIcon />, label: "2 Wardrobes" },
      { icon: <Users />, label: "Common Area Access" },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwc3R1ZHklMjBsb3VuZ2V8ZW58MXx8fHwxNzYwNDQ3NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Deluxe Suite",
    content: "Premium living with enhanced comfort and luxury",
    serviceList: [
      "King Bed",
      "Executive Desk",
      "Mini Fridge",
      "AC",
      "Premium Bath",
      "Balcony",
      "WiFi",
    ],
    chips: [{ icon: <People />, label: "1 Person", position: "bottom-left" }],
    price: "PKR 20,000",
    duration: "per month",
    btnText: "Show Details",
    capacity: 1,
    size: "200 sq ft",
    availability: "1 room available",
    rating: 4.9,
    reviews: 18,
    description:
      "Experience luxury living with our deluxe suites. These premium rooms offer spacious layouts, executive furnishing, and exclusive amenities.",
    amenities: [
      { icon: <Wifi />, label: "Premium WiFi" },
      { icon: <Wind />, label: "Premium AC" },
      { icon: <Bath />, label: "Luxury Bathroom" },
      { icon: <DeskIcon />, label: "Executive Desk" },
      { icon: <BedDouble />, label: "King Size Bed" },
      { icon: <MapPin />, label: "Private Balcony" },
    ],
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
  if (!room) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          overflow: "hidden",
          height: { xs: "auto", md: "85vh" },
          maxHeight: { xs: "90vh", md: "85vh" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
        }}
      >
        {/* Left Side - Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: 300, md: "100%" },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={room.image}
            alt={room.title}
            sx={{
              width: "100%",
              height: "100%",
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
            width: { xs: "100%", md: "50%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent
            sx={{
              flex: 1,
              p: { xs: 3, md: 4 },
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
                    <MapPin size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      {room.size}
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
                  <Grid size={{ xs: 6, sm: 4 }} key={index}>
                    <Chip
                      label={amenity.label}
                      icon={amenity.icon}
                      sx={{
                        minWidth: "155px",
                        py: 3.5,
                        px: 1,
                        maxWidth: "155px",
                        borderRadius: 0.5,
                        bgcolor: "#ECE1E1",
                        "& .MuiChip-icon": {
                          color: "#7B2E2E",
                        },
                        "& .MuiChip-label": {
                          textWrap: "wrap",
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Pricing */}
            <Paper
              sx={{
                p: 3,
                bgcolor: "#7B2E2E",
                background: "linear-gradient(135deg, #7B2E2E 0%, #5F2424 100%)",
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                color: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                  }}
                />
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => {
                    scrollToSection("contact");
                    setTimeout(() => onClose(), 100);
                  }}
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#D4A373",
                    color: "#FDF9F6",
                    borderRadius: 0.5,
                    width: 220,
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
                  href="tel:+923001234567"
                  sx={{
                    bgcolor: "primary.contrastText",
                    color: "#7B2E2E",
                    borderRadius: 0.5,
                    width: 220,
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
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
};

function Rooms() {
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

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
        <Box>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={2}>
              {cards.map((items, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <motion.div variants={cardVariants}>
                    <Card
                      sx={{
                        mt: 5,
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
                        bgcolor: "#FFFFFF",
                        borderRadius: 1,
                        cursor: "default",
                        minHeight: "800px",
                        maxHeight: "800px",
                      }}
                    >
                      <Stack
                        direction={"column"}
                        sx={{
                          position: "relative",
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={items.image}
                          alt={`Room ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                            display: "block",
                          }}
                        />

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
                            fontFamily={"Poppins"}
                            color="#7B2E2E"
                          >
                            {items.title}
                          </Typography>
                          <Typography variant="body1" fontSize={"16px"}>
                            {items.content}
                          </Typography>
                          {items.serviceList.map((list, j) => (
                            <List key={j} dense>
                              <ListItem
                                sx={{
                                  alignItems: "flex-start",
                                  py: 0,
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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "6px",
                              mt: 1,
                              px: 2,
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
                            mt: 1,
                            mb: 3,
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
                              width: "150px",
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
                  </motion.div>
                </Grid>
              ))}
            </Grid>
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
                      <Typography
                        variant="body1"
                        sx={{ mb: 1 }}
                        color="#D4A373"
                      >
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
                            width: 300,
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
          </motion.div>
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
