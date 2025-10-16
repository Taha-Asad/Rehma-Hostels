"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  CardContent,
  Chip,
  Grid,
  Avatar,
  Fade,
  Zoom,
  useTheme,
  alpha,
  Paper,
} from "@mui/material";
import {
  ExpandMore,
  Groups,
  Receipt,
  Security,
  LocationOn,
  Shield,
  Visibility,
  Restaurant,
  CalendarMonth,
  Description,
  PhoneAndroid,
  QuestionAnswer,
  Mail,
  Phone,
} from "@mui/icons-material";

const faqs = [
  {
    question: "Can I choose my roommate?",
    answer:
      "Yes! If you have a friend or colleague who also wants to stay at REHMA, you can request to share a twin room together. Simply let us know during the booking process, and we'll make the necessary arrangements to accommodate your preference.",
    icon: Groups,
    color: "#7B2E2E",
  },
  {
    question: "What is included in the monthly rent?",
    answer:
      "Your monthly rent includes accommodation, high-speed WiFi throughout the facility, 24/7 security services, electricity (fair usage), water supply, common area access including study lounges, and basic maintenance services. Meal plans and laundry services are available as optional add-ons.",
    icon: Receipt,
    color: "#6B4B3E", // replaced bluish tone
  },
  {
    question: "Is there a security deposit required?",
    answer:
      "Yes, we require a refundable security deposit of PKR 10,000 along with the first month's rent at the time of booking. This deposit is fully refundable when you check out, provided there is no damage to the room or property beyond normal wear and tear.",
    icon: Security,
    color: "#7B2E2E",
  },
  {
    question: "How close is REHMA to major universities in Lahore?",
    answer:
      "REHMA is strategically located with excellent connectivity to major universities including LUMS, UET, Punjab University, FCCU, and LSE. Most universities are within 15-30 minutes by public transport, ride-sharing services, or personal vehicle.",
    icon: LocationOn,
    color: "#6B4B3E",
  },
  {
    question: "What security measures are in place?",
    answer:
      "Security is our top priority. Our facility features 24/7 CCTV surveillance covering all common areas, biometric access control at entry points, security personnel on duty round the clock, separate sections for male and female residents with dedicated wardens, and comprehensive emergency protocols.",
    icon: Shield,
    color: "#7B2E2E",
  },
  {
    question: "Can I visit the facility before booking?",
    answer:
      "Absolutely! We encourage prospective residents and their families to visit our facility and take a tour. You can schedule a visit through our website, by phone, or simply walk in. Our tours are available daily from 9:00 AM to 7:00 PM.",
    icon: Visibility,
    color: "#6B4B3E",
  },
  {
    question: "What meal plan options are available?",
    answer:
      "We offer flexible meal plans to suit different preferences: full board (3 meals daily), half board (2 meals daily), or no meal plan if you prefer to manage your own meals. All our meals are prepared fresh with high-quality ingredients in our hygienic kitchen, offering both traditional Pakistani and continental options.",
    icon: Restaurant,
    color: "#7B2E2E",
  },
  {
    question: "Is there a minimum booking period?",
    answer:
      "Yes, we require a minimum booking period of 3 months. However, most students and professionals book for a semester (5-6 months) or a full academic year. We offer attractive discounts for longer-term bookings.",
    icon: CalendarMonth,
    color: "#6B4B3E",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "If you cancel your booking at least 30 days before your scheduled move-in date, you will receive a full refund minus a small processing fee. Cancellations made within 30 days of move-in may result in the forfeiture of one month's rent. Please refer to our detailed cancellation policy for complete terms and conditions.",
    icon: Description,
    color: "#7B2E2E",
  },
  {
    question: "How does the HSM digital management system work?",
    answer:
      "HSM (Hostel Smart Management) is our comprehensive digital platform that makes your stay seamless. Through the mobile app or web portal, you can pay rent online, submit and track maintenance requests, communicate directly with management, view your billing history, book common amenities, and stay updated with announcements. You'll receive your login credentials upon check-in.",
    icon: PhoneAndroid,
    color: "#6B4B3E",
  },
];

