/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Grid,
  Avatar,
  alpha,
  Paper,
  Divider,
} from "@mui/material";
import {
  ExpandMore,
  QuestionAnswer,
  Mail,
  Phone,
  Wifi,
  DinnerDining,
  Engineering,
  Bed,
  Man,
  Woman,
  Weekend,
  Diversity3,
} from "@mui/icons-material";
import { motion, useReducedMotion } from "framer-motion";
import { Cctv } from "lucide-react";
import { scrollToSection } from "@/utils/scrollToSection";

// --------------------------------------------
// 1️⃣ Move Static Data and Variants Outside Render
// --------------------------------------------
const faqs = [
  {
    question: "What types of rooms for rent in Lahore do you offer?",
    answer:
      "We offer fully furnished rooms for rent in Lahore, including private and shared options. Our accommodations are ideal for working professionals looking for comfort, convenience, and a peaceful stay.",
    icon: Bed,
    color: "#7B2E2E",
  },
  {
    question: "Do you have separate hostels for girls and boys in Lahore?",
    answer:
      "Yes, Rehma Hostels provides both girls' hostels and boys’ hostels in Lahore. Each facility ensures secure access, privacy, and a safe, peaceful living environment.",
    icon: () => (
      <Box display="flex">
        <Man sx={{ color: "#6B4B3E", fontSize: "20px" }} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "#6B4B3E", height: 24 }}
        />
        <Woman sx={{ color: "#6B4B3E", fontSize: "20px" }} />
      </Box>
    ),
    color: "#6B4B3E",
  },
  {
    question: "Are your hostels in Lahore furnished?",
    answer:
      "Absolutely! All our hostels and apartments in Lahore feature fully furnished rooms with beds, wardrobes, and essential amenities to make you feel at home from day one.",
    icon: Weekend,
    color: "#7B2E2E",
  },
  {
    question: "Is high-speed internet available for residents?",
    answer:
      "Yes, every resident enjoys reliable high-speed internet perfect for remote work, online studies, and everyday browsing without interruptions.",
    icon: Wifi,
    color: "#6B4B3E",
  },
  {
    question: "How secure are your hostels and apartments in Lahore?",
    answer:
      "Your safety is our top priority. We maintain 24/7 CCTV monitoring and controlled entry to provide a secure, worry-free living experience.",
    icon: () => <Cctv color="#7B2E2E" />,
    color: "#7B2E2E",
  },
  {
    question: "Do you provide a meal service for daily meals?",
    answer:
      "Yes, we offer a convenient mess service with fresh, home-style meals prepared daily, ideal for anyone who prefers hassle-free dining at the hostel.",
    icon: DinnerDining,
    color: "#6B4B3E",
  },
  {
    question: "Are there free maintenance services available?",
    answer:
      "Yes, we provide free maintenance and cleaning services, including regular room and bathroom cleaning, to keep your space fresh and comfortable.",
    icon: Engineering,
    color: "#7B2E2E",
  },
  {
    question: "Is there space for social interaction and community living?",
    answer:
      "Definitely! We promote community living through friendly common areas where residents can relax, connect, and build lasting friendships.",
    icon: Diversity3,
    color: "#6B4B3E",
  },
];

// --------------------------------------------
// 2️⃣ Framer Motion Variants (Outside Render)
// --------------------------------------------
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// --------------------------------------------
// 3️⃣ Styles Outside Render to Avoid Recalc
// --------------------------------------------
const baseAccordionStyle = {
  borderRadius: "16px !important",
  border: "none",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:before": { display: "none" },
};
const hoverAccordionStyle = {
  "&:hover": {
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    transform: "translateY(-2px)",
  },
};

// --------------------------------------------
// 4️⃣ Memoized Accordion Rendering
// --------------------------------------------
function FAQItem({ faq, index, expanded, onChange }: any) {
  const prefersReducedMotion = useReducedMotion();
  const animation = useMemo(
    () => (index % 2 === 0 ? fadeInLeft : fadeInRight),
    [index]
  );

  const panelId = `panel${index}`;
  const isExpanded = expanded === panelId;
  const IconComponent = faq.icon;

  return (
    <Grid size={{ xs: 12 }}>
      <motion.div
        variants={prefersReducedMotion ? {} : animation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Accordion
          expanded={isExpanded}
          onChange={onChange(panelId)}
          sx={{
            ...baseAccordionStyle,
            ...(isExpanded
              ? {
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                  transform: "scale(1.02)",
                }
              : {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transform: "scale(1)",
                }),
            ...hoverAccordionStyle,
          }}
        >
          <AccordionSummary
            expandIcon={
              <Avatar
                sx={{
                  bgcolor: isExpanded ? faq.color : alpha(faq.color, 0.1),
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
                flexDirection: { xs: "column", md: "row" },
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
                <IconComponent sx={{ fontSize: 30, color: faq.color }} />
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

          <AccordionDetails sx={{ px: 4, pb: 4, pt: 0 }}>
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
      </motion.div>
    </Grid>
  );
}

// --------------------------------------------
// 5️⃣ Main Component
// --------------------------------------------
export default function FAQs() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : false);

  return (
    <Box
      component="section"
      id="faqs"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg, #FFFFFF 0%, rgba(217,212,209,0.1) 50%, #FFFFFF 100%)",
      }}
    >
      {/* Section Header */}
      <Box textAlign="center" py={4}>
        <Chip
          label="Have Questions?"
          variant="outlined"
          sx={{
            bgcolor: "#F1E9E9",
            "& .MuiChip-label": { color: "#7B2E2E", fontWeight: 600 },
          }}
        />
        <Typography variant="h2" sx={{ color: "#3D444B", py: 2 }}>
          Everything You Need <br />
          <Box component="span" sx={{ color: "#7B2E2E" }}>
            To Know
          </Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#505A63",
            width: "60%",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          Find answers to common questions about living at REHMA. We&apos;re
          here to make your decision easy and confident.
        </Typography>
      </Box>

      {/* FAQ List */}
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              faq={faq}
              expanded={expanded}
              onChange={handleChange}
            />
          ))}
        </Grid>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper
              elevation={16}
              sx={{
                py: 6,
                px: 3,
                textAlign: "center",
                bgcolor: "#7B2E2E",
                background: "linear-gradient(135deg, #7B2E2E, #5F2424)",
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
                <QuestionAnswer sx={{ fontSize: 48, color: "#D4A373" }} />
              </Avatar>

              <Typography
                variant="h2"
                sx={{
                  color: "#D4A373",
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
                  maxWidth: 600,
                  mx: "auto",
                  mb: 5,
                }}
              >
                Our friendly team is available 24/7 to help you with any
                questions or concerns.
              </Typography>

              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={2}
              >
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="contained"
                  size="large"
                  startIcon={<Mail />}
                  sx={{
                    bgcolor: "#D4A373",
                    color: "#FDF9F6",
                    width: 220,
                    py: "10px",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "primary.contrastText",
                      color: "#7B2E2E",
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
                    bgcolor: "primary.contrastText",
                    color: "#7B2E2E",
                    width: 220,
                    py: "10px",
                    fontWeight: 600,
                    "&:hover": {
                      color: "#D9D4D1",
                      bgcolor: "#D4A373",
                    },
                  }}
                >
                  Call Us Now
                </Button>
              </Box>
            </Paper>
          </Container>
        </motion.div>
      </Container>
    </Box>
  );
}
