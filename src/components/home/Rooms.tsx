import { People } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CircleCheckBig, Star } from "lucide-react";
import React from "react";

const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkb3JtJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDQ0NzY5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Single Room",
    content: "Private sanctuary for focused study and personal space",
    serviceList: [
      "Private Room",
      "Study Desk & Chair",
      "Wardrobe",
      "AC",
      "Attached Bath",
      "WiFi",
    ],
    chips: [{ icon: <People />, label: "1 Person", position: "bottom-left" }],
    price: "PKR 15,000",
    duration: "per month",
    btnText: "Show Details",
  },
  {
    image:
      "https://images.unsplash.com/photo-1697603899008-a4027a95fd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBjb21tb24lMjByb29tfGVufDF8fHx8MTc2MDQ0NzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Twin Room",
    content: "Shared space with modern amenities and excellent value",
    serviceList: [
      "2 Beds",
      "2 Study Desks",
      "Wardrobes",
      "AC",
      "Shared Bath",
      "WiFi",
    ],
    chips: [
      {
        icon: <Star />,
        label: "Popular",
        bgcolor: "#7B2E2E",
        textColor: "#FFFFFF",
        position: "top-right",
      },
      {
        icon: <People />,
        label: "2 Persons",
        color: "#F1E9E9",
        textColor: "#7B2E2E",
        position: "bottom-left",
      },
    ],
    price: "PKR 10,000",
    duration: "per person/month",
    btnText: "Book Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwc3R1ZHklMjBsb3VuZ2V8ZW58MXx8fHwxNzYwNDQ3NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Deluxe Suite",
    content: "Premium living with enhanced comfort and luxury",
    serviceList: [
      "King Bed",
      "Executive Desk",
      "Mini Fridge",
      "AC",
      "Premium Bath",
      "Balcony",
      "WiFi",
    ],
    chips: [{ icon: <People />, label: "1 Person", position: "bottom-left" }],
    price: "PKR 20,000",
    duration: "per month",
    btnText: "Show Details",
  },
];
function Rooms() {
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
            label="ACCOMMODATION OPTIONS"
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
            Choose Your <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Perfect Room{" "}
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
            }}
          >
            From private sanctuaries to shared spaces, each room is thoughtfully
            designed with your comfort and success in mind.
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {cards.map((items, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    mt: 5,
                    width: "100%",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(217,212,209,0.25)",
                    backdropFilter: "blur(8px)",
                    boxShadow:
                      index === 1
                        ? "0 20px 40px rgba(123,46,46,0.45)" // 💡 higher elevation for 2nd card
                        : "0 8px 20px rgba(123,46,46,0.25), 0 2px 5px rgba(0,0,0,0.1)",
                    transform: index === 1 ? "translateY(-10px)" : "none", // slightly lifted
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                    },
                    bgcolor: "#FFFFFF",
                    borderRadius: 1,
                    cursor: "default",
                    minHeight: "800px",
                    maxHeight: "800px",
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={items.image}
                      alt={`Room ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                        display: "block",
                      }}
                    />

                    {items.chips.map((chip, i) => (
                      <Chip
                        key={i}
                        icon={chip.icon}
                        label={chip.label}
                        sx={{
                          position: "absolute",
                          ...(chip.position === "top-right" && {
                            top: 10,
                            right: 10,
                          }),
                          ...(chip.position === "top-left" && {
                            top: 10,
                            left: 10,
                          }),
                          ...(chip.position === "bottom-right" && {
                            bottom: 10,
                            right: 10,
                          }),
                          ...(chip.position === "bottom-left" && {
                            bottom: "70%",
                            left: 10,
                          }),

                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          px: 2.5,
                          py: 1.2,
                          borderRadius: "10px",
                          fontWeight: 600,
                          fontFamily: "Inter",
                          fontSize: "0.9rem",
                          border: "1px solid rgba(255,255,255,0.3)",
                          backdropFilter: "blur(8px)",
                          transition: "all 0.4s ease-in-out",

                          // 💎 Frosted glass + color logic
                          ...(chip.position === "top-right"
                            ? {
                                background: "rgba(123,46,46,0.6)",
                                color: "#FFFFFF",
                                "& .MuiChip-icon": { color: "#FFFFFF" },
                              }
                            : {
                                background: "rgba(255,255,255,0.65)",
                                color: "#7B2E2E",
                                "& .MuiChip-icon": { color: "#7B2E2E" },
                              }),

                          "&:hover": {
                            transform: "translateY(-6px)",
                            boxShadow:
                              chip.position === "top-right"
                                ? "0 10px 25px rgba(123,46,46,0.5)"
                                : "0 10px 25px rgba(255,255,255,0.6)",
                            background:
                              chip.position === "top-right"
                                ? "rgba(123,46,46,0.8)"
                                : "rgba(255,255,255,0.85)",
                          },
                        }}
                      />
                    ))}

                    <CardContent
                      sx={{
                        px: 2,
                        py: 3,
                      }}
                    >
                      <Typography
                        variant="h3"
                        fontFamily={"Poppins"}
                        color="#7B2E2E"
                      >
                        {items.title}
                      </Typography>
                      <Typography variant="body1" fontSize={"16px"}>
                        {items.content}
                      </Typography>
                      {items.serviceList.map((list, j) => (
                        <List key={j} dense>
                          <ListItem
                            sx={{
                              alignItems: "flex-start",
                              py: 0, // optional: removes extra vertical padding
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: "30px",
                                color: "#7B2E2E",
                              }}
                            >
                              <CircleCheckBig size="20px" />
                            </ListItemIcon>

                            <ListItemText
                              primary={list}
                              sx={{
                                mt: "-2px",
                                "& .MuiListItemText-primary": {
                                  fontFamily: "Inter",
                                  color: "#505A63",
                                  fontSize: "0.95rem",
                                },
                              }}
                            />
                          </ListItem>
                        </List>
                      ))}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline", // aligns text by their text baseline (looks cleaner)
                          gap: "6px", // small gap between price and duration
                          mt: 1,
                          px: 2,
                        }}
                      >
                        <Typography
                          variant="h2"
                          color="#7B2E2E"
                          fontFamily="Inter"
                          fontWeight={700}
                        >
                          {items.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#505A63"
                          sx={{ fontFamily: "Poppins" }}
                        >
                          {items.duration}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 1,
                        mb: 3,
                      }}
                    >
                      <Button
                        sx={{
                          bgcolor: index === 1 ? "white" : "#7B2E2E",
                          color: index === 1 ? "#7B2E2E" : "white",
                          border: "2px solid #7B2E2E",
                          borderRadius: 0.5,
                          mb: 2,
                          py: "10px",
                          px: "15px",
                          width: "150px",
                          fontWeight: 600,
                          boxShadow:
                            index === 1
                              ? "5px 5px 10px rgba(0,0,0,0.15)"
                              : "5px 5px 10px rgba(123, 46, 46, 0.2)",
                          transition: "all 0.3s",
                          "&:hover": {
                            bgcolor: index === 1 ? "#7B2E2E" : "white",
                            color: index === 1 ? "white" : "#7B2E2E",
                          },
                        }}
                      >
                        {items.btnText}
                      </Button>
                    </Box>
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

export default Rooms;
