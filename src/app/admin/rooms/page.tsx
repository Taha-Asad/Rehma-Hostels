import { getAllRooms } from "@/actions/room.action";
import {
  RoomCreateClient,
  RoomListCardClient,
} from "@/components/admin/rooms/RoomListClient";
import { iconMap } from "@/utils/iconMap";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Chip,
  Container,
  Grid,
} from "@mui/material";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";

interface ChipItem {
  icon: string;
  label: string;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export default async function Page() {
  const rooms = await getAllRooms(); // direct server fetch

  return (
    <Box>
      <Container sx={{ py: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" mb={4}>
            Rooms
          </Typography>
          <RoomCreateClient />
        </Box>
        <Grid container spacing={4}>
          {rooms?.data?.map((room, i) => {
            const chips = room.chips as unknown as ChipItem[];
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.id || i}>
                <Card
                  sx={{
                    mt: 5,
                    ml: { xs: 3.5, md: 1 },
                    width: "100%",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(217,212,209,0.25)",
                    backdropFilter: "blur(8px)",
                    boxShadow:
                      "0 8px 20px rgba(123,46,46,0.25), 0 2px 5px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                    },
                    borderRadius: 1,
                    cursor: "default",
                    height: { xs: 900, sm: 850 },
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="div" // switch from 'img' to 'div' to nest <Image>
                      sx={{
                        width: "100%",
                        maxHeight: "260px",
                        minHeight: "260px",
                        objectFit: "cover",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                        display: "block",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={room?.image || "/path/to/default-image.jpg"}
                        alt={room.id || `Room ${i + 1}`}
                        fill // fills the CardMedia container
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        loading="lazy"
                      />
                    </CardMedia>

                    {chips &&
                      chips.map((chip, ci) => {
                        if (!chip) return null;
                        const Icon = iconMap[chip.icon];
                        return (
                          <Chip
                            key={ci}
                            icon={Icon ? <Icon size={18} /> : undefined}
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

                              background:
                                chip.position === "top-right"
                                  ? "rgba(123,46,46,0.6)"
                                  : "rgba(255,255,255,0.65)",
                              color:
                                chip.position === "top-right"
                                  ? "white"
                                  : "#7B2E2E",

                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              px: 2.5,
                              py: 1.2,
                              borderRadius: "10px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 600,
                              fontFamily: "Inter",
                              fontSize: "0.9rem",
                            }}
                          />
                        );
                      })}

                    <CardContent
                      sx={{
                        px: 2,
                        py: 3,
                      }}
                    >
                      <Typography
                        variant="h3"
                        fontFamily="Poppins"
                        color="text.main"
                        sx={{
                          pb: 1,
                        }}
                      >
                        {room.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        fontSize="16px"
                        color="text.secondary"
                      >
                        {room.content}
                      </Typography>

                      {/* Top Divider */}
                      <Divider sx={{ my: 2, bgcolor: "rgba(123,46,46,0.3)" }} />

                      {/* Scrollable List */}
                      <Box
                        sx={{
                          position: "relative",
                          maxHeight: 200,
                          overflowY: "auto",
                          py: 1.5,
                          pr: 1,
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(123,46,46,0.5)",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "rgba(123,46,46,0.8)",
                          },
                          // top fade
                          "&::before": {
                            content: '""',
                            position: "sticky",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 12,
                            background:
                              "linear-gradient(to bottom, rgba(246,244,244,1), rgba(246,244,244,0))",
                            zIndex: 1,
                          },
                          // bottom fade
                          "&::after": {
                            content: '""',
                            position: "sticky",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 12,
                            background:
                              "linear-gradient(to top, rgba(246,244,244,1), rgba(246,244,244,0))",
                            zIndex: 1,
                          },
                        }}
                      >
                        {room.serviceList.map((list, j) => (
                          <List key={j} dense disablePadding>
                            <ListItem
                              sx={{
                                alignItems: "flex-start",
                                py: 0.3,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: "30px",
                                  color: "secondary.main",
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
                                    color: "text.secondary",
                                    fontSize: "0.95rem",
                                  },
                                }}
                              />
                            </ListItem>
                          </List>
                        ))}
                      </Box>

                      {/* Bottom Divider */}
                      <Divider sx={{ my: 2, bgcolor: "rgba(123,46,46,0.3)" }} />

                      {/* Price Section */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "6px",
                          mt: "auto",
                          px: 1,
                        }}
                      >
                        <Typography
                          variant="h3"
                          color="text.main"
                          fontFamily="Inter"
                          fontWeight={700}
                        >
                          {room.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: "Poppins" }}
                        >
                          {room.duration}
                        </Typography>
                      </Box>

                      <RoomListCardClient rooms={[room]} />
                    </CardContent>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
