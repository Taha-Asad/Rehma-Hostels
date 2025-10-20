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
  Stack,
  Typography,
  TextField,
  Skeleton,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Avatar,
  Zoom,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  People,
  Star,
  CalendarMonth,
  ArrowForward,
  NotificationsActive,
  Close,
  Share,
  BookmarkBorder,
  AccessTime,
  Person,
  OpenInNew,
} from "@mui/icons-material";
import Link from "next/link";

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
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Enhanced mock data with full content
const initialCards: NewsArticle[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Campus Renovation Completed",
    content:
      "The hostel underwent major renovations, offering students a modern and comfortable living environment.",
    fullContent: `
      <p>We are thrilled to announce that the comprehensive renovation of our campus facilities has been successfully completed. This major upgrade represents our commitment to providing students with a world-class living and learning environment.</p>
      
      <h3>Key Improvements Include:</h3>
      <ul>
        <li><strong>Modernized Living Spaces:</strong> All rooms have been renovated with new furniture, improved lighting, and enhanced storage solutions.</li>
        <li><strong>Upgraded Study Areas:</strong> State-of-the-art study lounges with ergonomic seating and dedicated quiet zones.</li>
        <li><strong>Enhanced Common Areas:</strong> Redesigned recreational spaces with modern amenities and comfortable seating arrangements.</li>
        <li><strong>Improved Infrastructure:</strong> Updated electrical systems, high-speed internet connectivity, and better ventilation throughout the facility.</li>
      </ul>
      
      <p>The renovation project, which began in January 2025, was completed ahead of schedule and within budget. We worked closely with student representatives to ensure that the improvements aligned with the needs and preferences of our residents.</p>
      
      <h3>Student Feedback</h3>
      <p>"The new facilities are amazing! The study areas are now perfect for both individual study and group projects," says Sarah Ahmed, a third-year engineering student.</p>
      
      <p>We invite all current and prospective students to visit and experience the transformed campus. Tours are available daily from 9 AM to 6 PM.</p>
    `,
    date: "Oct 15, 2025",
    author: "Admin Team",
    readTime: "5 min read",
    category: "Announcements",
    chips: [
      { icon: <People />, label: "All Students", position: "bottom-left" },
    ],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "New Study Lounges Opened",
    content:
      "Dedicated quiet study areas now available for better focus and productivity.",
    fullContent: `
      <p>In response to student feedback, we are excited to unveil our brand new study lounges designed to enhance academic performance and provide the perfect environment for focused learning.</p>
      
      <h3>Features of the New Study Lounges:</h3>
      <ul>
        <li><strong>24/7 Access:</strong> Round-the-clock availability for students with different study schedules.</li>
        <li><strong>Sound-Proof Zones:</strong> Specially designed quiet areas for maximum concentration.</li>
        <li><strong>Group Study Rooms:</strong> Bookable spaces for collaborative projects and discussions.</li>
        <li><strong>High-Speed WiFi:</strong> Dedicated bandwidth for seamless research and online learning.</li>
        <li><strong>Charging Stations:</strong> Ample power outlets and USB charging ports at every desk.</li>
      </ul>
      
      <h3>Booking System</h3>
      <p>Students can now book study rooms through our HSM app. Simply log in, select your preferred time slot, and reserve your space. Walk-in spaces are also available on a first-come, first-served basis.</p>
      
      <p>The lounges are equipped with ergonomic furniture, adjustable lighting, and climate control to ensure maximum comfort during long study sessions.</p>
    `,
    date: "Sep 28, 2025",
    author: "Facility Management",
    readTime: "4 min read",
    category: "Facilities",
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
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Nutrition Plans Launched",
    content:
      "Healthy and tasty meal plans tailored for students are now offered at the hostel.",
    fullContent: `
      <p>We are delighted to introduce our new comprehensive nutrition plans, carefully designed by certified nutritionists to meet the dietary needs and preferences of our diverse student community.</p>
      
      <h3>Available Meal Plans:</h3>
      <ul>
        <li><strong>Basic Plan:</strong> 3 meals daily with balanced nutrition - PKR 8,000/month</li>
        <li><strong>Premium Plan:</strong> 3 meals + 2 snacks with variety menu - PKR 12,000/month</li>
        <li><strong>Fitness Plan:</strong> High-protein meals for fitness enthusiasts - PKR 15,000/month</li>
        <li><strong>Vegetarian/Vegan Options:</strong> Specially curated plant-based meals available in all plans</li>
      </ul>
      
      <h3>Our Commitment to Quality:</h3>
      <p>All meals are prepared fresh daily using locally sourced, organic ingredients where possible. We ensure no artificial preservatives or colors are used, and all meat products are halal-certified.</p>
    `,
    date: "Aug 12, 2025",
    author: "Nutrition Team",
    readTime: "6 min read",
    category: "Services",
    chips: [
      { icon: <People />, label: "All Residents", position: "bottom-left" },
    ],
  },
];

