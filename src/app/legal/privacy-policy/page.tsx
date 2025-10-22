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
              py: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#3D444B",
                py: 2,
              }}
            >
              Our Privacy <br />
              <Box component="span" sx={{ color: "#7B2E2E" }}>
                Promise
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#505A63",
                width: { xs: "90%", md: "90%" },
              }}
            >
              At Rehma Professional Hostels & Apartments, we respect your
              privacy as much as we value your trust. This policy explains how
              we collect, use, and protect your personal information when you
              visit our website or stay at our hostels.
            </Typography>
          </Box>

          <Box
            sx={{
              px: { xs: 2, md: 5 },
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h1" color="#1A1A1A">
                Privacy Policy
              </Typography>
              <Typography variant="h4" color="#7B2E2E">
                Effective Date:{" "}
                <Box component={"span"} color={"#505A63"}>
                  21-October, 2025
                </Box>
              </Typography>
              <Typography variant="body1" color="#505A63">
                Rehma Professional Hostels and Apartments (“we,” “our,” or “us”)
                values your privacy. This policy explains how we collect, use,
                and protect your personal information when you visit our website
                or use our services.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                1. Information We Collect
              </Typography>
              <Box>
                <Typography
                  variant="body1"
                  color="#505A63"
                  sx={{ pl: 2.5 }}
                  gutterBottom
                >
                  We may collect:
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
                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <>
                          <Box
                            component="span"
                            fontWeight="bold"
                            color="#7B2E2E"
                          >
                            Personal information:
                          </Box>{" "}
                          such as your name, phone number, email address, and
                          CNIC when you contact us or submit a booking inquiry.
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
                            Usage data:
                          </Box>{" "}
                          including IP address, browser type, and device
                          information collected automatically to improve website
                          performance.
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
              <Typography variant="h4" fontWeight={"bold"}>
                2. How We Use Your Information
              </Typography>
              <Box>
                <Typography
                  variant="body1"
                  color="#505A63"
                  sx={{ pl: 2.5 }}
                  gutterBottom
                >
                  We use your data to:
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
                    "Respond to inquiries or booking requests.",
                    "Provide customer support and updates about your stay.",
                    "Improve our services and website experience.",
                    "Comply with legal requirements.",
                  ].map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Typography variant="h4" fontWeight={"bold"}>
                3. Data Sharing
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                We never sell your personal data. We may share information only
                with trusted service providers (like payment processors or
                hosting services) who help us operate our website and booking
                systems.{" "}
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                4. Data Security
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                We take reasonable security measures to protect your
                information. However, no online platform is 100% secure, so
                please share data wisely.
              </Typography>
              <Typography variant="h4" fontWeight={"bold"}>
                5. Your Rights{" "}
              </Typography>
              <Typography
                variant="body1"
                color="#505A63"
                sx={{ pl: 2.5 }}
                gutterBottom
              >
                You can request to access, update, or delete your personal data
                by contacting us at{" "}
                <Box
                  component={"span"}
                  sx={{ textDecoration: "underline", color: "#7B2E2E" }}
                >
                  info@rehmahostels.com
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
