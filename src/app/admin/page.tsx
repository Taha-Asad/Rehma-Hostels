import { getDashboardStats } from "@/actions/dashboard/stats.action";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import RightSidebar from "@/components/admin/dashboard/RightSidebar";
import { Box } from "@mui/material";
import React from "react";
async function Dashboard() {
  const stats = await getDashboardStats();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        px: 5,
        py: 1,
      }}
    >
      <Box
        sx={{
          width: "80%",
        }}
      >
        <DashboardStats stats={stats?.data} />
      </Box>
      <RightSidebar />
    </Box>
  );
}

export default Dashboard;
