"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import Stats from "../ui/Stats";
import { motion, Variants } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  phone: string;
  university: string;
  roomType: string;
  message: string;
};

const primary = "#7B2E2E";
const primaryDark = "#5f2424";

const roomOptions = [
  { value: "single", label: "Single Room (PKR 15,000)" },
  { value: "twin", label: "Twin Room (PKR 10,000/person)" },
  { value: "deluxe", label: "Deluxe Suite (PKR 20,000)" },
  { value: "unsure", label: "Not Sure - Need Assistance" },
];

// Variants for motion animations
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ["easeOut"] },
  },
};

const slideTop: Variants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ["easeOut"] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const slideBottom: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ["easeOut"] },
  },
};

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    university: "",
    roomType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleInputChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFormData({
      name: "",
      email: "",
      phone: "",
      university: "",
      roomType: "",
      message: "",
    });
    setIsSubmitting(false);
    setOpenSuccess(true);
  };

  const whyPoints = [
    "Premium rooms with modern amenities",
    "24/7 security with CCTV surveillance",
    "High-speed WiFi throughout facility",
    "Separate sections for boys and girls",
    "Professional management team",
    "Close proximity to major universities",
    "Nutritious meal plans available",
    "Smart HSM digital system",
    "Study lounges and common areas",
    "Clean, comfortable environment",
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundImage: "linear-gradient(to bottom, #D9D4D1, white, #D9D4D1)",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            py: 2,
          }}
        >
          <Chip
            label="GET IN TOUCH"
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
            }}
          >
            Book Your Room <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              With REHMA
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
            }}
          >
            Complete the form below and our professional team will get back to
            you within 24 hours to help you find your perfect accommodation
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Form slides from left */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
            >
              <Card
                sx={{
                  width: "100%",
                  transition: "all 0.3s ease",
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
                }}
              >
                {/* Form content remains exactly as before */}
                <Box
                  sx={{
                    background: `linear-gradient(90deg, ${primary}, ${primaryDark})`,
                    color: "#fff",
                    p: 3,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <SendIcon sx={{ mr: 1.5 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Booking Inquiry Form
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#fff", mt: 1 }}>
                    Fill out the form and we&apos;ll be in touch soon
                  </Typography>
                </Box>

                <CardContent sx={{ py: 3, px: 2, pt: 4 }}>
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      {/* Name */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Full Name "
                          fullWidth
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Enter your full name"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon sx={{ color: primary }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {/* Email */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Email Address "
                          type="email"
                          fullWidth
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your.email@example.com"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon sx={{ color: primary }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {/* Phone */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Phone Number "
                          type="tel"
                          fullWidth
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+92 300 1234567"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon sx={{ color: primary }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {/* University */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="University/College"
                          fullWidth
                          value={formData.university}
                          onChange={(e) =>
                            handleInputChange("university", e.target.value)
                          }
                          placeholder="e.g., UET, PU"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SchoolIcon sx={{ color: primary }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {/* Room Type */}
                      <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                          <InputLabel id="room-type-label">
                            Preferred Room Type
                          </InputLabel>
                          <Select
                            labelId="room-type-label"
                            value={formData.roomType}
                            label="Preferred Room Type"
                            onChange={(e) =>
                              handleInputChange(
                                "roomType",
                                e.target.value as string
                              )
                            }
                          >
                            <MenuItem value="">
                              <em>Select room type</em>
                            </MenuItem>
                            {roomOptions.map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* Message */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Additional Message"
                          fullWidth
                          multiline
                          minRows={4}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Any special requirements, questions, or preferences..."
                        />
                      </Grid>
                      {/* Submit */}
                    </Grid>
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        py: 5,
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        startIcon={!isSubmitting ? <SendIcon /> : undefined}
                        sx={{
                          bgcolor: "#7B2E2E",
                          color: "primary.contrastText",
                          borderRadius: 0.5,
                          py: "10px",
                          px: "15px",
                          width: 350,
                          fontWeight: 600,
                          boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                          transition: "all 0.3s",
                          "&:hover": {
                            bgcolor: "primary.contrastText",
                            color: "#7B2E2E",
                          },
                        }}
                      >
                        {isSubmitting ? (
                          <Box display="flex" alignItems="center" gap={1}>
                            <CircularProgress
                              size={20}
                              thickness={5}
                              sx={{ color: "#fff" }}
                            />
                            Sending...
                          </Box>
                        ) : (
                          "Send Inquiry"
                        )}
                      </Button>
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{ color: "#505A63", mt: 3 }}
                      >
                        {" "}
                        By submitting this form, you agree to our privacy policy
                        and terms of service.{" "}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right Column slides from top */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideTop}
            >
              <Paper
                elevation={16}
                sx={{
                  px: 2,
                  mb: 3,
                  boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                  background: `linear-gradient(135deg, ${primary}, ${primaryDark})`,
                  color: "#fff",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Why Students & Professionals Choose REHMA
                  </Typography>
                  <Box sx={{ display: "grid", rowGap: 1.5 }}>
                    {whyPoints.map((point, idx) => (
                      <Box
                        key={idx}
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <CheckCircleIcon
                          sx={{ color: "#D9D4D1" }}
                          fontSize="small"
                        />
                        <Typography sx={{ color: "rgba(255,255,255,0.95)" }}>
                          {point}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>

            {/* Stats cards with staggered animation */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                >
                  <Stats
                    value={500}
                    label={"Happy Residents"}
                    suffix={"+"}
                    height={130}
                  />
                </motion.div>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                >
                  <Stats
                    value={4.9}
                    label={"Average Rating"}
                    suffix={"★"}
                    height={130}
                  />
                </motion.div>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                >
                  <Stats
                    value={24}
                    label={"Support"}
                    suffixValue={7}
                    suffix={"/"}
                    height={130}
                  />
                </motion.div>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                >
                  <Stats
                    value={100}
                    label={"Satisfaction"}
                    suffix={"%"}
                    height={130}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Paper slides from bottom */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideBottom}
        >
          <Container maxWidth={"md"} sx={{ py: 4 }}>
            <Paper
              elevation={16}
              sx={{
                py: 4,
                pb: 8,
                px: 2,
                bgcolor: "#7B2E2E",
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <Stack direction={"column"} sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Special Promotion
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }} color="#D4A373">
                  Book for 6 months and get{" "}
                  <Box component="span" sx={{ fontWeight: 800 }}>
                    1 month FREE
                  </Box>
                  !
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Limited time offer. Contact us for details.
                </Typography>
              </Stack>
            </Paper>
          </Container>
        </motion.div>

        {/* Success Snackbar */}
        <Snackbar
          open={openSuccess}
          autoHideDuration={4000}
          onClose={() => setOpenSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thank you for your inquiry! Our team will contact you within 24
            hours.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Contact;
