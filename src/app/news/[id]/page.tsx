import {
  Container,
  Box,
  Typography,
  Chip,
  Divider,
  Button,
  IconButton,
  Breadcrumbs,
  Paper,
  Stack,
  Avatar,
  Grid,
} from "@mui/material";
import {
  CalendarMonth,
  AccessTime,
  ArrowBack,
  Person,
  Email,
  WhatsApp,
  Twitter,
  Facebook,
} from "@mui/icons-material";
import Link from "next/link";
import { notFound } from "next/navigation";

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
}

// Mock function - replace with actual API call
async function getArticle(id: string): Promise<NewsArticle | null> {
  const articles: NewsArticle[] = [
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
    },
  ];

  const article = articles.find((a) => a.id.toString() === id);
  return article || null;
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = params as { id: string };
  const article = await getArticle(id);
  if (!article) {
    notFound();
  }

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", pt: 10 }}>
      {/* Hero Section with Gradient Overlay */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 350, md: 500 },
          background: `linear-gradient(180deg, rgba(123,46,46,0.8) 0%, rgba(0,0,0,0.9) 100%), url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { md: "fixed" },
        }}
      >
        {/* Back Button */}
        <IconButton
          component={Link}
          href="/news"
          sx={{
            position: "absolute",
            top: 100,
            left: { xs: 20, md: 40 },
            bgcolor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: "white",
              transform: "scale(1.1)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Content Overlay */}
        <Container
          maxWidth="lg"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            pb: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ color: "white", maxWidth: "800px" }}>
            <Chip
              label={article.category}
              sx={{
                bgcolor: "#D4A373",
                color: "white",
                mb: 2,
                fontWeight: 600,
                px: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "2rem", md: "3rem" },
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              {article.title}
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ flexWrap: "wrap", gap: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Person />
                </Avatar>
                <Typography variant="body1">{article.author}</Typography>
              </Box>
              <Typography variant="body1">•</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarMonth sx={{ fontSize: 20 }} />
                <Typography variant="body1">{article.date}</Typography>
              </Box>
              <Typography variant="body1">•</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTime sx={{ fontSize: 20 }} />
                <Typography variant="body1">{article.readTime}</Typography>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ mt: 8, mb: 5, position: "relative", zIndex: 1 }}
      >
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: { xs: 3, sm: 4, md: 6 },
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                bgcolor: "white",
              }}
            >
              {/* Breadcrumbs */}
              <Breadcrumbs sx={{ mb: 4 }}>
                <Link
                  href="/"
                  style={{ color: "#7B2E2E", textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  href="/news"
                  style={{ color: "#7B2E2E", textDecoration: "none" }}
                >
                  News
                </Link>
                <Typography color="text.primary">Article</Typography>
              </Breadcrumbs>

              {/* Article Content */}
              <Box
                dangerouslySetInnerHTML={{ __html: article.fullContent }}
                sx={{
                  "& h3": {
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    color: "#3D444B",
                    mt: 5,
                    mb: 3,
                    fontSize: "1.75rem",
                    position: "relative",
                    paddingLeft: 3,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 4,
                      height: "100%",
                      bgcolor: "#7B2E2E",
                      borderRadius: 2,
                    },
                  },
                  "& p": {
                    color: "#505A63",
                    lineHeight: 1.9,
                    mb: 3,
                    fontSize: "1.125rem",
                  },
                  "& ul": {
                    color: "#505A63",
                    pl: 4,
                    mb: 3,
                    "& li": {
                      mb: 2,
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                      position: "relative",
                      "&::marker": {
                        color: "#7B2E2E",
                      },
                    },
                  },
                  "& strong": {
                    color: "#3D444B",
                    fontWeight: 600,
                  },
                }}
              />

              <Divider sx={{ my: 5 }} />

              {/* Share Section */}
              <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#3D444B", fontWeight: 600 }}
                >
                  Share this article
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <IconButton
                    sx={{
                      bgcolor: "#7B2E2E",
                      color: "white",
                      "&:hover": { bgcolor: "#5f2424" },
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#1DA1F2",
                      color: "white",
                      "&:hover": { bgcolor: "#1a8cd8" },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#25D366",
                      color: "white",
                      "&:hover": { bgcolor: "#20bd5a" },
                    }}
                  >
                    <WhatsApp />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#505A63",
                      color: "white",
                      "&:hover": { bgcolor: "#3d444b" },
                    }}
                  >
                    <Email />
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Author Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                mb: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                bgcolor: "white",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#3D444B",
                }}
              >
                About the Author
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#7B2E2E",
                  }}
                >
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {article.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Content Writer
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Passionate about creating engaging content for REHMA Hostel
                community.
              </Typography>
            </Paper>

            {/* CTA Card */}
            <Paper
              elevation={0}
              sx={{
                background: "linear-gradient(135deg, #7B2E2E 0%, #5f2424 100%)",
                borderRadius: 3,
                p: 4,
                boxShadow: "0 20px 40px rgba(123,46,46,0.3)",
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Ready to Join REHMA?
              </Typography>
              <Typography sx={{ mb: 3, opacity: 0.9 }}>
                Experience premium student accommodation with modern facilities
              </Typography>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "white",
                    color: "#7B2E2E",
                    fontWeight: 600,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Book a Tour
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 600,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
