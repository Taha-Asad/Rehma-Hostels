// app/page.tsx — SERVER component
import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Rehma Hostels - Affordable Rooms for Rent in Lahore",
  description:
    "Looking for rooms for rent in Lahore? Rehma Hostels offers budget-friendly, secure, and fully equipped rooms for individuals and professionals.",
  keywords: "hostels, rooms for rent, Lahore, budget hostels, secure hostels",
  openGraph: {
    title: "Rooms for Rent in Lahore | Rehma Hostels",
    description:
      "Looking for rooms for rent in Lahore? Rehma Hostels offers budget-friendly, secure, and fully equipped rooms for individuals and professionals.",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
