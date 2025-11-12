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
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  FormControl,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
  Link as RouterLink,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowForward,
  ViewList,
  People,
  Star,
  Visibility,
  GridView,
  TrendingUp,
  LocationOn,
  Circle,
  Timer,
} from "@mui/icons-material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  CalendarDays,
  CaseUpper,
  Cpu,
  Globe,
  Megaphone,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import newsHero from "../../../public/Images/newsHero.png";
// Types
interface NewsChip {
  icon: React.ReactElement;
  label: string;
  position: "top-right" | "bottom-left";
}

interface NewsArticle {
  id: number;
  image: string;
  title: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  chips: NewsChip[];
  views?: number;
  featured?: boolean;
}

// Mock data - Replace with API call
const allNewsArticles: NewsArticle[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Campus Renovation Completed",
    content:
      "The hostel underwent major renovations, offering professionals a modern and comfortable living environment.",
    date: "Oct 15, 2025",
    author: "Admin Team",
    readTime: "5 min read",
    category: "Announcements",
    views: 1250,
    featured: true,
    chips: [
      { icon: <People />, label: "All Residents", position: "bottom-left" },
    ],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1565372918193-0f90551ec8ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "New Study Lounges Opened",
    content:
      "Dedicated quiet study areas now available for better focus and productivity.",
    date: "Sep 28, 2025",
    author: "Facility Management",
    readTime: "4 min read",
    category: "Facilities",
    views: 890,
    featured: true,
    chips: [
      {
        icon: <People />,
        label: "Staff & Professionals",
        position: "bottom-left",
      },
      { icon: <Star />, label: "Featured", position: "top-right" },
    ],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1d2abf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Nutrition Plans Launched",
    content:
      "Healthy and tasty meal plans tailored for residents are now offered at the hostel.",
    date: "Aug 12, 2025",
    author: "Nutrition Team",
    readTime: "6 min read",
    category: "Services",
    views: 650,
    chips: [
      { icon: <People />, label: "All Residents", position: "bottom-left" },
    ],
  },
  // Add more mock articles for pagination demo
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Sports Tournament Announcement",
    content: "Annual inter-hostel sports tournament scheduled for next month.",
    date: "Jul 20, 2025",
    author: "Sports Committee",
    readTime: "3 min read",
    category: "Events",
    views: 450,
    chips: [
      { icon: <People />, label: "All Residents", position: "bottom-left" },
    ],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "WiFi Upgrade Complete",
    content: "High-speed internet now available in all rooms and common areas.",
    date: "Jun 15, 2025",
    author: "IT Department",
    readTime: "2 min read",
    category: "Technology",
    views: 780,
    chips: [
      { icon: <People />, label: "All Residents", position: "bottom-left" },
    ],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "New Gym Equipment Installed",
    content: "State-of-the-art fitness equipment added to the hostel gym.",
    date: "May 10, 2025",
    author: "Admin Team",
    readTime: "4 min read",
    category: "Facilities",
    views: 520,
    chips: [
      {
        icon: <People />,
        label: "Fitness Enthusiasts",
        position: "bottom-left",
      },
    ],
  },
];

const categories = [
  { name: "All", icon: Globe },
  { name: "Announcements", icon: Megaphone },
  { name: "Facilities", icon: Building2 },
  { name: "Services", icon: Wrench },
  { name: "Events", icon: CalendarDays },
  { name: "Technology", icon: Cpu },
];

const sortMenu = [
  { name: "Latest", icon: Timer },
  { name: "Featured", icon: Star },
  { name: "Most Viewed", icon: TrendingUp },
  { name: "Alphabetical", icon: CaseUpper },
];

