"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";

const Location = dynamic(() => import("@/components/home/Location"), {
  ssr: false,
});

const Contact = dynamic(() => import("@/components/home/Contact"), {
  ssr: false,
});

function Client() {
  return (
    <div>
      <Box component="section" id="location">
        <Location />
      </Box>
      <Box component="section" id="contact">
        <Contact />
      </Box>
    </div>
  );
}

export default Client;
