"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Stats from "../ui/Stats";
import { Event, Home, People, ShieldOutlined } from "@mui/icons-material";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }, // proper cubic-bezier
  },
};

function StatsSection() {
  const statsData = [
    { icon: <Home />, value: 350, suffix: "+", label: "Rooms Available" },
    {
      icon: <ShieldOutlined />,
      value: 24,
      suffix: "/",
      suffixValue: 7,
      label: "Security & Support",
    },
    { icon: <People />, value: 1200, suffix: "+", label: "Happy Guests" },
    { icon: <Event />, value: 100, suffix: "%", label: "Satisfaction Rate" },
  ];

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container>
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h2" sx={{ color: "#3D444B", py: 2 }}>
            Our Experience <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Speaks for Itself
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: "#505A63" }}>
            Years of trusted hospitality, now focused on students.
          </Typography>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={2}>
            {statsData.map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <motion.div variants={itemVariants}>
                  <Stats {...item} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default StatsSection;
