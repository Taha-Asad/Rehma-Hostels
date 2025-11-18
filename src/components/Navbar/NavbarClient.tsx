"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { Link as RouterLink } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../../public/Images/Logo.jpg";

import Close from "@mui/icons-material/Close";
import Menu from "@mui/icons-material/Menu";
import Phone from "@mui/icons-material/Phone";
import Home from "@mui/icons-material/Home";
import RateReview from "@mui/icons-material/RateReview";
import TuneIcon from "@mui/icons-material/Tune";
import HotelIcon from "@mui/icons-material/Hotel";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { ScrollText } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const navlinks = [
  { icon: <Home />, title: "Home", url: "/#home" },
  { icon: <AutoStoriesIcon />, title: "About Us", url: "/#about" },
  { icon: <TuneIcon />, title: "Amenities", url: "/#amenities" },
  { icon: <HotelIcon />, title: "Rooms", url: "/#rooms" },
  { icon: <RateReview />, title: "Reviews", url: "/#reviews" },
  { icon: <ScrollText />, title: "News", url: "/#news" },
  { icon: <Phone />, title: "Contact", url: "/#contact" },
];

function NavbarClient() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (url: string) => {
    const hash = window.location.hash;
    return hash === url.replace("/", "");
  };
  const router = useRouter();
  const pathname = usePathname();

  // Check for hash on page load and scroll to section
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#", "");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const top =
              element.getBoundingClientRect().top + window.scrollY - 50;
            window.scrollTo({
              top,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible near top
      if (currentScrollY < 100) {
        setVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // If scrolling down → hide
      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        // If scrolling up → show
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
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
  }, [mobileOpen]);

  const handleNavClick = (url: string) => {
    if (pathname === "/") {
      // If already on home page, just scroll
      const sectionId = url.replace("/#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    } else {
      // Navigate to home with hash
      router.push(url);
    }
  };

  const handleBookNow = () => {
    if (pathname === "/") {
      // If on home page, scroll directly
      const element = document.getElementById("contact");
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    } else {
      // Navigate to home with contact hash
      router.push("/#contact");
    }
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: visible ? 0 : "-170px",
        transition: "top 0.4s ease-in-out, background-color 0.3s ease",
        backgroundColor: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        boxShadow: visible ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
        display: "flex",
        bgcolor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, md: 2, lg: 4 },
        zIndex: 1000,
        width: "100%",
        height: 150, // Fixed height to prevent layout shift
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Link href={"/"}>
          {" "}
          <Image src={logo} alt="REHMA Hostel" width={150} loading="lazy" />
        </Link>
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
          {navlinks.map((item) => {
            const active = isActive(item.url);
            return (
              <Box
                key={item.url}
                sx={{
                  color: "#3D444B",
                  borderRadius: 1,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    bgcolor: "primary.contrastText",
                    color: "#7B2E2E",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <RouterLink
                  component={Link}
                  href={item.url}
                  underline="none"
                  color="inherit"
                  sx={{
                    position: "relative",
                    display: "block",
                    width: "100%",
                    fontSize: "1.2rem",
                    px: 1,
                    py: 1,
                    borderRadius: "inherit",
                    transition: "transform 0.1s ease",
                    "&:focus-visible": {
                      outline: "2px solid #7B2E2E",
                      outlineOffset: 2,
                      bgcolor: "primary.contrastText",
                    },
                    "&:active": {
                      transform: "translateY(1px)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -6,
                      left: "15%",
                      width: active ? "70%" : "0%",
                      height: "2px",
                      backgroundColor: "#7B2E2E",
                      borderRadius: "2px",
                      transition: "width 0.25s ease",
                    },
                    "&:hover::after": { width: "70%" },
                  }}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.url);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography component="span" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                  </Box>
                </RouterLink>
              </Box>
            );
          })}
        </Box>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleBookNow}
            sx={{
              bgcolor: "#7B2E2E",
              color: "primary.contrastText",
              borderRadius: 0.5,
              py: "10px",
              px: "15px",
              width: "130px",
              fontWeight: 600,
              boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
              transition: "all 0.3s",
              "&:hover": {
                bgcolor: "primary.contrastText",
                color: "#7B2E2E",
              },
            }}
          >
            Book Now
          </Button>
        </Box>

        {/* Hamburger Menu */}
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ display: { xs: "flex", lg: "none" }, color: "#3D444B" }}
        >
          <Menu fontSize="large" />
        </IconButton>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
            borderBottom: "1px solid #F1E9E9",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <Close />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            px: 3,
            py: 2,
          }}
        >
          {navlinks.map((item, index) => (
            <Box
              key={index}
              sx={{
                color: "#3D444B",
                borderRadius: 1,
                transition: "background-color 0.2s ease, color 0.2s ease",
                "&:hover": {
                  bgcolor: "primary.contrastText",
                  color: "#7B2E2E",
                },
              }}
            >
              <RouterLink
                component={Link}
                href={item.url}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "1.2rem",
                  display: "block",
                  width: "100%",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleDrawerClose();
                  handleNavClick(item.url);
                }}
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: "inherit",
                  transition: "transform 0.1s ease",
                  "&:focus-visible": {
                    outline: "2px solid #7B2E2E",
                    outlineOffset: 2,
                    bgcolor: "primary.contrastText",
                  },
                  "&:active": {
                    transform: "translateY(1px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Typography component="span">{item.icon}</Typography>
                  <Typography component="span">{item.title}</Typography>
                </Box>
              </RouterLink>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            p: 3,
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #F1E9E9",
          }}
        >
          <Button
            onClick={() => {
              handleDrawerClose();
              handleBookNow();
            }}
            sx={{
              bgcolor: "#7B2E2E",
              color: "primary.contrastText",
              borderRadius: 0.5,
              py: "10px",
              px: "15px",
              width: "100%",
              fontWeight: 600,
              boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
              transition: "all 0.3s",
              "&:hover": {
                bgcolor: "primary.contrastText",
                color: "#7B2E2E",
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default NavbarClient;
