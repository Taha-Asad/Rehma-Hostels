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
        mt: 10,
        bgcolor: "#FAFAFA",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            py: 5,
            pb: 8,
            px: { xs: 3, md: 5 },
            bgcolor: "#F6F4F4",
            border: "1px solid #E2E0E0",
            boxShadow: "0 20px 40px rgba(123,46,46,0.25)",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              pb: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#3D444B",
                py: 2,
                fontWeight: "bold",
              }}
            >
              Terms and Conditions <br />
              <Box component="span" sx={{ color: "#7B2E2E" }}>
                Rehma Professional Hostel
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#505A63",
                width: { xs: "95%", md: "85%" },
                fontSize: "1.05rem",
              }}
            >
              Welcome to Rehma Professional Hostel. By accessing or using our
              website and services, you agree to comply with and be bound by the
              following terms and conditions. Please read them carefully.
            </Typography>
          </Box>

          {/* Content Section */}
          <Box>
            <Stack direction="column" spacing={2}>
              <Typography
                variant="h3"
                color="#1A1A1A"
                fontWeight="bold"
                fontFamily={"Inter"}
              >
                Terms Overview
              </Typography>

              <Typography
                variant="h5"
                color="#7B2E2E"
                fontWeight="600"
                fontFamily={"Inter"}
              >
                Effective Date:{" "}
                <Box component="span" color="#505A63">
                  21 October, 2025
                </Box>
              </Typography>

              <Typography variant="body1" color="#505A63">
                By confirming a booking through our website or front desk, you
                acknowledge and agree to follow our hostel policies. Please
                review the terms below to ensure a smooth and pleasant stay.
              </Typography>

              {/* Booking & Check-in */}
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                1. Booking and Check-in
              </Typography>

              <List
                sx={{
                  color: "#505A63",
                  pl: 4,
                  listStyleType: "disc",
                  "& .MuiListItem-root": {
                    display: "list-item",
                    listStyleType: "disc",
                    my: 0.3,
                  },
                }}
              >
                <ListItem disablePadding>
                  <ListItemText primary="Guests must present a valid government-issued ID or passport upon check-in." />
                </ListItem>

                <Box sx={{ display: "flex", gap: 1, pl: 3, my: 0.5 }}>
                  <Typography
                    component="span"
                    sx={{ color: "#7B2E2E", fontWeight: 600 }}
                  >
                    Check-in time:
                  </Typography>
                  <Typography component="span" sx={{ color: "#505A63" }}>
                    <Box component="span" sx={{ color: "#A76A2E" }}>
                      2:00
                    </Box>{" "}
                    PM –{" "}
                    <Box component="span" sx={{ color: "#A76A2E" }}>
                      11:30
                    </Box>{" "}
                    PM
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, pl: 3 }}>
                  <Typography
                    component="span"
                    sx={{ color: "#7B2E2E", fontWeight: 600 }}
                  >
                    Check-out time:
                  </Typography>
                  <Typography component="span" sx={{ color: "#505A63" }}>
                    <Box component="span" sx={{ color: "#A76A2E" }}>
                      8:30
                    </Box>{" "}
                    AM –{" "}
                    <Box component="span" sx={{ color: "#A76A2E" }}>
                      12:00
                    </Box>{" "}
                    PM
                  </Typography>
                </Box>

                <ListItem disablePadding>
                  <ListItemText primary="Advance payment is required to confirm your booking." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="A refundable security deposit of PKR ___ is required for access cards or keys." />
                </ListItem>
              </List>

              {/* Hostel Rules */}
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                2. Hostel Rules
              </Typography>

              <List
                sx={{
                  color: "#505A63",
                  pl: 4,
                  listStyleType: "disc",
                  "& .MuiListItem-root": {
                    display: "list-item",
                    listStyleType: "disc",
                    mb: 0.5,
                  },
                }}
              >
                {[
                  {
                    text: "Guests must maintain",
                    highlight: "cleanliness",
                    end: "and respect shared spaces.",
                  },
                  {
                    text: "Food must be stored in designated areas only.",
                    highlight: "No food is allowed in rooms.",
                  },
                  {
                    text: "Cooking utensils must be cleaned",
                    highlight: "immediately after use.",
                  },
                  {
                    text: "Quiet hours are from",
                    highlight: "12:00 AM to 7:00 AM",
                    end: "No loud conversations or activities during this time.",
                  },
                  {
                    text: "Smoking is permitted only in",
                    highlight: "designated outdoor areas.",
                  },
                  {
                    text: "Alcohol, drugs, and any illegal activities",
                    highlight: "are strictly prohibited.",
                  },
                  {
                    text: "Sexual conduct or inappropriate behavior",
                    highlight: "is not allowed on hostel premises.",
                  },
                  {
                    text: "Visitors are not permitted inside",
                    highlight: "guest rooms or dormitories.",
                  },
                  {
                    text: "Guests must use only their assigned",
                    highlight: "bed and locker.",
                  },
                ].map((rule, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={
                        <Typography component="span" color="#505A63">
                          {rule.text}{" "}
                          <Box
                            component="span"
                            sx={{
                              fontWeight: 600,
                              color: "#A76A2E",
                            }}
                          >
                            {rule.highlight}
                          </Box>{" "}
                          {rule.end && rule.end}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {/* Facilities */}
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                3. Use of Facilities
              </Typography>

              <List
                sx={{
                  color: "#505A63",
                  pl: 4,
                  listStyleType: "disc",
                  "& .MuiListItem-root": {
                    display: "list-item",
                    listStyleType: "disc",
                    mb: 0.5,
                  },
                }}
              >
                {[
                  {
                    text: "Laundry services are available;",
                    highlight: "self-washing or hanging clothes",
                    end: "in rooms is not permitted.",
                  },
                  {
                    text: "Hair dryers may be used only in bathrooms between",
                    highlight: "12:00 PM and 10:00 PM.",
                  },
                  {
                    text: "Wi-Fi is provided for",
                    highlight: "personal use only.",
                    end: "Misuse may result in restricted access.",
                  },
                ].map((rule, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={
                        <Typography component="span" color="#505A63">
                          {rule.text}{" "}
                          <Box
                            component="span"
                            sx={{
                              fontWeight: 600,
                              color: "#A76A2E",
                            }}
                          >
                            {rule.highlight}
                          </Box>{" "}
                          {rule.end && rule.end}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {/* Liability */}
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                4. Liability
              </Typography>
              <Typography variant="body1" color="#505A63" sx={{ pl: 2.5 }}>
                Rehma Professional Hostel is not responsible for loss or damage
                to personal belongings. Lockers are provided for valuables, and
                guests are responsible for any damage caused to hostel property.
              </Typography>

              {/* Website Usage */}
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                5. Website Usage
              </Typography>
              <Typography variant="body1" color="#505A63" sx={{ pl: 2.5 }}>
                By using our website, you agree not to copy, reproduce, or
                redistribute any content without written permission. Cookies may
                be used to enhance your browsing experience. Continued use of
                our website constitutes consent to our cookie policy.
              </Typography>

              {/* Termination */}
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                6. Termination of Stay
              </Typography>
              <Typography variant="body1" color="#505A63" sx={{ pl: 2.5 }}>
                Management reserves the right to refuse service or terminate a
                guest’s stay without refund for rule violations, disruptive
                conduct, or damage to property.
              </Typography>

              {/* Amendments */}
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                7. Amendments
              </Typography>
              <Typography variant="body1" color="#505A63" sx={{ pl: 2.5 }}>
                These terms may be updated periodically. Continued use of our
                services signifies acceptance of any future revisions.
              </Typography>

              {/* Closing Note */}
              <Typography
                variant="body2"
                color="#7B2E2E"
                textAlign="center"
                sx={{ mt: 4, fontStyle: "italic" }}
              >
                Thank you for choosing Rehma Professional Hostel — we appreciate
                your cooperation and wish you a pleasant stay.
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default page;
