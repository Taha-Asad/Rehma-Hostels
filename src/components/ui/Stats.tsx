"use client";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

interface StatsProps {
  icon: ReactNode;
  label: string;
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function Stats({
  icon,
  label,
  value,
  duration = 1500,
  prefix = "",
  suffix = "",
}: StatsProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    if (!isVisible || typeof value !== "number") return;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(eased * value);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <Box ref={ref}>
      <Stack direction="row" justifyContent="center">
        <Card
          sx={{
            px: { xs: 5, md: 8 },
            width: "100%",
            py: 3,
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
          elevation={0}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
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

            <CardContent sx={{ textAlign: "center", p: 2 }}>
              <Typography
                variant="h2"
                color="#7B2E2E"
                fontFamily="Inter"
                fontWeight={700}
              >
                {prefix}
                {value > 0 ? count : ""}
                {suffix}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ textWrap: "nowrap" }}
              >
                {label}
              </Typography>
            </CardContent>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default Stats;
