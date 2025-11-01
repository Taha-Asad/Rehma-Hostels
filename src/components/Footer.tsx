"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link as RouterLink,
  Stack,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  WhatsApp as WhatsAppIcon,
  FiberManualRecord as DotIcon,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/Images/Logo.jpg";
import ShareIcon from "@mui/icons-material/Share";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Amenities", href: "#amenities" },
    { label: "Rooms", href: "#rooms" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: "#", label: "Facebook" },
    { icon: <Instagram />, href: "#", label: "Instagram" },
    { icon: <Twitter />, href: "#", label: "Twitter" },
    { icon: <YouTube />, href: "#", label: "YouTube" },
    { icon: <LinkedIn />, href: "#", label: "LinkedIn" },
  ];
  const actions = [
    {
      icon: <Facebook />,
      name: "Facebook",
      link: "https://facebook.com",
    },
    {
      icon: <Instagram />,
      name: "Instagram",
      link: "https://instagram.com",
    },
    {
      icon: <LinkedIn />,
      name: "LinkedIn",
      link: "https://linkedin.com",
    },
    {
      icon: <EmailIcon />,
      name: "Email",
      link: "mailto:example@example.com",
    },
    {
      icon: <WhatsAppIcon />,
      name: "WhatsApp",
      link: "https://wa.me/923001234567",
    },
  ];
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);

    const serviceID = "service_x6ueh7n";
    const templateID = "template_5wdb3l7";
    const publicKey = "NFRagpznVWX4p1nBF";

    try {
      // Extract name from email
      const getNameFromEmail = (email: string) => {
        const namePart = email.split("@")[0];
        return namePart.charAt(0).toUpperCase() + namePart.slice(1);
      };

      // Correct template parameters - EmailJS needs specific field names
      const templateParams = {
        to_email: email, // This might be the issue
        user_email: email, // Try this instead
        email: email, // Or this
        reply_to: email, // Sometimes needed
        name: getNameFromEmail(email),
        unsubscribe_link: "https://rehma-hostels-gtbz.vercel.app/unsubscribe",
        from_name: "REHMA Hostel",
        message: "Welcome to REHMA Hostel newsletter!",
      };

      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        toast.success("Welcome to REHMA! Check your inbox for confirmation.");
        setEmail("");
      } else {
        throw new Error("EmailJS returned non-200 status.");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Subscription failed. Please try again later.");
    } finally {
      setSubscribing(false);
    }
  };
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #7B2E2E 0%, #5f2424 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 10 }}>
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Image
                src={logoImage}
                alt="REHMA Professional Hostel & Apartments"
                width={120}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Rehma Hostels ensures comfort, security, and convenience with
              modern living spaces tailored for today’s professionals in Lahore.
            </Typography>

            {/* Social Links */}
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Quick Links
            </Typography>

            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <RouterLink
                  key={index}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      color: "white",
                    },
                    transition: "color 0.2s",
                  }}
                >
                  <DotIcon sx={{ fontSize: 8, mr: 1, opacity: 0.6 }} />
                  {link.label}
                </RouterLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Contact Us
            </Typography>

            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <LocationIcon
                  sx={{
                    fontSize: 20,
                    color: "rgba(255, 255, 255, 0.8)",
                    mt: 0.5,
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    Plot No. 25, Main Boulevard
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    DHA Phase 5, Lahore
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    Punjab, Pakistan
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon
                  sx={{ fontSize: 20, color: "rgba(255, 255, 255, 0.8)" }}
                />
                <Box>
                  <RouterLink
                    component={Link}
                    href="tel:+923001122334"
                    underline="hover"
                    sx={{
                      fontSize: "17px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    +92 300 123 4567
                  </RouterLink>
                  <RouterLink
                    component={Link}
                    href="https://wa.me/923001122334"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      fontSize: "17px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    +92 321 123 4567
                  </RouterLink>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailIcon
                  sx={{ fontSize: 20, color: "rgba(255, 255, 255, 0.8)" }}
                />
                <RouterLink
                  href="mailto:info@rehmahotel.com"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": { color: "white" },
                  }}
                >
                  info@rehmahotel.com
                </RouterLink>
              </Box>
            </Stack>
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Stay Updated
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 2,
              }}
            >
              Subscribe to receive updates about our facilities and special
              offers
            </Typography>

            <Stack spacing={2} component="form" onSubmit={handleSubscribe}>
              <TextField
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.4)",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255, 255, 255, 0.5)",
                    opacity: 1,
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
            </Stack>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            mt: 6,
            pt: 4,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              spacing={{ xs: 1, md: 3 }}
            >
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                © {currentYear} REHMA Professional Hostel & Apartments. All
                rights reserved.
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                divider={
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.4)" }}>
                    |
                  </Typography>
                }
              >
                <RouterLink
                  href="/legal/privacy-policy"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": { color: "white" },
                  }}
                >
                  Privacy Policy
                </RouterLink>
                <RouterLink
                  href="/legal/terms"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": { color: "white" },
                  }}
                >
                  Terms of Service
                </RouterLink>
                <RouterLink
                  href="/legal/refund-policy"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": { color: "white" },
                  }}
                >
                  Refund Policy
                </RouterLink>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Powered by Intelliage Solutions
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#098698",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </Container>

      <SpeedDial
        ariaLabel="Social Media Menu"
        direction="up"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          "& .MuiSpeedDial-fab": {
            bgcolor: "#5f2424",
            color: "white",
            width: 64,
            height: 64,
            boxShadow: "0 20px 40px rgba(123,46,46,0.3)",
            transition: "all 0.5s ease",
            "&:hover": {
              bgcolor: "#D4A373",
              transform: "scale(1.1)",
              boxShadow: "0 20px 40px rgba(212,163,115,0.5)",
            },
          },
        }}
        icon={<ShareIcon sx={{ fontSize: 32 }} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => window.open(action.link, "_blank")}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
export default Footer;
