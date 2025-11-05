"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  Stack,
  Paper,
  Autocomplete,
  Avatar,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Campaign,
} from "@mui/icons-material";
import Stats from "../ui/Stats";
import { motion, Variants } from "framer-motion";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

type FormData = {
  name: string;
  email: string;
  phone: string;
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

// Motion variants
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
const slideBottom: Variants = {
  hidden: { opacity: 0, y: 100 },
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

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.roomType.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all the required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    const serviceID = "service_34u9stk";
    const contactTemplateID = "template_7p6a2rc"; // admin template
    const autoReplyTemplateID = "template_7qzrzo8"; // user template
    const publicKey = "FaULhAOl8BVQ0LNDL";

    try {
      const response = await emailjs.sendForm(
        serviceID,
        contactTemplateID,
        formRef.current,
        publicKey
      );

      // only send auto-reply if first email succeeded
      if (response.status === 200) {
        await emailjs.sendForm(
          serviceID,
          autoReplyTemplateID,
          formRef.current,
          publicKey
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          roomType: "",
          message: "",
        });

        setOpenSuccess(true);
        toast.success(
          "Booking request submitted! Our team will review and confirm shortly."
        );
      } else {
        throw new Error("EmailJS returned non-200 status.");
      }
    } catch (error) {
      toast.error(`Error EmailJs ${error}`);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyPoints = [
    "Premium rooms with modern amenities",
    "24/7 security with CCTV surveillance",
    "High-speed WiFi throughout facility",
    "Separate sections for boys and girls",
    "Professional management team",
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
          <Typography variant="h2" sx={{ color: "#3D444B", py: 2 }}>
            Book Your Room <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              With REHMA
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: "#505A63", width: "60%" }}>
            Complete the form below and our professional team will get back to
            you within 24 hours to help you find your perfect accommodation.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Left form */}
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
                  boxShadow: "0 8px 20px rgba(123,46,46,0.25)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                  },
                  bgcolor: "#FFFFFF",
                  borderRadius: 1,
                }}
              >
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
                  <Box component="form" ref={formRef} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Full Name"
                          name="name"
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
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Email Address "
                          name="email"
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
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Phone Number"
                          type="tel"
                          name="phone"
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
                      <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                          <Autocomplete
                            options={roomOptions}
                            getOptionLabel={(option) => option.label}
                            value={
                              roomOptions.find(
                                (opt) => opt.label === formData.roomType
                              ) || null
                            }
                            onChange={(_, newValue) =>
                              handleInputChange(
                                "roomType",
                                newValue ? newValue.label : ""
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Preferred Room Type"
                                placeholder="Select or search a room type"
                                variant="outlined"
                                name="roomType"
                                fullWidth
                              />
                            )}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(123, 46, 46, 0.3)",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#7B2E2E",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#7B2E2E",
                                },
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Additional Message"
                          name="message"
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
                    </Grid>
                    <Box sx={{ display: "grid", placeItems: "center", py: 5 }}>
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
                          width: { xs: 250, md: 350 },
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
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ color: "#505A63", mt: 3 }}
                  >
                    {" "}
                    By submitting this form, you agree to our privacy policy and
                    terms of service.{" "}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right column */}
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
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Why Professionals Choose REHMA
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideBottom}
        >
          <Container maxWidth={"sm"} sx={{ py: 4 }}>
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
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "rgba(255,255,255,0.1)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Campaign
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
                </Avatar>
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

        <Snackbar
          open={openSuccess}
          autoHideDuration={4000}
          onClose={() => setOpenSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Thank you for your inquiry! Our team will contact you within 24
            hours.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Contact;
