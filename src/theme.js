"use client";

import { createTheme } from "@mui/material/styles";

// This theme is SSR-safe and acts as a fallback
const baseTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#7B2E2E", contrastText: "#ffffff" },
    secondary: { main: "#519071", contrastText: "#ffffff" },
    background: { default: "#fafafa", paper: "#ffffff" },
    text: { primary: "#1a1a1a", secondary: "#555555" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontSize: { xs: "2.25rem", md: "3rem", lg: "3.75rem" },
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: { xs: "2.25rem", md: "3rem", lg: "3.75rem" },
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.3,
      letterSpacing: "-0.5px",
    },
    h3: {
      fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
      fontWeight: 500,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.4,
      letterSpacing: "-0.25px",
    },
    h4: {
      fontSize: { xs: "1.25rem", md: "1.5rem", lg: "1.75rem" },
      fontWeight: 500,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.5,
      color: "#3D444B", // subtle text tone
    },
    body1: {
      fontSize: "1.125rem",
      fontWeight: 400,
      fontFamily: "Inter, sans-serif",
      lineHeight: 1.7,
      color: "#505A63",
    },
  },
});

export default baseTheme;