const News = () => {
  const [cards, setCards] = useState<NewsArticle[]>(initialCards);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    setLoading(true);
    try {
      // mock fetch delay
      setTimeout(() => {
        setCards(initialCards);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setEmail("");
    }, 1500);
  };

  const handleOpenModal = (article: NewsArticle) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const handleShare = async () => {
    if (navigator.share && selectedArticle) {
      try {
        await navigator.share({
          title: selectedArticle.title,
          text: selectedArticle.content,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background:
          "linear-gradient(180deg, #D9D4D1 0%, #FFFFFF 50%, #D9D4D1 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            py: 2,
            pb: 3,
          }}
        >
          <Chip
            label="NEWS & UPDATES"
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
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Stay Informed with <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              The Latest Campus News
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
              maxWidth: 600,
            }}
          >
            Explore the newest announcements, facility updates, and important
            notifications from our hostel management team.
          </Typography>
        </Box>

        <Box>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={3}>
              {loading
                ? [...Array(3)].map((_, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <Card sx={{ height: 450 }}>
                        <Skeleton variant="rectangular" height={250} />
                        <CardContent>
                          <Skeleton variant="text" height={40} />
                          <Skeleton variant="text" height={60} />
                          <Skeleton variant="text" width={100} />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                : cards.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                      <motion.div variants={cardVariants}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            backgroundColor: "#FFFFFF",
                            boxShadow:
                              index === 1
                                ? "0 20px 40px rgba(123,46,46,0.25)"
                                : "0 8px 20px rgba(123,46,46,0.15)",
                            transform:
                              index === 1 ? "translateY(-8px)" : "none",
                            borderRadius: 2,
                            overflow: "hidden",
                            "&:hover": {
                              transform: "translateY(-8px) scale(1.02)",
                              boxShadow: "0 25px 50px rgba(123,46,46,0.3)",
                            },
                          }}
                        >
                          <Box sx={{ position: "relative" }}>
                            <CardMedia
                              component="img"
                              src={item.image}
                              alt={item.title}
                              sx={{
                                width: "100%",
                                height: 250,
                                objectFit: "cover",
                              }}
                            />

                            {/* Chips on image */}
                            {item.chips.map((chip, i) => (
                              <Chip
                                key={i}
                                icon={chip.icon}
                                label={chip.label}
                                sx={{
                                  position: "absolute",
                                  ...(chip.position === "top-right" && {
                                    top: 16,
                                    right: 16,
                                  }),
                                  ...(chip.position === "bottom-left" && {
                                    bottom: 16,
                                    left: 16,
                                  }),
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: "20px",
                                  fontWeight: 600,
                                  fontSize: "0.875rem",
                                  backdropFilter: "blur(10px)",
                                  transition: "all 0.3s ease",
                                  ...(chip.position === "top-right"
                                    ? {
                                        background: "rgba(123,46,46,0.85)",
                                        color: "#FFFFFF",
                                        border:
                                          "1px solid rgba(255,255,255,0.2)",
                                        "& .MuiChip-icon": { color: "#FFFFFF" },
                                      }
                                    : {
                                        background: "rgba(255,255,255,0.85)",
                                        color: "#7B2E2E",
                                        border: "1px solid rgba(123,46,46,0.2)",
                                        "& .MuiChip-icon": { color: "#7B2E2E" },
                                      }),
                                  "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
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
                              p: 3,
                            }}
                          >
                            {/* Date */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2,
                                color: "#7B2E2E",
                              }}
                            >
                              <CalendarMonth sx={{ fontSize: 18 }} />
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "0.875rem",
                                }}
                              >
                                {item.date}
                              </Typography>
                            </Box>

                            {/* Title */}
                            <Typography
                              variant="h5"
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 700,
                                color: "#3D444B",
                                mb: 2,
                                lineHeight: 1.3,
                              }}
                            >
                              {item.title}
                            </Typography>

                            {/* Content */}
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#505A63",
                                lineHeight: 1.7,
                                mb: 3,
                                flex: 1,
                              }}
                            >
                              {item.content}
                            </Typography>

                            {/* Read More - Modal Trigger */}
                            <Box
                              onClick={() => handleOpenModal(item)}
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1,
                                color: "#7B2E2E",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                mt: "auto",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  color: "#D4A373",
                                  gap: 1.5,
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
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
            </Grid>

            {/* Article Modal */}
            <Dialog
              open={modalOpen}
              onClose={handleCloseModal}
              maxWidth="md"
              fullWidth
              TransitionComponent={Zoom}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  overflow: "hidden",
                  maxHeight: "90vh",
                },
              }}
            >
              {selectedArticle && (
                <>
                  {/* Modal Header with Image */}
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        height: { xs: 250, sm: 350 },
                        position: "relative",
                        background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%), url(${selectedArticle.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Close Button */}
                      <IconButton
                        onClick={handleCloseModal}
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                          "&:hover": {
                            bgcolor: "white",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <Close />
                      </IconButton>

                      {/* Title Overlay */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: { xs: 3, sm: 4 },
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                        }}
                      >
                        {/* Category Badge */}
                        <Chip
                          label={selectedArticle.category}
                          size="small"
                          sx={{
                            bgcolor: "#7B2E2E",
                            color: "white",
                            mb: 2,
                            fontWeight: 600,
                          }}
                        />

                        <Typography
                          variant="h4"
                          sx={{
                            color: "white",
                            fontWeight: 700,
                            fontFamily: "Poppins, sans-serif",
                            mb: 2,
                            fontSize: { xs: "1.75rem", sm: "2.25rem" },
                          }}
                        >
                          {selectedArticle.title}
                        </Typography>

                        {/* Meta Info */}
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{ flexWrap: "wrap", gap: 2 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "rgba(255,255,255,0.2)",
                                width: 32,
                                height: 32,
                                backdropFilter: "blur(10px)",
                              }}
                            >
                              <Person sx={{ fontSize: 18, color: "white" }} />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ color: "rgba(255,255,255,0.9)" }}
                            >
                              {selectedArticle.author}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.7)" }}
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
                            <CalendarMonth
                              sx={{
                                fontSize: 16,
                                color: "rgba(255,255,255,0.9)",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "rgba(255,255,255,0.9)" }}
                            >
                              {selectedArticle.date}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.7)" }}
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
                            <AccessTime
                              sx={{
                                fontSize: 16,
                                color: "rgba(255,255,255,0.9)",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "rgba(255,255,255,0.9)" }}
                            >
                              {selectedArticle.readTime}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>

                  {/* Modal Content */}
                  <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {selectedArticle.chips.map((chip, i) => (
                          <Chip
                            key={i}
                            icon={chip.icon}
                            label={chip.label}
                            size="small"
                            sx={{
                              bgcolor: "rgba(123,46,46,0.1)",
                              color: "#7B2E2E",
                              "& .MuiChip-icon": {
                                color: "#7B2E2E",
                              },
                            }}
                          />
                        ))}
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={handleShare}
                          sx={{
                            border: "1px solid rgba(123,46,46,0.2)",
                            "&:hover": {
                              bgcolor: "rgba(123,46,46,0.05)",
                            },
                          }}
                        >
                          <Share sx={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton
                          sx={{
                            border: "1px solid rgba(123,46,46,0.2)",
                            "&:hover": {
                              bgcolor: "rgba(123,46,46,0.05)",
                            },
                          }}
                        >
                          <BookmarkBorder sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Stack>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Article Content */}
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: selectedArticle.fullContent,
                      }}
                      sx={{
                        "& h3": {
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          color: "#3D444B",
                          mt: 4,
                          mb: 2,
                          fontSize: "1.4rem",
                        },
                        "& p": {
                          color: "#505A63",
                          lineHeight: 1.8,
                          mb: 2.5,
                          fontSize: "1.05rem",
                        },
                        "& ul": {
                          color: "#505A63",
                          pl: 3,
                          mb: 3,
                          "& li": {
                            mb: 1.5,
                            lineHeight: 1.7,
                            fontSize: "1.05rem",
                          },
                        },
                        "& strong": {
                          color: "#3D444B",
                          fontWeight: 600,
                        },
                      }}
                    />

                    <Divider sx={{ my: 4 }} />

                    {/* Footer Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        justifyContent: "space-between",
                        alignItems: { xs: "stretch", sm: "center" },
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={handleCloseModal}
                        sx={{
                          borderColor: "#7B2E2E",
                          color: "#7B2E2E",
                          "&:hover": {
                            borderColor: "#5f2424",
                            bgcolor: "rgba(123,46,46,0.05)",
                          },
                        }}
                      >
                        Close
                      </Button>
                      <Button
                        variant="contained"
                        component={Link}
                        href={`/news/${selectedArticle.id}`}
                        endIcon={<OpenInNew />}
                        sx={{
                          bgcolor: "#7B2E2E",
                          "&:hover": {
                            bgcolor: "#5f2424",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(123,46,46,0.3)",
                          },
                        }}
                      >
                        View Full Article
                      </Button>
                    </Box>
                  </DialogContent>
                </>
              )}
            </Dialog>

            <Container maxWidth="md" sx={{ mt: 8 }}>
              <motion.div variants={cardVariants}>
                <Paper
                  elevation={16}
                  sx={{
                    background:
                      "linear-gradient(135deg, #7B2E2E 0%, #5f2424 100%)",
                    py: 2,
                    pb: 4,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(123,46,46,0.3)",
                  }}
                >
                  <Stack
                    direction="column"
                    spacing={3}
                    alignItems="center"
                    position="relative"
                  >
                    <NotificationsActive
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

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      Latest News & Updates
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "#D4A373",
                        textAlign: "center",
                        maxWidth: 500,
                      }}
                    >
                      Stay informed with our latest announcements, offers, and
                      blog posts.
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        textAlign: "center",
                      }}
                    >
                      Don&apos;t miss out on any important updates from REHMA.
                    </Typography>

                    <Box
                      component="form"
                      onSubmit={handleSubscribe}
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: 500,
                      }}
                    >
                      <TextField
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        size="small"
                        sx={{
                          flex: 1,
                          bgcolor: "white",
                          borderRadius: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                            "&:hover fieldset": {
                              borderColor: "#D4A373",
                            },
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        disabled={subscribing}
                        sx={{
                          bgcolor: "#D4A373",
                          color: "white",
                          borderRadius: 1,
                          px: 4,
                          py: 1.2,
                          fontWeight: 600,
                          boxShadow: "0 4px 15px rgba(212,163,115,0.3)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            bgcolor: "#c89660",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(212,163,115,0.4)",
                          },
                          "&:active": {
                            transform: "translateY(0)",
                          },
                          "&:disabled": {
                            opacity: 0.7,
                          },
                        }}
                      >
                        {subscribing ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </Box>

                    {/* Show More Button (navigates to /news) */}
                    <Button
                      variant="outlined"
                      startIcon={<ArrowForward />}
                      component={Link}
                      href="/news"
                      sx={{
                        borderColor: "rgba(255,255,255,0.3)",
                        color: "white",
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        mt: 2,
                        fontWeight: 600,
                        fontSize: "1rem",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          borderColor: "#D4A373",
                          bgcolor: "rgba(212,163,115,0.1)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 20px rgba(212,163,115,0.3)",
                        },
                      }}
                    >
                      Show More News
                    </Button>
                  </Stack>
                </Paper>
              </motion.div>
            </Container>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default News;
