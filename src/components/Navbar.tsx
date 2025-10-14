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
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../public/Images/logo.png";
import {
  Close,
  Menu as MenuIcon,
  Visibility,
  VisibilityOff,
  Lock,
  Home,
  Phone,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import TuneIcon from "@mui/icons-material/Tune";
import HotelIcon from "@mui/icons-material/Hotel";
import RateReviewIcon from "@mui/icons-material/RateReview";
const navlinks = [
  { icon: <Home />, title: "Home", url: "/" },
  { icon: <TuneIcon />, title: "Amenities", url: "/#amenities" },
  { icon: <HotelIcon />, title: "Rooms", url: "/#rooms" },
  { icon: <RateReviewIcon />, title: "Reviews", url: "/#reviews" },
  { icon: <Phone />, title: "Contact", url: "/#contact" },
];

function Navbar() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("student");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Load saved user info
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedType = localStorage.getItem("userType");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedEmail) setFormData((prev) => ({ ...prev, email: savedEmail }));
    if (savedType) setUserType(savedType);
    if (savedRemember) setRememberMe(true);
  }, []);

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
      toast.error("Error Submiting Form");
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        bgcolor: "#FBFBFB",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: { xs: 2, md: 4 },
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
          <Image src={logo} alt="REHMA Hostel" width={120} />
        </Link>
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {navlinks.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              style={{
                textDecoration: "none",
                color: "#3D444B",
                fontWeight: 500,
              }}
            >
              {item.title}
            </Link>
          ))}
        </Box>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
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
              "&:hover": { bgcolor: "primary.contrastText", color: "#7B2E2E" },
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
        PaperProps={{
          sx: {
            width: 300,
            position: "fixed",
            top: 0,
            right: 0,
            bgcolor: "#fff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            borderLeft: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            zIndex: 1400,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: 3,
            pl: 5,
            pr: 10,
          }}
        >
          {navlinks.map((item, index) => (
            <Box
              key={index}
              sx={{
                "&:hover": {
                  bgcolor: "primary.contrastText",
                  color: "#7B2E2E",
                },
              }}
            >
              <Link
                href={item.url}
                style={{
                  textDecoration: "none",
                  color: "#3D444B",
                  fontSize: "1.2rem",
                }}
                onClick={() => setMobileOpen(false)}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Typography>{item.icon}</Typography>
                  <Typography>{item.title}</Typography>
                </Box>
              </Link>
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
            pt: 2,
          }}
        >
          <Button
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
              onChange={(e) => setUserType(e.target.value)}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
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
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#7B2E2E",
              color: "#fff",
              mt: 3,
              py: 1,
              fontWeight: 600,
              "&:hover": { bgcolor: "#5e2020" },
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