export default function NewsPage() {
  // State management
  const [filteredArticles, setFilteredArticles] =
    useState<NewsArticle[]>(allNewsArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Search params
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("Latest");
  };
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...allNewsArticles];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case "Latest":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Most Viewed":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "Featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "Alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // Latest
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    setFilteredArticles(filtered);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box
      sx={{
        bgcolor: "#FAFAFA",
        minHeight: "100vh",
        pt: 18,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: "75vh", md: "100vh" },
          mb: { xs: 10, sm: 2 },
          overflow: "hidden",
        }}
      >
        {/* Background Image with Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            loading="lazy"
            src={newsHero}
            alt="REHMA Hostel"
            fill
            style={{
              objectFit: "cover",
            }}
          />
          {/* Sophisticated overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(61,68,75,0.95), rgba(61,68,75,0.85), rgba(61,68,75,0.75))",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent, transparent, rgba(123,46,46,0.3))",
            }}
          />
        </Box>

        {/* Subtle pattern overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.05,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, pt: { xs: 1.5, sm: 5 } }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
              fontWeight: 700,
              color: "white",
              mb: 3,
              lineHeight: 1.1,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Blogs & Guides{" "}
            <Box
              component="span"
              sx={{
                display: "block",
                color: "#D9D4D1",
                mt: 1,
              }}
            >
              Apartments for Rent in Lahore{" "}
            </Box>
          </Typography>

          {/* Subtext */}
          <Typography
            variant="h5"
            sx={{
              color: "grey.200",
              mb: 5,
              lineHeight: 1.6,
              maxWidth: { lg: "42rem" },
              mx: { xs: "auto", lg: 0 },
            }}
          >
            Explore expert insights, local guides, and the latest updates on
            apartments for rent in Lahore. Stay informed with tips, trends, and
            advice to help you find the perfect place to call home.
          </Typography>
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
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                placeholder="Search article..."
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
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  options={categories.map((cat) => ({
                    label: cat.name,
                    icon: cat.icon,
                    value: cat.name,
                  }))}
                  value={
                    categories
                      .map((cat) => ({
                        label: cat.name,
                        icon: cat.icon,
                        value: cat.name,
                      }))
                      .find((opt) => opt.value === selectedCategory) || null
                  }
                  onChange={(_, value) =>
                    setSelectedCategory(value?.value || "")
                  }
                  getOptionLabel={(opt) => opt.label}
                  renderOption={(props, option) => {
                    const { key, ...rest } = props;
                    const IconComponent = option.icon;
                    return (
                      <Box
                        key={key}
                        component="li"
                        {...rest}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconComponent
                          style={{ fontSize: 18, color: "#D4A373" }}
                        />
                        <Typography variant="body2">{option.label}</Typography>
                      </Box>
                    );
                  }}
                  renderInput={(params) => {
                    const IconComponent = categories.find(
                      (cat) => cat.name === selectedCategory
                    )?.icon;

                    return (
                      <TextField
                        {...params}
                        placeholder="Category"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: IconComponent ? (
                            <InputAdornment position="start">
                              <IconComponent
                                style={{ fontSize: 20, color: "#D4A373" }}
                              />
                            </InputAdornment>
                          ) : null,
                        }}
                      />
                    );
                  }}
                  sx={{
                    bgcolor: "#FAFAFA",
                    borderRadius: 1,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  options={sortMenu.map((sort) => ({
                    label: sort.name,
                    icon: sort.icon,
                    value: sort.name,
                  }))}
                  value={
                    sortMenu
                      .map((sort) => ({
                        label: sort.name,
                        icon: sort.icon,
                        value: sort.name,
                      }))
                      .find((opt) => opt.value === sortBy) || null
                  }
                  onChange={(_, value) => setSortBy(value?.value || "")}
                  getOptionLabel={(opt) => opt.label}
                  renderOption={(props, option) => {
                    const { key, ...rest } = props;
                    const IconComponent = option.icon;
                    return (
                      <Box
                        key={key}
                        component="li"
                        {...rest}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconComponent
                          style={{ fontSize: 18, color: "#D4A373" }}
                        />
                        <Typography variant="body2">{option.label}</Typography>
                      </Box>
                    );
                  }}
                  renderInput={(params) => {
                    const IconComponent = sortMenu.find(
                      (sort) => sort.name === sortBy
                    )?.icon;
                    return (
                      <TextField
                        {...params}
                        placeholder="Sort by"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: IconComponent ? (
                            <InputAdornment position="start">
                              <IconComponent
                                style={{ fontSize: 20, color: "#D4A373" }}
                              />
                            </InputAdornment>
                          ) : null,
                        }}
                      />
                    );
                  }}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "#FAFAFA",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid
              size={{ xs: 12, md: 3 }}
              sx={{
                display: { xs: "none", sm: "block" },
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={clearFilters}
            sx={{
              bgcolor: "#7B2E2E",
              borderRadius: 2,
              px: 4,
              py: 1.2,
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(123,46,46,0.3)",
              "&:hover": {
                bgcolor: "#5f2424",
              },
            }}
          >
            Clear Filters
          </Button>
        </Box>

        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" style={{ color: "#7B2E2E", textDecoration: "none" }}>
            Home
          </Link>
          <Typography color="text.primary">Articles</Typography>
        </Breadcrumbs>

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
              Showing {paginatedArticles.length} of {filteredArticles.length}{" "}
              articles
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

          {paginatedArticles.length > 0 ? (
            <Grid container spacing={3} sx={{ mb: 5 }}>
              {paginatedArticles.map((news) => (
                <Grid
                  size={{
                    xs: 12,
                    sm: viewMode === "grid" ? 6 : 12,
                    lg: viewMode === "grid" ? 4 : 12,
                  }}
                  key={news.id}
                >
                  <Card
                    sx={{
                      height: {
                        xs: 515,
                        sm: viewMode === "grid" ? 600 : "auto",
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
                      ;
                      <CardMedia
                        component="div"
                        sx={{
                          display: "block",
                          width: "100%",
                          height: {
                            xs: 220,
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
                          overflow: "hidden", // needed for hover scale
                          transition: "transform 0.3s ease",
                          "&:hover img": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill // fills the CardMedia completely
                          style={{
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </CardMedia>
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                        }}
                      />
                      {news.featured && (
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
                      {news.chips.map((item, index) => (
                        <Chip
                          key={index}
                          label={item.label}
                          icon={item.icon}
                          sx={{
                            position: "absolute",
                            ...(item.position === "bottom-left" && {
                              bottom: { xs: 8, sm: "10%" },
                              left: { xs: 8, sm: 10 },
                            }),
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            px: { xs: 1.25, sm: 2.5 },
                            py: { xs: 0.6, sm: 1.2 },
                            borderRadius: "10px",
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: { xs: "0.75rem", sm: "0.9rem" },
                            border: "1px solid rgba(255,255,255,0.3)",
                            backdropFilter: "blur(8px)",
                            transition: "all 0.4s ease-in-out",
                            "&:hover": {
                              transform: "translateY(-6px)",
                              boxShadow: "0 10px 25px rgba(255,255,255,0.6)",
                              background: "rgba(255,255,255,0.85)",
                            },
                          }}
                        />
                      ))}
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
                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Chip
                          label={news.category}
                          variant="outlined"
                          sx={{
                            bgcolor: "#F1E9E9",
                            "& .MuiChip-label": {
                              color: "#7B2E2E",
                              fontWeight: 600,
                            },
                          }}
                        />
                        <Typography sx={{ fontSize: "14px", color: "#505A63" }}>
                          {news.date}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#505A63" }}>
                          <Box
                            component={"span"}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Visibility sx={{ fontSize: "16px" }} />
                            {news.views} views
                          </Box>
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#3D444B",
                          mb: 1,
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {news.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, lineHeight: 1.6, flex: 1 }}
                      >
                        {news.content}
                      </Typography>

                      <Divider sx={{ mb: 2, borderColor: "#F1E9E9" }} />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "auto",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#A0A0A0",
                            fontSize: "0.75rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            opacity: 0.8,
                          }}
                        >
                          {news.author}
                          <Circle
                            sx={{
                              fontSize: "3px",
                              color: "#A0A0A0",
                              opacity: 0.8,
                            }}
                          />
                          {news.readTime}
                        </Typography>

                        <RouterLink
                          component={Link}
                          href={`/news/${news.id}/`}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            color: "#7B2E2E",
                            textDecoration: "none",
                            fontWeight: 600,
                            fontSize: "1rem",
                            mt: "auto",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: "#D4A373",
                              gap: 1.5,
                              textDecoration: "underline",
                              "& .arrow-icon": {
                                transform: "translateX(4px)",
                              },
                            },
                          }}
                        >
                          Read More
                          <ArrowForward
                            className="arrow-icon"
                            sx={{
                              fontSize: 18,
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </RouterLink>
                      </Box>
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
                background: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
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
                No Articles found
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
      </Container>
    </Box>
  );
}
