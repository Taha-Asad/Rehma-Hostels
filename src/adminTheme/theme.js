"use client";

import { createTheme } from "@mui/material/styles";

const Theme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#7B2E2E", contrastText: "#ffffff" },
      secondary: { main: "#D4A373", contrastText: "#ffffff" },
      background:
        mode === "light"
          ? { default: "#fafafa", paper: "#ffffff" }
          : { default: "#1a1a1a", paper: "#121212" },
      text:
        mode === "light"
          ? { primary: "#1a1a1a", secondary: "#555555" }
          : { primary: "#ffffff", secondary: "#bbbbbb" },
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
        color: mode === "light" ? "#3D444B" : "#e0e0e0",
      },
      body1: {
        fontSize: "1.125rem",
        fontWeight: 400,
        fontFamily: "Inter, sans-serif",
        lineHeight: 1.7,
        color: mode === "light" ? "#505A63" : "#cccccc",
      },
    },
  });
export default Theme;
