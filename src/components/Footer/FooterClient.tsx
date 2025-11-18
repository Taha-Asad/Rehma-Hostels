"use client";

import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Button,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Email from "@mui/icons-material/Email";
import WhatsApp from "@mui/icons-material/WhatsApp";
import toast from "react-hot-toast";

export default function FooterClient() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [showDial, setShowDial] = useState(false);

  useEffect(() => {
    // delay SpeedDial mount for perf
    const t = setTimeout(() => setShowDial(true), 500);
    return () => clearTimeout(t);
  }, []);

  const actions = [
    {
      icon: <Facebook />,
      name: "Facebook",
      link: "https://facebook.com/profile.php?id=61582018123399",
    },
    {
      icon: <Instagram />,
      name: "Instagram",
      link: "https://instagram.com/rehmaprofessionalhostels",
    },
    {
      icon: <Email />,
      name: "Email",
      link: "mailto:info@rehmahostels.com",
    },
    {
      icon: <WhatsApp />,
      name: "WhatsApp",
      link: "https://wa.me/923055088887",
    },
  ];

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);

    try {
      const form = new FormData();
      form.append("email", email);

      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (result.success) {
        setEmail("");
        toast.success(result.message || "Newsletter Subscribed successfully");
      } else {
        setEmail("");
        toast.error(result.message || "Subscription failed. Try again later");
      }
    } catch (err) {
      toast.error(`Subscription failed. Try again later. ${err}`);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubscribe}
        spacing={2}
        sx={{ mt: 2 }}
      >
        <TextField
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
            },
          }}
        />
        <Button
          type="submit"
          disabled={subscribing}
          sx={{
            bgcolor: "#D4A373",
            color: "white",
            py: 1.2,
            fontWeight: 600,
            "&:hover": { bgcolor: "#c89660" },
          }}
        >
          {subscribing ? "Subscribing..." : "Subscribe"}
        </Button>
      </Stack>

      {showDial && (
        <SpeedDial
          ariaLabel="Social Media Menu"
          direction="up"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            "& .MuiSpeedDial-fab": {
              bgcolor: "#5f2424",
              color: "white",
              "&:hover": { bgcolor: "#D4A373" },
            },
          }}
          icon={<ShareIcon sx={{ fontSize: 32 }} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => window.open(action.link, "_blank")}
            />
          ))}
        </SpeedDial>
      )}
    </>
  );
}
