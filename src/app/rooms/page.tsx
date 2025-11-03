"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Slider,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
  Rating,
  IconButton,
  Drawer,
  Badge,
  Pagination,
  Fade,
  Dialog,
  DialogContent,
  Autocomplete,
} from "@mui/material";
import {
  Search,
  GridView,
  ViewList,
  People,
  Star,
  FilterAlt,
  TrendingUp,
  LocationOn,
  CheckCircle,
  TrendingDown,
  Grade,
  HotTub,
  Elevator,
} from "@mui/icons-material";
import { serviceOptions, serviceIcons } from "../../utils/ServiceOptions";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AirVent,
  Bed,
  BedSingle,
  Cable,
  CircleParking,
  Clock,
  DoorClosedLocked,
  MapPin,
  MonitorPlay,
  PlugZap,
  Refrigerator,
  Router,
  Shield,
  Users,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import { scrollToSection } from "@/utils/scrollToSection";
// import { motion } from "framer-motion";

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
          overflow: { xs: "auto", md: "hidden" },
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
                  <Grid
                    size={{ xs: 12, sm: 4 }}
                    sx={{
                      justifyContent: { xs: "center" },
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
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: { xs: "center", md: "left" },
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
                    PKR {room.price}
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

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
                    width: { xs: 150, md: 220 },
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
                    width: { xs: 150, md: 220 },
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

interface Room {
  id: number;
  image: string;
  title: string;
  content: string;
  price: number;
  capacity: number;
  size: string;
  services: string[];
  rating: number;
  reviews: number;
  available: boolean;
  featured?: boolean;
  description?: string;
  amenities?: { label: string; icon: React.ReactElement }[];
  duration?: string;
  availability?: string;
}

const allRooms: Room[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Package 1: Without AC",
    content: "Basic stay without AC, electricity bill separate",
    price: 10000,
    capacity: 4, // assuming per person
    size: "Standard",
    services: [
      "Mattress",
      "Cubed storage",
      "UPS",
      "Wifi",
      "Parking",
      "Mess (Paid)",
    ],
    rating: 4.2,
    reviews: 15,
    available: true,
    featured: false, // optional
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
    duration: "per person",
    availability: "Available Now",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1697603899008-a4027a95fd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Package 2: With AC",
    content: "Stay with AC, electricity separate",
    price: 13000,
    capacity: 1, // per person
    size: "Standard",
    services: [
      "AC",
      "LED",
      "Cable",
      "Hot Water (Geyser)",
      "Cubed storage",
      "Wifi",
      "Parking",
      "Bed",
      "Elevator Access",
      "Mess (Paid)",
    ],
    rating: 4.5,
    reviews: 20,
    available: true,
    featured: true,
    description: "Electricity separate",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    duration: "per person",
    availability: "Available Now",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Package 3: Luxury Stay",
    content: "Luxury stay with included electricity bill",
    price: 5000,
    capacity: 2, // assuming double bed
    size: "Luxury",
    services: [
      "AC",
      "LED",
      "Cable",
      "Hot Water (Geyser)",
      "Cubed storage",
      "Wifi",
      "Parking",
      "Double Bed",
      "Elevator",
      "Fridge",
      "Mess (Paid)",
    ],
    rating: 4.9,
    reviews: 30,
    available: true,
    featured: true,
    description: "Electricity bill included",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Double Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Refrigerator />, label: "Fridge (Included)" },
      { icon: <Zap />, label: "Electricity Included" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    duration: "per day",
    availability: "Available Now",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Package 4: Per Day Stay",
    content: "Short stay with included electricity bill",
    price: 3500,
    capacity: 1, // assuming per bed
    size: "Standard",
    services: [
      "AC",
      "LED",
      "Cable",
      "Hot Water (Geyser)",
      "Cubed storage",
      "Wifi",
      "Parking",
      "Bed",
      "Mattress",
      "Elevator",
    ],
    rating: 4.1,
    reviews: 8,
    available: true,
    featured: false,
    description: "Electricity bill included",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Double Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Refrigerator />, label: "Fridge (Included)" },
      { icon: <Zap />, label: "Electricity Included" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    duration: "per day",
    availability: "Available Now",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Office Room",
    content: "Comfortable office space for small teams",
    price: 20000,
    capacity: 5,
    size: "Medium",
    services: [
      "Wifi",
      "AC",
      "Desk",
      "Chairs",
      "Projector",
      "Parking",
      "Elevator",
    ],
    rating: 4.3,
    reviews: 12,
    available: true,
    featured: false,
    description: "Electricity and internet included",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Wi-fi" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Bed with Mattress" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Zap />, label: "Electricity Included" },
    ],
    duration: "per month",
    availability: "Available Now",
  },
];

