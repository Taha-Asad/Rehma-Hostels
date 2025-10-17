import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Stats from "../ui/Stats";
import { Event, Home, People, ShieldOutlined } from "@mui/icons-material";

function StatsSection() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Container>
        <Box
          sx={{
            textAlign: "center",
            py: 5,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#3D444B",
              py: 2,
            }}
          >
            Our Experience <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Speaks for Itself
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
            }}
          >
            Years of trusted hospitality, now focused on students.{" "}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stats
              icon={<Home />}
<<<<<<< HEAD
              value={40}
=======
              value={350}
>>>>>>> origin/main
              suffix="+"
              label="Rooms Available"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stats
              icon={<ShieldOutlined />}
<<<<<<< HEAD
              value={0}
              prefix="24/7"
=======
              value={24}
              suffixValue={7}
              suffix="/"
>>>>>>> origin/main
              label="Security & Support"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stats
              icon={<People />}
              value={1200}
              suffix="+"
              label="Happy Guests"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stats
              icon={<Event />}
              value={100}
              suffix="%"
              label="Satisfaction Rate"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default StatsSection;
