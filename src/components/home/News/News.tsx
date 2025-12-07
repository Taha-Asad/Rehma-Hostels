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
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Avatar,
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
  AccessTime,
  Person,
  OpenInNew,
  Circle,
} from "@mui/icons-material";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { ContentBlock, getPublishedBlogs } from "@/actions/blogs.action";
import { RenderContent } from "@/components/ui/RenderContent";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  chips: { label: string; position: string }[];
  fullContent: ContentBlock[];
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

const News = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const result = await getPublishedBlogs(3); // Fetch 3 latest blogs
        if (result.success && result.data) {
          setNewsArticles(result.data as NewsArticle[]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load news articles");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);

    try {
      const form = new FormData();
      form.append("email", email);

      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (result.success) {
        setEmail("");
        toast.success(result.message || "Newsletter Subscribed successfully");
      } else {
        setEmail("");
        toast.error(result.message || "Subscription failed. Try again later");
      }
    } catch (err) {
      toast.error(`Subscription failed. Try again later. ${err}`);
    } finally {
      setSubscribing(false);
    }
  };

  const chipStyle = {
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    fontWeight: 600,
    px: 1,
    py: 1,
    height: "auto",
    "& .MuiChip-icon": {
      fontSize: "18px",
      color: "white",
    },
  };

  const circleStyle = {
    fontSize: "10px",
    color: "rgba(255,255,255,0.7)",
  };

  const handleOpenModal = (article: NewsArticle) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedArticle(null);
  };

  useEffect(() => {
    const scrollContainer =
      (document.scrollingElement as HTMLElement) ||
      (document.documentElement as HTMLElement);
    let scrollY = 0;

    if (modalOpen) {
      scrollY = scrollContainer.scrollTop;
      scrollContainer.style.overflow = "hidden";
      scrollContainer.style.position = "fixed";
      scrollContainer.style.top = `-${scrollY}px`;
      scrollContainer.style.width = "100%";
    } else {
      const top = scrollContainer.style.top;
      scrollContainer.style.overflow = "";
      scrollContainer.style.position = "";
      scrollContainer.style.top = "";
      scrollContainer.style.width = "";
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: parseInt(top || "0") * -1,
          behavior: "instant",
        });
      });
    }
  }, [modalOpen]);

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

  // Convert chip data to include icons
  const getChipIcon = (position: string) => {
    return position === "top-right" ? <Star /> : <People />;
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
            <Box>
              {loading ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography>Loading news articles...</Typography>
                </Box>
              ) : newsArticles.length > 0 ? (
                <Grid container spacing={3}>
                  {newsArticles.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
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
                            component="div"
                            sx={{
                              width: "100%",
                              height: 250,
                              objectFit: "cover",
                              overflow: "hidden",
                            }}
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                              }}
                              loading="lazy"
                            />
                          </CardMedia>

                          {/* Chips on image */}
                          {item.chips?.map((chip, i) => (
                            <Chip
                              key={i}
                              icon={getChipIcon(chip.position)}
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
                                      border: "1px solid rgba(255,255,255,0.2)",
                                      "& .MuiChip-icon": {
                                        color: "#FFFFFF",
                                      },
                                    }
                                  : {
                                      background: "rgba(255,255,255,0.85)",
                                      color: "#7B2E2E",
                                      border: "1px solid rgba(123,46,46,0.2)",
                                      "& .MuiChip-icon": {
                                        color: "#7B2E2E",
                                      },
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
                            {item.content.length > 100
                              ? `${item.content.substring(0, 100)}...`
                              : item.content}
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
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" sx={{ color: "#505A63" }}>
                    No news articles available at the moment.
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "grid", placeItems: "center", py: 4 }}>
                <Button
                  component={Link}
                  href="/news"
                  variant="contained"
                  sx={{
                    bgcolor: "#D4A373",
                    color: "#FDF9F6",
                    borderRadius: 0.5,
                    width: 220,
                    py: "10px",
                    px: "15px",
                    fontWeight: 600,
                    border: "1px solid #D4A373",
                    boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.25)",
                    transition: "all 0.3s",
                    "&:hover": {
                      border: "1px solid #7B2E2E",
                      bgcolor: "primary.contrastText",
                      color: "#7B2E2E",
                      boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                    },
                  }}
                >
                  Show More
                </Button>
              </Box>
            </Box>

            {/* Article Modal */}
            <Dialog
              open={modalOpen}
              onClose={handleCloseModal}
              disableScrollLock
              maxWidth="lg"
              fullWidth
              slotProps={{
                paper: {
                  sx: {
                    overflow: { xs: "auto", md: "hidden" },
                    height: { xs: "auto", md: "85vh" },
                    maxHeight: { xs: "90vh", md: "85vh" },
                  },
                },
              }}
            >
              {selectedArticle && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    height: "100%",
                  }}
                >
                  {/* Modal Header with Image */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "50%" },
                      height: { xs: 320, md: "100%" },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      loading="lazy"
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      fill
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
                    {/* Close Button */}
                    <IconButton
                      onClick={handleCloseModal}
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(10px)",
                        zIndex: 9999,
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
                        top: { xs: 2, md: 0 },
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
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="flex-start"
                        sx={{
                          pb: 5,
                          flexWrap: "wrap",
                          gap: 2,
                        }}
                      >
                        <Grid>
                          <Chip
                            icon={<Person />}
                            label={selectedArticle.author}
                            sx={chipStyle}
                          />
                        </Grid>

                        <Circle sx={circleStyle} />

                        <Grid>
                          <Chip
                            icon={<CalendarMonth />}
                            label={selectedArticle.date}
                            sx={chipStyle}
                          />
                        </Grid>

                        <Circle sx={circleStyle} />

                        <Grid>
                          <Chip
                            icon={<AccessTime />}
                            label={selectedArticle.readTime}
                            sx={chipStyle}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: { xs: "100%", md: "50%" },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Modal Content */}
                    <DialogContent
                      sx={{
                        flex: 1,
                        p: { xs: 3, md: 4 },
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#7B2E2E",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#D4A373",
                          },
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "#F1E9E9",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      {/* Action Buttons */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 3,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 1,
                          }}
                        >
                          {selectedArticle.chips?.map((chip, i) => (
                            <Chip
                              key={i}
                              icon={getChipIcon(chip.position)}
                              label={chip.label}
                              size="small"
                              sx={{
                                bgcolor: "rgba(123,46,46,0.1)",
                                color: "#7B2E2E",
                                py: 2,
                                px: 2,
                                gap: 0.8,
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
                        </Stack>
                      </Box>

                      <Divider sx={{ mb: 3 }} />

                      {/* Render Content Blocks */}
                      <RenderContent content={selectedArticle.fullContent} />

                      <Divider sx={{ my: 4 }} />

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
                          size="large"
                          sx={{
                            bgcolor: "primary.contrastText",
                            color: "#7B2E2E",
                            borderRadius: 0.5,
                            width: 120,
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
                          Close
                        </Button>
                        <Link href={`/news/${selectedArticle.id}`} passHref>
                          <Button
                            variant="contained"
                            endIcon={<OpenInNew />}
                            sx={{
                              bgcolor: "#7B2E2E",
                              color: "white",
                              border: "2px solid #7B2E2E",
                              borderRadius: 0.5,
                              py: "10px",
                              px: "15px",
                              width: 200,
                              fontWeight: 600,
                              boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                              transition: "all 0.3s",
                              "&:hover": {
                                bgcolor: "white",
                                color: "#7B2E2E",
                              },
                            }}
                          >
                            View Full Article
                          </Button>
                        </Link>
                      </Box>
                    </DialogContent>
                  </Box>
                </Box>
              )}
            </Dialog>

            {/* Newsletter Subscription */}
            <Container maxWidth="sm" sx={{ py: 4 }}>
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
                    direction="column"
                    spacing={3}
                    alignItems="center"
                    position="relative"
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
                      <NotificationsActive
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
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#7B2E2E",
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      Latest News & Updates
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "#505A63",
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
                        color: "#098698",
                        textAlign: "center",
                      }}
                    >
                      Don&apos;t miss out on any important updates from REHMA.
                    </Typography>

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      component="form"
                      onSubmit={handleSubscribe}
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: 500,
                        px: 2,
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
                          bgcolor: "#7B2E2E",
                          color: "primary.contrastText",
                          borderRadius: 0.5,
                          py: "10px",
                          px: "15px",
                          width: { sm: 200, md: 200 },
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
                        {subscribing ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </Stack>
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
