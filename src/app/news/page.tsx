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
  IconButton,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Alert,
  Snackbar,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowForward,
  Add,
  Edit,
  Delete,
  MoreVert,
  ViewModule,
  ViewList,
  Close,
  AdminPanelSettings,
  People,
  Star,
  Visibility,
  Share,
} from "@mui/icons-material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  fullContent: string;
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
      "The hostel underwent major renovations, offering students a modern and comfortable living environment.",
    fullContent: "...",
    date: "Oct 15, 2025",
    author: "Admin Team",
    readTime: "5 min read",
    category: "Announcements",
    views: 1250,
    featured: true,
    chips: [
      { icon: <People />, label: "All Students", position: "bottom-left" },
    ],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1565372918193-0f90551ec8ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "New Study Lounges Opened",
    content:
      "Dedicated quiet study areas now available for better focus and productivity.",
    fullContent: "...",
    date: "Sep 28, 2025",
    author: "Facility Management",
    readTime: "4 min read",
    category: "Facilities",
    views: 890,
    featured: true,
    chips: [
      {
        icon: <People />,
        label: "Students & Professionals",
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
      "Healthy and tasty meal plans tailored for students are now offered at the hostel.",
    fullContent: "...",
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
    fullContent: "...",
    date: "Jul 20, 2025",
    author: "Sports Committee",
    readTime: "3 min read",
    category: "Events",
    views: 450,
    chips: [
      { icon: <People />, label: "All Students", position: "bottom-left" },
    ],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "WiFi Upgrade Complete",
    content: "High-speed internet now available in all rooms and common areas.",
    fullContent: "...",
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
    fullContent: "...",
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
  "All",
  "Announcements",
  "Facilities",
  "Services",
  "Events",
  "Technology",
];
const sortOptions = ["Latest", "Most Viewed", "Featured", "Alphabetical"];

export default function NewsPage() {
  // State management
  const [articles, setArticles] = useState<NewsArticle[]>(allNewsArticles);
  const [filteredArticles, setFilteredArticles] =
    useState<NewsArticle[]>(allNewsArticles);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Admin state - Replace with actual auth check
  const [isAdmin, setIsAdmin] = useState(true); // Mock admin status
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(
    null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );

  // Search params
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...articles];

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
  }, [articles, searchTerm, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Admin functions
  const handleDeleteClick = (article: NewsArticle) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      // Add API call here to delete from backend
      setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
      setSnackbarMessage("Article deleted successfully");
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    article: NewsArticle
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedArticle(article);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedArticle(null);
  };

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", pt: 12 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #7B2E2E 0%, #5f2424 100%)",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Search Bar */}
            <Box
              sx={{
                maxWidth: 600,
                mx: "auto",
              }}
            >
              <TextField
                fullWidth
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "#D4A373",
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
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 1 }}>
        {/* Filters and Controls */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
          >
            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort Options */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* View Mode Toggle */}
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newMode) => newMode && setViewMode(newMode)}
              size="small"
            >
              <ToggleButton value="grid">
                <ViewModule />
              </ToggleButton>
              <ToggleButton value="list">
                <ViewList />
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Results Count */}
            <Typography variant="body2" color="text.secondary">
              Showing {paginatedArticles.length} of {filteredArticles.length}{" "}
              articles
            </Typography>
          </Stack>
        </Paper>

        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" style={{ color: "#7B2E2E", textDecoration: "none" }}>
            Home
          </Link>
          <Typography color="text.primary">News</Typography>
          {selectedCategory !== "All" && (
            <Typography color="text.primary">{selectedCategory}</Typography>
          )}
        </Breadcrumbs>

        {/* News Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <Grid container spacing={3}>
                {[...Array(6)].map((_, index) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: viewMode === "grid" ? 4 : 12 }}
                    key={index}
                  >
                    <Card>
                      <Skeleton variant="rectangular" height={250} />
                      <CardContent>
                        <Skeleton variant="text" height={40} />
                        <Skeleton variant="text" height={60} />
                        <Skeleton variant="text" width={100} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : paginatedArticles.length > 0 ? (
              <Grid container spacing={3}>
                {paginatedArticles.map((article, index) => (
                  <Grid
                    size={{
                      xs: 12,
                      sm: viewMode === "grid" ? 6 : 12,
                      md: viewMode === "grid" ? 4 : 12,
                    }}
                    key={article.id}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          height: viewMode === "grid" ? 450 : "auto",
                          display: "flex",
                          flexDirection: viewMode === "grid" ? "column" : "row",
                          position: "relative",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 20px 40px rgba(123,46,46,0.15)",
                          },
                        }}
                      >
                        {/* Admin Actions */}
                        {isAdmin && (
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, article)}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "rgba(255,255,255,0.9)",
                              zIndex: 1,
                              "&:hover": {
                                bgcolor: "white",
                              },
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        )}

                        {/* Image */}
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            image={article.image}
                            alt={article.title}
                            sx={{
                              width: viewMode === "grid" ? "100%" : 280,
                              height: viewMode === "grid" ? 250 : 200,
                              objectFit: "cover",
                            }}
                          />
                          {/* Chips */}
                          {article.chips.map((chip, i) => (
                            <Chip
                              key={i}
                              icon={chip.icon}
                              label={chip.label}
                              size="small"
                              sx={{
                                position: "absolute",
                                ...(chip.position === "top-right" && {
                                  top: 16,
                                  right: isAdmin ? 56 : 16,
                                  bgcolor: "rgba(123,46,46,0.9)",
                                  color: "white",
                                }),
                                ...(chip.position === "bottom-left" && {
                                  bottom: 16,
                                  left: 16,
                                  bgcolor: "rgba(255,255,255,0.9)",
                                  color: "#7B2E2E",
                                }),
                              }}
                            />
                          ))}
                        </Box>

                        {/* Content */}
                        <CardContent
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {/* Meta Info */}
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ mb: 2 }}
                          >
                            <Chip
                              label={article.category}
                              size="small"
                              sx={{
                                bgcolor: "rgba(123,46,46,0.1)",
                                color: "#7B2E2E",
                                fontWeight: 600,
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {article.date}
                            </Typography>
                            {article.views && (
                              <>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  •
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <Visibility
                                    sx={{
                                      fontSize: 14,
                                      color: "text.secondary",
                                    }}
                                  />
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {article.views}
                                  </Typography>
                                </Box>
                              </>
                            )}
                          </Stack>

                          {/* Title */}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "#3D444B",
                              mb: 1,
                              fontFamily: "Poppins, sans-serif",
                              fontSize:
                                viewMode === "list" ? "1.5rem" : "1.25rem",
                            }}
                          >
                            {article.title}
                          </Typography>

                          {/* Content */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              flex: 1,
                              lineHeight: 1.7,
                              display: "-webkit-box",
                              WebkitLineClamp: viewMode === "list" ? 3 : 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {article.content}
                          </Typography>

                          {/* Footer */}
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              By {article.author} • {article.readTime}
                            </Typography>
                            <Button
                              component={Link}
                              href={`/news/${article.id}`}
                              endIcon={<ArrowForward />}
                              sx={{
                                color: "#7B2E2E",
                                "&:hover": {
                                  color: "#D4A373",
                                  bgcolor: "transparent",
                                },
                              }}
                            >
                              Read More
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper sx={{ p: 8, textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, color: "#3D444B" }}>
                  No articles found
                </Typography>
                <Typography color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
              </Paper>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 8 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  "&.Mui-selected": {
                    bgcolor: "#7B2E2E",
                    "&:hover": {
                      bgcolor: "#5f2424",
                    },
                  },
                },
              }}
            />
          </Box>
        )}
      </Container>

      {/* Admin FAB */}
      {isAdmin && (
        <SpeedDial
          ariaLabel="Admin actions"
          sx={{ position: "fixed", bottom: 32, right: 32 }}
          icon={
            <SpeedDialIcon openIcon={<Close />} icon={<AdminPanelSettings />} />
          }
        >
          <SpeedDialAction
            icon={<Add />}
            tooltipTitle="Add Article"
            onClick={() => {
              // Navigate to add article page or open modal
              window.location.href = "/admin/news/add";
            }}
          />
          <SpeedDialAction
            icon={<Edit />}
            tooltipTitle="Manage Articles"
            onClick={() => {
              window.location.href = "/admin/news";
            }}
          />
        </SpeedDial>
      )}

      {/* Admin Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          component={Link}
          href={`/admin/news/edit/${selectedArticle?.id}`}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => selectedArticle && handleDeleteClick(selectedArticle)}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} href={`/news/${selectedArticle?.id}`}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Share fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete `${articleToDelete?.title}`? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
