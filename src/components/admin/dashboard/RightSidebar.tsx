// app/components/RightSidebar/index.tsx
"use client";

import {
  Paper,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import {
  Refresh,
  People,
  Visibility,
  Login,
  Speed,
  Accessibility,
  TrendingUp,
  Security,
  Analytics,
  BarChart,
} from "@mui/icons-material";
import { useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useAudit } from "@/hooks/useAudit";
import MetricCard from "../MetricCard";
import TopPages from "../TopPages";
import AuditScore from "../AuditScore";
import RealTimeStats from "./RealTimeStats";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ display: value === index ? "block" : "none" }}
    >
      {children}
    </Box>
  );
}

export default function RightSidebar() {
  const [tab, setTab] = useState(0);
  const [customUrl, setCustomUrl] = useState("");
  const {
    data,
    topPages,
    realTime,
    audit,
    loading,
    error,
    isPending,
    refetch,
  } = useAnalytics();
  const { runAudit, loading: auditLoading } = useAudit();

  const handleCustomAudit = () => {
    if (customUrl) {
      runAudit(customUrl);
    }
  };

  return (
    <Paper
      elevation={16}
      sx={{
        width: 320,
        height: "calc(100vh - 32px)",
        bgcolor: "background.paper",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        m: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Analytics sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
          Analytics
        </Typography>
        <Tooltip title="Refresh data">
          <IconButton
            size="small"
            onClick={refetch}
            disabled={isPending}
            sx={{
              animation: isPending ? "spin 1s linear infinite" : "none",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        sx={{
          minHeight: 42,
          "& .MuiTab-root": {
            minHeight: 42,
            fontSize: "0.75rem",
          },
        }}
      >
        <Tab icon={<BarChart sx={{ fontSize: 18 }} />} label="Overview" />
        <Tab icon={<Speed sx={{ fontSize: 18 }} />} label="Audit" />
      </Tabs>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(123,46,46,0.5)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(123,46,46,0.8)",
          },
          "&::before": {
            content: '""',
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background:
              "linear-gradient(to bottom, rgba(246,244,244,1), rgba(246,244,244,0))",
            zIndex: 1,
          },
          "&::after": {
            content: '""',
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background:
              "linear-gradient(to top, rgba(246,244,244,1), rgba(246,244,244,0))",
            zIndex: 1,
          },
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TabPanel value={tab} index={0}>
          {/* Real-time Stats */}
          <RealTimeStats data={realTime} loading={loading} />

          <Divider sx={{ my: 2 }} />

          {/* Metrics */}
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: "block", mb: 1 }}
          >
            Last 7 Days
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
            <MetricCard
              icon={<People fontSize="small" />}
              label="Active Users"
              metric={data?.activeUsers ?? null}
              loading={loading}
            />
            <MetricCard
              icon={<Visibility fontSize="small" />}
              label="Page Views"
              metric={data?.pageViews ?? null}
              loading={loading}
            />
            <MetricCard
              icon={<Login fontSize="small" />}
              label="Sessions"
              metric={data?.sessions ?? null}
              loading={loading}
            />
            <MetricCard
              icon={<TrendingUp fontSize="small" />}
              label="Bounce Rate"
              metric={data?.bounceRate ?? null}
              format={(v) => `${v}%`}
              loading={loading}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Top Pages */}
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: "block", mb: 1 }}
          >
            Top Pages
          </Typography>
          <TopPages pages={topPages} loading={loading} />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {/* Custom URL Audit */}
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              size="small"
              placeholder="Enter URL to audit..."
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "0.875rem",
                },
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleCustomAudit}
              disabled={auditLoading || !customUrl}
              sx={{ minWidth: 70 }}
            >
              {auditLoading ? <CircularProgress size={20} /> : "Audit"}
            </Button>
          </Box>

          {/* Audit Scores */}
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: "block", mb: 1 }}
          >
            Lighthouse Scores
          </Typography>

          <Box sx={{ mb: 2 }}>
            <AuditScore
              label="Performance"
              score={audit?.performance ?? null}
              icon={<Speed fontSize="small" />}
              loading={loading}
            />
            <AuditScore
              label="Accessibility"
              score={audit?.accessibility ?? null}
              icon={<Accessibility fontSize="small" />}
              loading={loading}
            />
            <AuditScore
              label="Best Practices"
              score={audit?.bestPractices ?? null}
              icon={<Security fontSize="small" />}
              loading={loading}
            />
            <AuditScore
              label="SEO"
              score={audit?.seo ?? null}
              icon={<TrendingUp fontSize="small" />}
              loading={loading}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Core Web Vitals */}
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: "block", mb: 1 }}
          >
            Core Web Vitals
          </Typography>

          {audit ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
              }}
            >
              {[
                {
                  label: "FCP",
                  value: audit.fcp,
                  desc: "First Contentful Paint",
                },
                {
                  label: "LCP",
                  value: audit.lcp,
                  desc: "Largest Contentful Paint",
                },
                {
                  label: "CLS",
                  value: audit.cls.toString(),
                  desc: "Cumulative Layout Shift",
                },
                { label: "TBT", value: audit.tbt, desc: "Total Blocking Time" },
              ].map((vital) => (
                <Tooltip key={vital.label} title={vital.desc}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {vital.label}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {vital.value}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          ) : (
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}
            >
              {[...Array(4)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1.5,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    —
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    —
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </TabPanel>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 1.5,
          borderTop: 1,
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Last updated: {new Date().toLocaleTimeString()}
        </Typography>
      </Box>
    </Paper>
  );
}
