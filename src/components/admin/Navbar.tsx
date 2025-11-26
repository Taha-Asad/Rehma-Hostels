"use client";
import { useThemeMode } from "@/adminTheme/ThemeProvider";
import {
  DarkMode,
  LightMode,
  Notifications,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
} from "@mui/material";

type Admin = {
  name: string;
  email: string;
  image: string | null;
} | null;
function Navbar({ admin }: { admin: Admin }) {
  const theme = useTheme();
  const { toggleTheme } = useThemeMode();

  const isDark = theme.palette.mode === "dark";

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        {/* LEFT SEARCH BAR */}
        <Box sx={{ width: "30%" }}>
          <TextField
            fullWidth
            placeholder="Search rooms..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: theme.palette.background.paper,
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: theme.palette.primary.main }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* RIGHT SECTION */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* NOTIFICATION ICON */}
            <Box
              sx={{
                border: "1px solid transparent",
                py: 1,
                px: 1,
                borderRadius: 0.5,
                display: "grid",
                placeItems: "center",
                color: theme.palette.primary.main,
                bgcolor: theme.palette.action.hover,
                transition: "all 0.2s ease-in",
                "&:hover": {
                  color: theme.palette.background.paper,
                  bgcolor: theme.palette.primary.main,
                },
              }}
            >
              <Notifications />
            </Box>

            {/* THEME TOGGLE */}
            <Box
              onClick={toggleTheme}
              sx={{
                cursor: "pointer",
                border: "1px solid transparent",
                py: 1,
                px: 1,
                borderRadius: 0.5,
                display: "grid",
                placeItems: "center",
                color: theme.palette.primary.main,
                bgcolor: theme.palette.action.hover,
                transition: "all 0.2s ease-in",
                "&:hover": {
                  color: theme.palette.background.paper,
                  bgcolor: theme.palette.primary.main,
                },
              }}
            >
              {isDark ? <LightMode /> : <DarkMode />}
            </Box>
          </Box>

          {/* DIVIDER */}
          <Divider
            orientation="vertical"
            sx={{
              bgcolor: theme.palette.primary.main,
              width: "2px",
              height: "50px",
              borderRadius: 100,
              mx: 4,
            }}
          />

          {/* USER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar src={admin?.image || ""} />
            <Box>
              <Typography sx={{ color: theme.palette.text.primary }}>
                {admin?.name || "Admin"}{" "}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.primary }}
              >
                {admin?.email || "admin@example.com"}{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Navbar;
