"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "../../../public/Images/logo.png";
import logoDark from "../../../public/Images/Logo.jpg";

import { sidebarLinks } from "./maps/sidebarLinks";
import Link from "next/link";
import { UserRoundPen } from "lucide-react";
import { ExpandMore, Logout } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {
  id: string | null;
}

function Sidebar({ id }: SidebarProps) {
  const theme = useTheme();

  const router = useRouter();
  const text = theme.palette.text.primary;
  const bg = theme.palette.background.paper;
  const hoverBg = theme.palette.action.hover;
  const primary = theme.palette.primary.main;
  const isDark = theme.palette.mode === "dark";
  const handleLogOut = async () => {
    try {
      await signOut({ redirect: false }); // optional: prevent auto redirect
      toast.success("Logged out successfully");
      router.push("/"); // redirect manually
    } catch (error) {
      toast.error(`Could not logout ${error}`);
    }
  };
  return (
    <Stack
      direction="column"
      height="100vh"
      justifyContent="space-between"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: text,
      }}
    >
      {/* TOP SECTION */}
      <Box>
        {/* Logo */}
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            py: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Image
            src={isDark ? logoDark : logo}
            alt="Rehma hostels - logo"
            width={130}
            height={130}
            style={{
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Links */}
        <Box
          sx={{
            px: 3.5,
            maxHeight: 350,
            overflowY: "auto",
            py: 1.5,
            pr: 1,

            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main + "55",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.primary.main + "99",
            },

            "&::before": {
              content: '""',
              position: "sticky",
              top: 0,
              height: 12,
              background: `linear-gradient(to bottom, ${bg}, ${bg}00)`,
              zIndex: 1,
            },
            "&::after": {
              content: '""',
              position: "sticky",
              bottom: 0,
              height: 12,
              background: `linear-gradient(to top, ${bg}, ${bg}00)`,
              zIndex: 1,
            },
          }}
        >
          {sidebarLinks.map((items, i) => {
            const Icon = items.icon;

            if (items.type === "single") {
              return (
                <Box key={i}>
                  <Link
                    href={items.link}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      display: "block",
                      fontSize: "18px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1.3,
                        px: 2,
                        borderRadius: "8px",
                        transition: "all 0.25s ease",
                        color: text,

                        "&:hover": {
                          backgroundColor: hoverBg,
                          color: primary,
                          transform: "translateX(4px)",
                        },
                        "&:hover .sidebar-icon": {
                          color: primary,
                        },
                        "&:active": {
                          transform: "scale(0.97)",
                          backgroundColor: primary,
                          color: theme.palette.background.paper,
                        },
                        "&:active .sidebar-icon": {
                          color: theme.palette.background.paper,
                        },
                      }}
                    >
                      <Box
                        className="sidebar-icon"
                        sx={{
                          color: "inherit",
                          transition: "color 0.25s ease",
                        }}
                      >
                        <Icon />
                      </Box>
                      {items.title}
                    </Box>
                  </Link>
                </Box>
              );
            }

            /* ACCORDION */
            if (items.type === "accordion") {
              return (
                <Accordion
                  key={i}
                  disableGutters
                  elevation={0}
                  square
                  sx={{
                    background: "transparent",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: text }} />}
                    sx={{
                      px: 2,
                      py: 1.3,
                      borderRadius: "8px",
                      transition: "all 0.25s ease",
                      color: text,
                      fontSize: "18px",
                      minHeight: "unset",

                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      },

                      "&:hover": {
                        backgroundColor: hoverBg,
                        color: primary,
                      },
                      "&:hover svg": { color: primary },

                      "&:active": {
                        transform: "scale(0.97)",
                        backgroundColor: primary,
                        color: theme.palette.background.paper,
                      },
                      "&:active svg": {
                        color: theme.palette.background.paper,
                      },
                    }}
                  >
                    <Icon />
                    {items.title}
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 0, pt: 0.5, pb: 0 }}>
                    <Box
                      sx={{
                        px: 3.5,
                        maxHeight: 300,
                        overflowY: "auto",
                        py: 1.5,
                        pr: 1,

                        "&::-webkit-scrollbar": { width: "6px" },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: primary + "55",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: primary + "99",
                        },
                      }}
                    >
                      {items.children.map((child, idx) => {
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={idx}
                            href={child.link}
                            style={{
                              textDecoration: "none",
                              width: "100%",
                              display: "block",
                              fontSize: "18px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                py: 1.3,
                                px: 2,
                                borderRadius: "8px",
                                transition: "all 0.25s ease",
                                color: text,

                                "&:hover": {
                                  backgroundColor: hoverBg,
                                  color: primary,
                                  transform: "translateX(4px)",
                                },
                                "&:hover .sidebar-icon": {
                                  color: primary,
                                },

                                "&:active": {
                                  transform: "scale(0.97)",
                                  backgroundColor: primary,
                                  color: theme.palette.background.paper,
                                },
                                "&:active .sidebar-icon": {
                                  color: theme.palette.background.paper,
                                },
                              }}
                            >
                              <Box
                                className="sidebar-icon"
                                sx={{
                                  color: "inherit",
                                  transition: "color 0.25s ease",
                                }}
                              >
                                <ChildIcon />
                              </Box>
                              {child.title}
                            </Box>
                          </Link>
                        );
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            }
          })}
        </Box>
      </Box>

      {/* BOTTOM SECTION */}
      <Box
        sx={{
          px: 3.5,
          mb: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {[
          {
            icon: <UserRoundPen />,
            title: "Profile",
            url: `/admin/profile/${id}/`,
          },
          { icon: <Logout />, title: "Logout", action: handleLogOut },
          // { icon: <Settings />, title: "Settings" },
        ].map((item, index) =>
          item.action ? (
            <Box
              key={index}
              onClick={item.action}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                py: 1.3,
                px: 2,
                borderRadius: "8px",
                transition: "all 0.25s ease",
                color: text,

                "&:hover": {
                  backgroundColor: hoverBg,
                  color: primary,
                  transform: "translateX(4px)",
                },

                "&:hover .sidebar-icon": { color: primary },

                "&:active": {
                  transform: "scale(0.97)",
                  backgroundColor: primary,
                  color: theme.palette.background.paper,
                },
                "&:active .sidebar-icon": {
                  color: theme.palette.background.paper,
                },
              }}
            >
              <Box
                className="sidebar-icon"
                sx={{
                  color: "inherit",
                  transition: "color 0.25s ease",
                }}
              >
                {item.icon}
              </Box>{" "}
              {item.title}
            </Box>
          ) : (
            <Link
              key={index}
              href={item.url}
              style={{
                textDecoration: "none",
                width: "100%",
                display: "block",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.3,
                  px: 2,
                  borderRadius: "8px",
                  transition: "all 0.25s ease",
                  color: text,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: hoverBg,
                    color: primary,
                    transform: "translateX(4px)",
                  },

                  "&:hover .sidebar-icon": { color: primary },

                  "&:active": {
                    transform: "scale(0.97)",
                    backgroundColor: primary,
                    color: theme.palette.background.paper,
                  },
                  "&:active .sidebar-icon": {
                    color: theme.palette.background.paper,
                  },
                }}
              >
                <Box
                  className="sidebar-icon"
                  sx={{
                    color: "inherit",
                    transition: "color 0.25s ease",
                  }}
                >
                  {item.icon}
                </Box>{" "}
                {item.title}
              </Box>
            </Link>
          )
        )}
      </Box>
    </Stack>
  );
}

export default Sidebar;
