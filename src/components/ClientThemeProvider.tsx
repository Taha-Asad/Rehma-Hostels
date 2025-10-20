"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { ThemeProvider, CssBaseline, createTheme, Theme } from "@mui/material";
import baseTheme from "@/theme";

interface ClientThemeProviderProps {
  children: ReactNode;
}

export default function ClientThemeProvider({
  children,
}: ClientThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(baseTheme);

  useEffect(() => {
    // Wait for client mount to avoid hydration mismatch
    setMounted(true);

    // Normalize CSS var safely
    const readCssVar = (name: string, fallback: string): string => {
      try {
        const val = getComputedStyle(document.documentElement)
          .getPropertyValue(`--${name}`)
          .trim();
        return val || fallback;
      } catch {
        return fallback;
      }
    };

    // Convert OKLCH → RGB fallback
    const normalizeColor = (color: string, fallback: string): string => {
      if (!color || color.startsWith("oklch")) return fallback;
      const el = document.createElement("div");
      el.style.color = color;
      document.body.appendChild(el);
      const computed = getComputedStyle(el).color;
      document.body.removeChild(el);
      return computed || fallback;
    };

    const dynamicTheme = createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        primary: {
          main: normalizeColor(readCssVar("primary", "#7B2E2E"), "#7B2E2E"),
          contrastText: normalizeColor(
            readCssVar("primary-foreground", "#FFFFFF"),
            "#FFFFFF"
          ),
        },
        secondary: {
          main: normalizeColor(readCssVar("secondary", "#519071"), "#519071"),
          contrastText: normalizeColor(
            readCssVar("secondary-foreground", "#FFFFFF"),
            "#FFFFFF"
          ),
        },
        background: {
          default: normalizeColor(
            readCssVar("background", "#FAFAFA"),
            "#FAFAFA"
          ),
          paper: normalizeColor(readCssVar("card", "#FFFFFF"), "#FFFFFF"),
        },
        text: {
          primary: normalizeColor(
            readCssVar("foreground", "#000000"),
            "#000000"
          ),
          secondary: normalizeColor(
            readCssVar("muted-foreground", "#717182"),
            "#717182"
          ),
        },
      },
    });

    setTheme(dynamicTheme);
  }, []);

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