const options = [
  {
    value: "featured",
    label: "Featured",
    icon: <Star sx={{ color: "#D4A373" }} />,
  },
  {
    value: "priceLow",
    label: "Price: Low to High",
    icon: <TrendingUp sx={{ color: "#098698" }} />,
  },
  {
    value: "priceHigh",
    label: "Price: High to Low",
    icon: <TrendingDown sx={{ color: "#C0392B" }} />,
  },
  {
    value: "rating",
    label: "Highest Rated",
    icon: <Grade sx={{ color: "#F4B400" }} />,
  },
];
export default function RoomsPage() {
  const [rooms] = useState<Room[]>(allRooms);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(allRooms);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 30000]);
  const [selectedCapacity, setSelectedCapacity] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "available" | "occupied"
  >("all");

  // Add modal state
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let filtered = [...rooms];

    if (searchTerm) {
      filtered = filtered.filter(
        (room) =>
          room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (availabilityFilter !== "all") {
      filtered = filtered.filter((room) =>
        availabilityFilter === "available" ? room.available : !room.available
      );
    }

    filtered = filtered.filter(
      (room) => room.price >= priceRange[0] && room.price <= priceRange[1]
    );

    if (selectedCapacity.length > 0) {
      filtered = filtered.filter((room) =>
        selectedCapacity.includes(room.capacity)
      );
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter((room) =>
        selectedServices.every((service) => room.services.includes(service))
      );
    }

    switch (sortBy) {
      case "priceLow":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredRooms(filtered);
    setPage(1);
  }, [
    rooms,
    searchTerm,
    priceRange,
    selectedCapacity,
    selectedServices,
    sortBy,
    availabilityFilter,
  ]);
  useEffect(() => {
    if (filterDrawerOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [filterDrawerOpen]);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleCapacityChange = (capacity: number) => {
    setSelectedCapacity((prev) =>
      prev.includes(capacity)
        ? prev.filter((c) => c !== capacity)
        : [...prev, capacity]
    );
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 30000]);
    setSelectedCapacity([]);
    setSelectedServices([]);
    setSortBy("featured");
    setAvailabilityFilter("all");
  };

  // Add modal handlers
  const handleOpenModal = (room: Room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 30000 ? 1 : 0) +
    selectedCapacity.length +
    (selectedServices.length > 0 ? 1 : 0) +
    (availabilityFilter !== "all" ? 1 : 0);

  const FilterSidebar = () => (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(135deg, #7B2E2E 0%, #D4A373 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Filters
        </Typography>
        <IconButton
          onClick={() => setFilterDrawerOpen(false)}
          sx={{ display: { md: "none" } }}
        >
          <X />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3, borderColor: "#F1E9E9" }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
        >
          Availability
        </Typography>
        <ToggleButtonGroup
          value={availabilityFilter}
          exclusive
          onChange={(e, newValue) =>
            newValue && setAvailabilityFilter(newValue)
          }
          fullWidth
          sx={{
            "& .MuiToggleButton-root": {
              borderRadius: 2,
              border: "1px solid #F1E9E9",
              py: 1,
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                bgcolor: "#7B2E2E",
                color: "white",
                "&:hover": {
                  bgcolor: "#5f2424",
                },
              },
              "&:hover": {
                bgcolor: "#7B2E2E08",
              },
            },
          }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="available">Available</ToggleButton>
          <ToggleButton value="occupied">Occupied</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
        >
          Price Range (PKR)
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={30000}
            step={1000}
            sx={{
              color: "#7B2E2E",
              "& .MuiSlider-thumb": {
                bgcolor: "#7B2E2E",
                boxShadow: "0 3px 10px rgba(123,46,46,0.3)",
                "&:hover": {
                  boxShadow: "0 5px 15px rgba(123,46,46,0.5)",
                },
              },
              "& .MuiSlider-track": {
                background: "linear-gradient(90deg, #7B2E2E 0%, #D4A373 100%)",
              },
              "& .MuiSlider-rail": {
                bgcolor: "#F1E9E9",
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
          <Chip
            label={`PKR ${priceRange[0].toLocaleString()}`}
            size="small"
            sx={{ bgcolor: "#F1E9E9", color: "#7B2E2E", fontWeight: 600 }}
          />
          <Chip
            label={`PKR ${priceRange[1].toLocaleString()}`}
            size="small"
            sx={{ bgcolor: "#F1E9E9", color: "#7B2E2E", fontWeight: 600 }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
        >
          Room Capacity
        </Typography>
        <Stack spacing={1}>
          {[2, 3, 4].map((capacity) => (
            <Paper
              key={capacity}
              elevation={0}
              sx={{
                p: 1.5,
                bgcolor: selectedCapacity.includes(capacity)
                  ? "#7B2E2E08"
                  : "#FAFAFA",
                border: `1px solid ${
                  selectedCapacity.includes(capacity) ? "#7B2E2E" : "#F1E9E9"
                }`,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#7B2E2E",
                  bgcolor: "#7B2E2E08",
                },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCapacity.includes(capacity)}
                    onChange={() => handleCapacityChange(capacity)}
                    sx={{
                      color: "#7B2E2E",
                      "&.Mui-checked": {
                        color: "#7B2E2E",
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <People sx={{ fontSize: 18, color: "#7B2E2E" }} />
                    <Typography sx={{ fontWeight: 500 }}>
                      {capacity} Person{capacity > 1 ? "s" : ""}
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
          >
            Services & Amenities
          </Typography>
          <Stack spacing={1}>
            {serviceOptions.map((service) => (
              <Paper
                key={service}
                elevation={0}
                sx={{
                  p: 1.5,
                  bgcolor: selectedServices.includes(service)
                    ? "#09869808"
                    : "#FAFAFA",
                  border: `1px solid ${
                    selectedServices.includes(service) ? "#098698" : "#F1E9E9"
                  }`,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#098698",
                    bgcolor: "#09869808",
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      size="small"
                      sx={{
                        color: "#098698",
                        "&.Mui-checked": {
                          color: "#098698",
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {serviceIcons[service]}
                      <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                        {service}
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>

      <Button
        fullWidth
        variant="outlined"
        onClick={clearFilters}
        sx={{
          borderColor: "#7B2E2E",
          color: "#7B2E2E",
          borderRadius: 2,
          py: 1.5,
          fontWeight: 600,
          background: "linear-gradient(135deg, #FFFFFF 0%, #F1E9E9 100%)",
          "&:hover": {
            borderColor: "#5f2424",
            background: "linear-gradient(135deg, #7B2E2E 0%, #5f2424 100%)",
            color: "white",
          },
        }}
      >
        Clear All Filters
      </Button>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", pt: 12 }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #7B2E2E 0%, #5f2424 100%)",
          py: { xs: 8, md: 12 },
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(212, 163, 115, 0.2)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in timeout={800}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontFamily: "Poppins, sans-serif",
                mb: 2,
                textAlign: "center",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              Our Rooms
            </Typography>
          </Fade>
          <Fade in timeout={1000}>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                opacity: 0.95,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Find your perfect accommodation from our range of comfortable and
              affordable rooms
            </Typography>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, position: "relative", zIndex: 1 }}>
        <Paper
          elevation={16}
          sx={{
            top: 100,
            px: 5,
            py: 4,
            mb: 3,
            bgcolor: "#F6F4F4",
            boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    bgcolor: "#FAFAFA",
                    "&:hover fieldset": {
                      borderColor: "#7B2E2E",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7B2E2E",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#7B2E2E" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  options={options}
                  value={options.find((opt) => opt.value === sortBy) || null}
                  onChange={(_, value) => setSortBy(value?.value || "")}
                  getOptionLabel={(opt) => opt.label}
                  renderOption={(props, option) => {
                    // remove the `key` property before spreading
                    const { key, ...rest } = props;
                    return (
                      <Box
                        key={key}
                        component="li"
                        {...rest}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {option.icon}
                        <Typography variant="body2">{option.label}</Typography>
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sort By"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  sx={{
                    bgcolor: "#FAFAFA",
                    borderRadius: 2,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid
              size={{ xs: 12, md: 2 }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Badge
                badgeContent={activeFiltersCount}
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "#D4A373",
                    color: "white",
                    fontWeight: 600,
                  },
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FilterAlt />}
                  onClick={() => setFilterDrawerOpen(true)}
                  sx={{
                    bgcolor: "#7B2E2E",
                    color: "white",
                    border: "2px solid #7B2E2E",
                    borderRadius: 0.5,
                    py: "10px",
                    px: "15px",
                    width: 270,
                    fontWeight: 600,
                    boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: "white",
                      color: "#7B2E2E",
                    },
                  }}
                >
                  Filters
                </Button>
              </Badge>
            </Grid>
            <Grid
              size={{ xs: 12, md: 3 }}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                fullWidth
                sx={{
                  "& .MuiToggleButton-root": {
                    borderRadius: 2,
                    border: "1px solid #F1E9E9",
                    "&.Mui-selected": {
                      bgcolor: "#7B2E2E",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#5f2424",
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="grid">
                  <GridView />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Paper>

        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" style={{ color: "#7B2E2E", textDecoration: "none" }}>
            Home
          </Link>
          <Typography color="text.primary">Rooms</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid
            size={{ xs: 0, md: 3 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Paper
              elevation={16}
              sx={{
                position: "sticky",
                top: 100,
                py: 4,
                pb: 8,
                mb: 4,
                bgcolor: "#F6F4F4",
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                maxHeight: "calc(100% - 100px)",
              }}
            >
              <FilterSidebar />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#505A63", fontWeight: 600 }}
              >
                Showing {paginatedRooms.length} of {filteredRooms.length} rooms
              </Typography>
              <Chip
                icon={<LocationOn />}
                label="Lahore, Pakistan"
                sx={{
                  bgcolor: "#09869815",
                  color: "#098698",
                  border: "1px solid #098698",
                  fontWeight: 600,
                }}
              />
            </Box>

            {paginatedRooms.length > 0 ? (
              <Grid container spacing={3} sx={{ mb: 5 }}>
                {paginatedRooms.map((room) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: viewMode === "grid" ? 6 : 12,
                      lg: viewMode === "grid" ? 4 : 12,
                    }}
                    key={room.id}
                  >
                    <Card
                      sx={{
                        height: {
                          xs: 570,
                          sm: viewMode === "grid" ? 620 : "auto",
                        },
                        display: "flex",
                        // Stack on mobile; row only from sm+ when in list mode
                        flexDirection: {
                          xs: "column",
                          sm: viewMode === "grid" ? "column" : "row",
                        },
                        overflow: "hidden",
                        border: "1px solid #F1E9E9",
                        transition: "all 0.3s ease-in-out",
                        width: "100%",
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
                        alignItems: "stretch",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          // Do not let the image shrink in list row layout
                          flex: {
                            xs: "0 0 auto",
                            sm: viewMode === "grid" ? "0 0 auto" : "0 0 300px",
                            md: viewMode === "grid" ? "0 0 auto" : "0 0 320px",
                          },
                          minWidth: {
                            xs: "100%",
                            sm: viewMode === "grid" ? "auto" : 300,
                            md: viewMode === "grid" ? "auto" : 320,
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={room.image}
                          alt={room.title}
                          sx={{
                            display: "block",
                            width: "100%",
                            height: {
                              xs: 220, // taller on mobile so it doesn't feel cramped
                              sm: 240,
                              md: viewMode === "grid" ? 250 : 220,
                            },
                            objectFit: "cover",
                            borderBottom: {
                              xs: "1px solid rgba(0,0,0,0.08)",
                              sm: "none",
                            },
                            borderRight: {
                              xs: "none",
                              sm:
                                viewMode === "grid"
                                  ? "none"
                                  : "1px solid rgba(0,0,0,0.08)",
                            },
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                          }}
                        />
                        {room.featured && (
                          <Chip
                            icon={<Star />}
                            label="Featured"
                            size="small"
                            sx={{
                              position: "absolute",
                              top: { xs: 8, sm: 10 },
                              right: { xs: 8, sm: 10 },
                              bgcolor: "#D4A373",
                              color: "white",
                              fontWeight: 600,
                              boxShadow: "0 4px 15px rgba(212,163,115,0.5)",
                            }}
                          />
                        )}
                        {!room.available && (
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              bgcolor: "rgba(0,0,0,0.8)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "white",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 2,
                              }}
                            >
                              Not Available
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          p: { xs: 2, sm: 3 },
                          minWidth: 0, // prevents text overflow when in row layout
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#3D444B",
                            mb: 1,
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {room.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, lineHeight: 1.6 }}
                        >
                          {room.content}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
                        >
                          <Chip
                            icon={<People />}
                            label={`${room.capacity} Person${
                              room.capacity > 1 ? "s" : ""
                            }`}
                            size="small"
                            sx={{
                              bgcolor: "#7B2E2E15",
                              color: "#7B2E2E",
                              border: "1px solid #7B2E2E30",
                              fontWeight: 600,
                            }}
                          />
                          <Chip
                            label={room.size}
                            size="small"
                            sx={{
                              bgcolor: "#09869815",
                              color: "#098698",
                              border: "1px solid #09869830",
                              fontWeight: 600,
                            }}
                          />
                        </Stack>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 3,
                          }}
                        >
                          <Rating
                            value={room.rating}
                            readOnly
                            size="small"
                            sx={{
                              "& .MuiRating-iconFilled": {
                                color: "#D4A373",
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "#505A63", fontWeight: 600 }}
                          >
                            {room.rating} ({room.reviews} reviews)
                          </Typography>
                        </Box>

                        <Divider
                          sx={{
                            mt: "auto",
                            mb: "auto",
                            borderColor: "#F1E9E9",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: "auto",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              color: "#7B2E2E",
                              fontWeight: 800,
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            PKR {room.price.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {room.duration}{" "}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          disabled={!room.available}
                          endIcon={<CheckCircle />}
                          onClick={() => handleOpenModal(room)}
                          sx={{
                            bgcolor: "#7B2E2E",
                            color: "primary.contrastText",
                            borderRadius: 0.5,
                            py: "10px",
                            px: "15px",
                            width: 220,
                            fontWeight: 600,
                            boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: "primary.contrastText",
                              color: "#7B2E2E",
                            },
                            "&:disabled": {
                              bgcolor: "#ccc",
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
                  border: "1px solid #F1E9E9",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: "#3D444B",
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  No rooms found
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Try adjusting your filters or search criteria
                </Typography>
                <Button
                  variant="contained"
                  onClick={clearFilters}
                  sx={{
                    bgcolor: "#7B2E2E",
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    "&:hover": {
                      bgcolor: "#5f2424",
                    },
                  }}
                >
                  Clear Filters
                </Button>
              </Paper>
            )}

            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: 2,
                      fontWeight: 600,
                      "&.Mui-selected": {
                        bgcolor: "#7B2E2E",
                        boxShadow: "0 4px 15px rgba(123,46,46,0.3)",
                        "&:hover": {
                          bgcolor: "#5f2424",
                        },
                      },
                      "&:hover": {
                        bgcolor: "#7B2E2E15",
                      },
                    },
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Add the RoomDetailsModal component */}
      <RoomDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        room={selectedRoom}
      />

      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            backgroundColor: "#fff",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#7B2E2E",
              borderRadius: "2px",
            },
          },
        }}
      >
        <FilterSidebar />
      </Drawer>
    </Box>
  );
}
