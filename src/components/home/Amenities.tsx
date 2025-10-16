import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Wifi } from "lucide-react";
import React from "react";
const cards = [
  {
    icon: <Wifi />,
    title: "High-Speed WiFi",
    content:
      "Unlimited high-speed internet throughout the facility for seamless connectivity",
  },
  {
    icon: <Wifi />,
    title: "High-Speed WiFi",
    content:
      "Unlimited high-speed internet throughout the facility for seamless connectivity",
  },
  {
    icon: <Wifi />,
    title: "High-Speed WiFi",
    content:
      "Unlimited high-speed internet throughout the facility for seamless connectivity",
  },
  {
    icon: <Wifi />,
    title: "High-Speed WiFi",
    content:
      "Unlimited high-speed internet throughout the facility for seamless connectivity",
  },
  {
    icon: <Wifi />,
    title: "High-Speed WiFi",
    content:
      "Unlimited high-speed internet throughout the facility for seamless connectivity",
  },
  {
    icon: <Wifi />,
    title: "High-Speed WiFi",
    content:
      "Unlimited high-speed internet throughout the facility for seamless connectivity",
  },
];
function Amenities() {
  return (
    <Box
      component={"section"}
      id="amenities"
      sx={{
        py: 8,
        backgroundImage: "linear-gradient(to bottom, #D9D4D1, white, #D9D4D1);",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Chip
            label="PREMIUM AMENITIES"
            variant="outlined"
            sx={{
              bgcolor: "#F1E9E9",
              "& .MuiChip-label": {
                color: "#7B2E2E",
                fontWeight: 600,
              },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              color: "#3D444B",
              py: 2,
            }}
          >
            Everything You Need <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              For Comfortable Living{" "}
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
            }}
          >
            Experience modern amenities designed to support your academic
            journey and professional growth while providing the comfort of home.
          </Typography>
        </Box>

        <Box>
          <Grid
            container
            spacing={2}
            sx={{
              py: 2,
            }}
          >
            {cards.map((items, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    px: { xs: 2, md: 3 },
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
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover > :nth-of-type(1)": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                        transition: "all 0.3s ease",
                      },
                      "&:hover > :nth-of-type(2) > :nth-of-type(1)": {
                        transition: "all 0.4s ease",
                        color: "#7B2E2E",
                      },
                    }}
                  >
                    <CardMedia
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        color: "#7B2E2E",
                        width: "60px",
                        height: "55px",
                        py: 1,
                        px: 2,
                        ml: 2,
                        borderRadius: 1,
                        bgcolor: "#ECE1E1",
                      }}
                    >
                      {items.icon}
                    </CardMedia>
                    <CardContent>
                      <Box>
                        <Typography
                          variant="h3"
                          fontWeight={"bold"}
                          sx={{ py: 1 }}
                        >
                          {items.title}
                        </Typography>
                        <Typography>{items.content}</Typography>
                      </Box>
                    </CardContent>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Amenities;
