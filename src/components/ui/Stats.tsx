"use client";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Rating,
} from "@mui/material";

interface StatsProps {
  icon?: ReactNode; // main icon (large circle)
  labelIcon?: ReactNode; // small icon before label
  label: string;
  value: number; // numeric value to animate to (e.g., 24 for "24/7")
  suffixValue?: number; // optional second number to animate (e.g., 7 for "24/7")
  duration?: number; // animation duration (ms)
  prefix?: string; // text before the number
  suffix?: string; // text after the number (e.g., "+", "★") or separator (e.g., "/")
  rating?: number; // optional star rating below the number
  width?: number | string; // card width (e.g., 320, "100%")
  height?: number | string; // card height (e.g., 200, "240px")
}

function Stats({
  icon,
  labelIcon,
  label,
  value,
  suffixValue,
  duration = 1500,
  prefix = "",
  suffix = "",
  rating,
  width,
  height,
}: StatsProps) {
  const [count, setCount] = useState(0);
  const [suffixCount, setSuffixCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation when component becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animate main value
  useEffect(() => {
    if (!isVisible || typeof value !== "number") return;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  // Animate suffix value if provided
  useEffect(() => {
    if (!isVisible || typeof suffixValue !== "number") return;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * suffixValue;
      setSuffixCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, suffixValue, duration]);

  const isIntegerTarget = Number.isInteger(value);
  const displayValue = isIntegerTarget
    ? Math.round(count)
    : Number(count).toFixed(1);

  const isSuffixIntegerTarget = suffixValue
    ? Number.isInteger(suffixValue)
    : false;
  const displaySuffixValue = suffixValue
    ? isSuffixIntegerTarget
      ? Math.round(suffixCount)
      : Number(suffixCount).toFixed(1)
    : "";

  return (
    <Box ref={ref}>
      <Stack direction="row" justifyContent="center">
        <Card
          sx={{
            px: { xs: 5, md: 8 },
            py: 3,
            transition: "all 0.3s ease",
            backdropFilter: "blur(8px)",
            boxShadow:
              "0 8px 20px rgba(123,46,46,0.25), 0 2px 5px rgba(0,0,0,0.1)",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
            },
            bgcolor: "#FFFFFF",
            borderRadius: 1,
            width: width ?? "100%",
            height: height ?? undefined,
            minHeight: height ? undefined : 200,
            cursor: "default",
          }}
          elevation={0}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            {icon ? (
              <CardMedia
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  bgcolor: "#E3D3D3",
                  color: "#7B2E2E",
                  transition: "background 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    bgcolor: "#7B2E2E",
                    color: "#FFFFFF",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {icon}
              </CardMedia>
            ) : null}

            <CardContent sx={{ textAlign: "center", p: 2 }}>
              <Typography
                variant="h2"
                color="#7B2E2E"
                fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                fontWeight={700}
              >
                {prefix}
                {displayValue}
                {suffixValue !== undefined ? suffix : ""}
                {displaySuffixValue}
                {suffixValue === undefined ? suffix : ""}
              </Typography>

              {rating !== undefined && (
                <Rating
                  name="read-only"
                  value={rating}
                  precision={0.5}
                  readOnly
                  size="medium"
                  sx={{
                    mt: 0.5,
                    "& .MuiRating-iconFilled": {
                      color: "#7B2E2E",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#BAB1AD",
                    },
                  }}
                />
              )}

              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={0.8}
                sx={{ mt: 0.5 }}
              >
                {labelIcon && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#7B2E2E",
                      fontSize: 18,
                    }}
                  >
                    {labelIcon}
                  </Box>
                )}
                <Typography
                  variant="body1"
                  color="#505A63"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {label}
                </Typography>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default Stats;
