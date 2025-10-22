"use client";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  IconButton,
  Paper,
  Drawer,
  Link as RouterLink,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../public/Images/Logo.jpg";
import {
  Close,
  Menu as MenuIcon,
  Visibility,
  VisibilityOff,
  Lock,
  Home,
  Phone,
  RateReview,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import TuneIcon from "@mui/icons-material/Tune";
import HotelIcon from "@mui/icons-material/Hotel";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { scrollToSection } from "@/utils/scrollToSection";
import { ScrollText } from "lucide-react";
const navlinks = [
  { icon: <Home />, title: "Home", url: "/#" },
  { icon: <AutoStoriesIcon />, title: "About Us", url: "/#about" },
  { icon: <TuneIcon />, title: "Amenities", url: "/#amenities" },
  { icon: <HotelIcon />, title: "Rooms", url: "/#rooms" },
  { icon: <RateReview />, title: "Reviews", url: "/#reviews" },
  { icon: <ScrollText />, title: "News", url: "/#news" },
  { icon: <Phone />, title: "Contact", url: "/#contact" },
];

function Navbar() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("resident");

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isActive = (url: string) => location.pathname === url;
  // Load saved user info
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedType = localStorage.getItem("userType");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedEmail) setFormData((prev) => ({ ...prev, email: savedEmail }));
    if (savedType) setUserType(savedType);
    if (savedRemember) setRememberMe(true);
  }, []);

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

  // Form validation
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Valid Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") setRememberMe(checked);
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!validateForm()) return;

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", formData.email);
        localStorage.setItem("userType", userType);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
        localStorage.removeItem("userType");
      }

      toast.success("Sign In Successful!");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Error Submitting Form");
    }
  };

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
        px: { xs: 2, md: 4 },
        zIndex: 1000,
        width: "100%",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link href={"/"}>
          {" "}
          <Image src={logo} alt="REHMA Hostel" width={150} />
        </Link>
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
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
                  onClick={() => handleScroll(item.url)}
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
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => scrollToSection("contact")}
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

          <Button
            sx={{
              bgcolor: "primary.contrastText",
              color: "#7B2E2E",
              borderRadius: 0.5,
              py: "10px",
              px: "15px",
              width: "130px",
              fontWeight: 600,
              border: "1px solid #7B2E2E",
              boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
              transition: "all 0.3s",
              "&:hover": { bgcolor: "#7B2E2E", color: "#fff" },
            }}
            onClick={() => setOpenModal(true)}
          >
            Sign In
          </Button>
        </Box>

        {/* Hamburger Menu */}
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ display: { xs: "flex", md: "none" }, color: "#3D444B" }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: false, // this locks the background
        }}
        PaperProps={{
          sx: {
            width: 300,
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            overflowY: "auto",
            overscrollBehavior: "contain", // critical: stops bounce scroll weirdness
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setMobileOpen(false)}>
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
            px: 5,
          }}
        >
          {navlinks.map((item, index) => (
            <Box
              key={index}
              sx={{
                color: "#3D444B", // base color (children inherit this)
                borderRadius: 1,
                transition: "background-color 0.2s ease, color 0.2s ease",
                "&:hover": {
                  bgcolor: "primary.contrastText",
                  color: "#7B2E2E", // hover color now applies
                },
              }}
            >
              <RouterLink
                component={Link}
                href={item.url}
                style={{
                  textDecoration: "none",
                  color: "inherit", // inherit color from parent for hover to work
                  fontSize: "1.2rem",
                  display: "block", // make whole row clickable
                  width: "100%",
                }}
                onClick={() => setMobileOpen(false)}
                // Extra accessibility + interaction polish
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
          }}
        >
          <Button
            onClick={() => scrollToSection("contact")}
            sx={{
              bgcolor: "#7B2E2E",
              color: "primary.contrastText",
              borderRadius: 0.5,
              py: "10px",
              px: "15px",
              width: "70%",
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

          <Button
            sx={{
              bgcolor: "primary.contrastText",
              color: "#7B2E2E",
              borderRadius: 0.5,
              py: "10px",
              px: "15px",
              width: "70%",
              fontWeight: 600,
              border: "1px solid #7B2E2E",
              boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
              transition: "all 0.3s",
              "&:hover": { bgcolor: "#7B2E2E", color: "#fff" },
            }}
            onClick={() => setOpenModal(true)}
          >
            Sign In
          </Button>
        </Box>
      </Drawer>

      {/* Sign In Modal */}
      <Dialog
        open={openModal}
        fullScreen={fullScreen}
        onClose={() => setOpenModal(false)}
        component={Paper}
        sx={{
          overflow: { xs: "auto", md: "hidden" },

          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: 500,
            p: 3,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "#3D444B" }}>
          Welcome to REHMA
        </DialogTitle>

        <DialogContent>
          <Typography textAlign="center" color="#505A63" mb={2}>
            Sign in to access your account
          </Typography>

          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: "#909090", mr: 1 }} />,
            }}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Lock sx={{ color: "#909090", mr: 1 }} />,
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#909090" }} />
                  ) : (
                    <Visibility sx={{ color: "#909090" }} />
                  )}
                </IconButton>
              ),
            }}
          />

          {/* User Type */}
          <FormControl fullWidth margin="normal">
            <FormLabel>User Type</FormLabel>
            <RadioGroup
              row
              value={userType}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setUserType(e.target.value)}
            >
              <FormControlLabel
                value="resident"
                control={<Radio />}
                label="resident"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </FormControl>

          {/* Remember Me */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleChange}
                name="rememberMe"
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            sx={{
              color: "primary.contrastText",
              bgcolor: "#7B2E2E",
              borderRadius: 0.5,
              mt: 2,
              py: "10px",
              px: "15px",
              fontWeight: 600,
              border: "1px solid #7B2E2E",
              boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
              transition: "all 0.3s",
              "&:hover": { bgcolor: "#fff", color: "#7B2E2E" },
            }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Navbar;
