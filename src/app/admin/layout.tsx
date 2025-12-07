import { getAdmin } from "@/actions/user.action";
import ThemeProvider from "@/adminTheme/ThemeProvider";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import { Box } from "@mui/material";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const res = await getAdmin();
  const admin = res.success ? res.data : null;

  if (!admin) {
    return notFound(); // prevent accessing someone else's profile
  }

  return (
    <ThemeProvider>
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
          <Sidebar id={admin.id} />
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
            <Navbar admin={admin!} />
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              width: "100%",
              pt: "80px",
              bgcolor: "background.default",
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
              // top fade
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
              // bottom fade
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
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
