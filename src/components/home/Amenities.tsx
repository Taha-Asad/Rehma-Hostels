import { Box, Chip, Container, Typography } from "@mui/material";
import React from "react";

function Amenities() {
  return (
    <Box
      sx={{
        py: 8,
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
            label="About Rehma"
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
            Your Home Away <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              From Home
            </Box>{" "}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Amenities;
