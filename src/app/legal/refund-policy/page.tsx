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
              Booking <br />
              <Box component="span" sx={{ color: "#7B2E2E" }}>
                Refunds{" "}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#505A63",
                width: { xs: "90%", md: "90%" },
              }}
            >
              We understand that plans can change. This Refund Policy explains
              the conditions under which you may be eligible for a refund when
              booking or staying with Rehma Professional Hostels & Apartments.
              Our goal is to be fair and transparent while ensuring smooth
              operations for both residents and management.
            </Typography>
          </Box>

          <Box
            sx={{
              px: { xs: 2, md: 5 },
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h1" color="#1A1A1A">
                Refund Policy{" "}
              </Typography>
              <Typography variant="h4" color="#7B2E2E">
                Effective Date:{" "}
                <Box component={"span"} color={"#505A63"}>
                  21-October, 2025
                </Box>
              </Typography>
              <Typography variant="body1" color="#505A63">
                At Rehma Professional Hostels and Apartments, we understand that
                plans can change. Our refund policy aims to be fair to both
                residents and management.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                1. Booking Cancellations{" "}
              </Typography>
              <Box>
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
                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <>
                          <Box
                            component="span"
                            fontWeight="bold"
                            color="#7B2E2E"
                          >
                            Before Check-In:
                          </Box>{" "}
                          Full refund if canceled at least 7 days before the
                          scheduled move-in date.
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <>
                          <Box
                            component="span"
                            fontWeight="bold"
                            color="#7B2E2E"
                          >
                            Within 7 Days of Check-In:{" "}
                          </Box>{" "}
                          50% refund of the booking amount.
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <>
                          <Box
                            component="span"
                            fontWeight="bold"
                            color="#7B2E2E"
                          >
                            After Check-In:{" "}
                          </Box>{" "}
                          Refunds are not applicable for the current billing
                          period.{" "}
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
              <Typography variant="h4" fontWeight={"bold"}>
                2. Security Deposits{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                Security deposits are refundable after checkout, provided there
                are no damages, unpaid dues, or rule violations.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                3. Service Fees{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                Any administrative or processing fees are non-refundable.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                4. Refund Process{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                Refunds (if applicable) are processed within 10–15 business days
                to the original payment method.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                5. Contact{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                For refund requests or billing concerns, contact{" "}
                <Box
                  component={"span"}
                  sx={{ textDecoration: "underline", color: "#7B2E2E" }}
                >
                  billing@rehmahostels.com
                </Box>
                .
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                6. Updates to This Policy{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                We may update this policy periodically. The latest version will
                always be posted here.
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default page;
