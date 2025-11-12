import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import YouTube from "@mui/icons-material/YouTube";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import LocationOn from "@mui/icons-material/LocationOn";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../public/Images/Logo.jpg";
import FooterClient from "./FooterClient";
import { Link as RouterLink } from "@mui/material";
const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Amenities", href: "#amenities" },
  { label: "Rooms", href: "#rooms" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: <Facebook />,
    href: "https://facebook.com/profile.php?id=61582018123399",
  },
  {
    icon: <Instagram />,
    href: "https://instagram.com/rehmaprofessionalhostels",
  },
  { icon: <Twitter />, href: "#" },
  { icon: <YouTube />, href: "#" },
];

export default function FooterStatic() {
  const currentYear = new Date().getFullYear();

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

      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Image
                src={logoImage}
                alt="Rehma Hostels Logo"
                width={120}
                height={120}
                style={{ borderRadius: 8 }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{ opacity: 0.9, mb: 3, lineHeight: 1.8 }}
            >
              Rehma Hostels ensures comfort, security, and convenience with
              modern living spaces tailored for today’s professionals in Lahore.
            </Typography>

            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, i) => (
                <IconButton
                  key={i}
                  href={social.href}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.2)",
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
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                  }}
                >
                  <FiberManualRecord
                    style={{ fontSize: 8, marginRight: 8, opacity: 0.6 }}
                  />
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
              Contact Us
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" alignItems="flex-start" spacing={1.5}>
                <LocationOn sx={{ opacity: 0.8, fontSize: 20 }} />
                <Typography variant="body2">
                  Plot No. 25, Main Boulevard, DHA Phase 5, Lahore, Pakistan
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Phone sx={{ opacity: 0.8, fontSize: 20 }} />
                <Typography variant="body2">+92 305 5088887</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Email sx={{ opacity: 0.8, fontSize: 20 }} />
                <Typography variant="body2">info@rehmahostels.com</Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Placeholder for Client Section */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Subscribe to receive updates about our facilities and special
              offers.
            </Typography>
            <FooterClient />
            {/* This is where FooterClient will inject */}
          </Grid>
        </Grid>

        {/* Bottom Line */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
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
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © {currentYear} Rehma Hostels. All rights reserved.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Powered by Intelliage Solutions
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
          </Stack>{" "}
        </Box>
      </Container>
    </Box>
  );
}
