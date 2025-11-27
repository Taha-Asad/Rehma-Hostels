// import { getAdmin } from "@/actions/user.action";
// import ThemeProvider from "@/adminTheme/ThemeProvider";
// import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // const res = await getAdmin();
  // const admin = res.success ? res.data : null;

  return (
    // <ThemeProvider>
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: 260,
          height: "100%",
          position: "fixed",
          bgcolor: "background.paper",
          boxShadow: "4px 0px 15px -2px rgba(0,0,0,0.1)",
          zIndex: 15,
        }}
      >
        <Sidebar />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          ml: "260px",
        }}
      >
        <Box
          sx={{
            boxShadow: "0px 4px 15px -2px rgba(0,0,0,0.1)",
            zIndex: 10,
            position: "fixed",
            left: 260,
            bgcolor: "background.paper",
            height: 80,
            width: "calc(100% - 260px)",
          }}
        >
          {/* <Navbar admin={admin!} /> */}
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            width: "100%",
            pt: "80px",
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
    // </ThemeProvider>
  );
}
