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
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 500 },
    body1: { fontSize: "1rem", fontWeight: 400 },
  },
});

export default baseTheme;
