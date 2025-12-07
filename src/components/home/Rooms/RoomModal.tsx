import { scrollToSection } from "@/utils/scrollToSection";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Clock, Shield, Users, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface RoomDetailsModalProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  open,
  onClose,
  room,
}) => {
  useEffect(() => {
    const scrollContainer =
      (document.scrollingElement as HTMLElement) ||
      (document.documentElement as HTMLElement);
    let scrollY = 0;

    if (open) {
      scrollY = scrollContainer.scrollTop;

      // Lock scroll
      scrollContainer.style.overflow = "hidden";
      scrollContainer.style.position = "fixed";
      scrollContainer.style.top = `-${scrollY}px`;
      scrollContainer.style.width = "100%";
    } else {
      const top = scrollContainer.style.top;

      // Restore normal flow
      scrollContainer.style.overflow = "";
      scrollContainer.style.position = "";
      scrollContainer.style.top = "";
      scrollContainer.style.width = "";

      // Smoothly return to previous scroll position
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: parseInt(top || "0") * -1,
          behavior: "instant",
        });
      });
    }
  }, [open]);
  if (!room) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          overflow: { xs: "auto", lg: "hidden" },
          height: { xs: "auto", lg: "85vh" },
          maxHeight: { xs: "90vh", lg: "85vh" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          height: "100%",
        }}
      >
        {/* Left Side - Image */}
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" },
            height: { xs: 800, lg: "100%" },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={room.image || "/placeholder.png"}
            alt={room.title}
            fill={true}
            style={{
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
          <Chip
            label={room.title}
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              px: 2,
              py: 1,
              height: "auto",
              "& .MuiChip-label": {
                px: 1,
                textWrap: "wrap",
              },
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Right Side - Details */}
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent
            sx={{
              flex: 1,
              p: { xs: 3, lg: 4 },
              overflow: "hidden",
              scrollbarWidth: "thin", // Firefox
              scrollbarColor: "#7B2E2E transparent",
              transition: "all 1s ease-in-out",
              scrollbarGutter: "stable",
              "&:hover": {
                overflowY: "overlay",
              },
              "&::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "transparent", // track
              },
              "&::-webkit-scrollbar:hover": {
                boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7B2E2E",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#D4A373",
                boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
              },
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  color: "#3D444B",
                  mb: 1,
                }}
              >
                {room.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#505A63", mb: 2 }}>
                {room.content}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Rating
                  value={room.rating || 4.5}
                  readOnly
                  precision={0.5}
                  sx={{
                    mt: 0.5,
                    "& .MuiRating-iconFilled": {
                      color: "#7B2E2E",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#BAB1AD",
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: "#505A63" }}>
                  {room.rating} ({room.reviews} reviews)
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Quick Info */}
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Users size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      {room.capacity} Person
                      {room.capacity && room.capacity > 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Clock size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      Available
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Shield size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      Secure
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
              >
                About This Room
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#505A63", lineHeight: 1.8 }}
              >
                {room.description}
              </Typography>
            </Box>

            {/* Amenities */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
              >
                Amenities & Services
              </Typography>
              <Grid container spacing={2}>
                {room.amenities?.map((amenity, index) => (
                  <Grid
                    size={{ xs: 12, sm: 4 }}
                    sx={{
                      placeItems: "center",
                    }}
                    key={index}
                  >
                    <Chip
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 1,
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3D444B",
                              fontWeight: 500,
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {amenity}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        minWidth: "160px",
                        maxWidth: "160px",
                        py: 3.5,
                        px: 1.5,
                        borderRadius: 0.5,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        bgcolor: "#ECE1E1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Pricing */}
            <Container maxWidth={"sm"}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: "#7B2E2E",
                  background:
                    "linear-gradient(135deg, #7B2E2E 0%, #5F2424 100%)",
                  boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: { xs: "center", sm: "left" },
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Monthly Rent
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#D4A373" }}
                    >
                      PKR {room.price}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {room.duration}
                    </Typography>
                  </Box>
                  <Chip
                    label={room.availability}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      my: 2,
                    }}
                  />
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        scrollToSection("contact");
                      }, 400);
                    }}
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "#D4A373",
                      color: "#FDF9F6",
                      borderRadius: 0.5,
                      width: { xs: 150, sm: 250 },
                      py: "10px",
                      px: "15px",
                      fontWeight: 600,
                      border: "1px solid #7B2E2E",
                      boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.25)",
                      transition: "all 0.3s",
                      "&:hover": {
                        bgcolor: "primary.contrastText",
                        color: "#7B2E2E",
                        boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    href="https://wa.me/923055088887"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: "primary.contrastText",
                      color: "#7B2E2E",
                      borderRadius: 0.5,
                      width: { xs: 150, sm: 250 },
                      py: "10px",
                      px: "15px",
                      fontWeight: 600,
                      border: "1px solid #7B2E2E",
                      boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                      transition: "all 0.3s",
                      "&:hover": {
                        color: "#D9D4D1",
                        bgcolor: "#D4A373",
                        boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                      },
                    }}
                  >
                    Contact
                  </Button>
                </Stack>
              </Paper>
            </Container>
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
};