function FAQs() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      id="faqs"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(217,212,209,0.1) 50%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,46,46,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(107,75,62,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Fade in timeout={1000}>
            <Chip
              icon={<QuestionAnswer />}
              label="HAVE QUESTIONS?"
              sx={{
                mb: 3,
                px: 2,
                py: 3,
                height: "auto",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: 1,
                color: "#7B2E2E",
                bgcolor: alpha("#7B2E2E", 0.1),
                border: `1px solid ${alpha("#7B2E2E", 0.2)}`,
                "& .MuiChip-icon": {
                  color: "#7B2E2E",
                },
              }}
            />
          </Fade>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 800,
              fontFamily: "Poppins, sans-serif",
              color: "#3D444B",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Everything You Need
            <Box
              component="span"
              sx={{
                display: "block",
                background: "linear-gradient(135deg, #7B2E2E 0%, #6B4B3E 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              To Know
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#505A63",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            Find answers to common questions about living at REHMA.
          </Typography>
        </Box>

        {/* FAQ Accordions */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {faqs.map((faq, index) => {
            const IconComponent = faq.icon;
            const panelId = `panel${index}`;
            const isExpanded = expanded === panelId;

            return (
              <Grid size={{ xs: 12 }} key={index}>
                <Zoom in timeout={500 + index * 100}>
                  <Accordion
                    expanded={expanded === panelId}
                    onChange={handleChange(panelId)}
                    sx={{
                      borderRadius: "16px !important",
                      boxShadow: isExpanded
                        ? "0 20px 60px rgba(0,0,0,0.15)"
                        : "0 4px 20px rgba(0,0,0,0.08)",
                      border: "none",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      transform: isExpanded ? "scale(1.02)" : "scale(1)",
                      "&:before": { display: "none" },
                      "&:hover": {
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <Avatar
                          sx={{
                            bgcolor: isExpanded
                              ? faq.color
                              : alpha(faq.color, 0.1),
                            transition: "all 0.3s ease",
                            width: 36,
                            height: 36,
                          }}
                        >
                          <ExpandMore
                            sx={{
                              color: isExpanded ? "white" : faq.color,
                              transition: "all 0.3s ease",
                            }}
                          />
                        </Avatar>
                      }
                      sx={{
                        minHeight: 100,
                        px: 4,
                        py: 2,
                        background: isExpanded
                          ? `linear-gradient(135deg, ${alpha(
                              faq.color,
                              0.05
                            )} 0%, transparent 100%)`
                          : "white",
                        "& .MuiAccordionSummary-content": { my: 3 },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          width: "100%",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: alpha(faq.color, 0.1),
                            border: `2px solid ${alpha(faq.color, 0.2)}`,
                          }}
                        >
                          <IconComponent
                            sx={{ fontSize: 30, color: faq.color }}
                          />
                        </Avatar>

                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "#3D444B",
                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                            fontFamily: "Poppins, sans-serif",
                            flex: 1,
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        px: 4,
                        pb: 4,
                        pt: 0,
                      }}
                    >
                      <Box
                        sx={{
                          pl: { xs: 0, md: 11 },
                          borderLeft: {
                            xs: "none",
                            md: `3px solid ${alpha(faq.color, 0.2)}`,
                          },
                          ml: { xs: 0, md: 4 },
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#505A63",
                            lineHeight: 1.8,
                            fontSize: "1.05rem",
                          }}
                        >
                          {faq.answer}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>

        {/* CTA Section */}
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper
            elevation={16}
            sx={{
              py: 4,
              pb: 8,
              px: 2,
              bgcolor: "#7B2E2E",
              background: "linear-gradient(135deg, #7B2E2E 0%, #5F2424 100%)",
              boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 4, md: 4 },
                textAlign: "center",
                position: "relative",
              }}
            >
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
                <QuestionAnswer sx={{ fontSize: 40, color: "white" }} />
              </Avatar>

              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  mb: 2,
                }}
              >
                Still Have Questions?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: "600px",
                  mx: "auto",
                  mb: 5,
                }}
              >
                Our friendly team is available 24/7 to help you with any
                questions or concerns.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Mail />}
                  sx={{
                    bgcolor: "white",
                    color: "#7B2E2E",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                >
                  Send Us a Message
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Phone />}
                  href="tel:+923001234567"
                  sx={{
                    bgcolor: "#6B4B3E",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#5F3E32",
                    },
                  }}
                >
                  Call Us Now
                </Button>
              </Box>
            </CardContent>
          </Paper>
        </Container>
      </Container>
    </Box>
  );
}

export default FAQs;
