import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const page = () => {
  return (
    <Box
      sx={{
        py: 10,
        mt: 15,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={16}
          sx={{
            py: 4,
            pb: 8,
            px: 2,
            bgcolor: "#F6F4F4",
            boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              pb: 2,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#3D444B",
                py: 2,
              }}
            >
              Terms <br />
              <Box component="span" sx={{ color: "#7B2E2E" }}>
                of Service{" "}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#505A63",
                width: { xs: "90%", md: "90%" },
              }}
            >
              These Terms of Service outline the rules, responsibilities, and
              expectations when using our website or booking accommodation at
              Rehma Professional Hostels & Apartments. By continuing to browse
              or use our services, you agree to these terms, which help us
              maintain a secure, respectful, and well-managed living environment
              for everyone.
            </Typography>
          </Box>

          <Box
            sx={{
              px: 5,
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h1" color="#1A1A1A">
                Terms of Service
              </Typography>
              <Typography variant="h4" color="#7B2E2E">
                Effective Date:{" "}
                <Box component={"span"} color={"#505A63"}>
                  21-October, 2025
                </Box>
              </Typography>
              <Typography variant="body1" color="#505A63">
                Welcome to Rehma Professional Hostels and Apartments! By using
                our website or booking a stay with us, you agree to the
                following terms:
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                1. Information We Collect
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                Rehma Professional Hostels and Apartments provides separate
                accommodation facilities for male and female professionals in
                Lahore.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                2. Booking and Payment{" "}
              </Typography>

              <List
                sx={{
                  color: "#505A63",
                  pl: 4,
                  listStyleType: "disc",
                  "& .MuiListItem-root": {
                    display: "list-item",
                    listStyleType: "disc",
                  },
                }}
              >
                {[
                  "Room bookings may require advance payment or security deposit.",
                  "Prices are subject to change without notice but will not affect confirmed bookings.",
                  "Misuse of booking information or providing false details may lead to cancellation.",
                ].map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h4" fontWeight={"bold"}>
                3. Hostel Rules{" "}
              </Typography>
              <List
                sx={{
                  color: "#505A63",
                  pl: 4,
                  listStyleType: "disc",
                  "& .MuiListItem-root": {
                    display: "list-item",
                    listStyleType: "disc",
                    color: "#7B2E2E",
                  },
                }}
              >
                {[
                  "Guests must follow hostel regulations regarding cleanliness, noise, and respectful conduct.",
                  "Male and female residents are housed in separate buildings or floors to ensure privacy and security.",
                  "Violation of hostel rules can result in termination of stay without refund.",
                ].map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h4" fontWeight={"bold"}>
                4. Website Use{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                You agree not to misuse the website, attempt to hack, scrape, or
                disrupt our servers. Content and design are the property of
                Rehma Hostels and may not be copied or redistributed.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                5. Limitation of Liability{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                We strive for accuracy but cannot guarantee that the website
                will always be error-free. Rehma Hostels is not responsible for
                indirect or consequential damages arising from use of our
                services.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                6. Governing Law{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                These terms are governed by the laws of Pakistan, and any
                disputes shall be resolved in Lahore courts.
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default page;
