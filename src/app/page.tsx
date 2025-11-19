import type { Metadata } from "next";
import HomeContent from "./HomeContent";
import Head from "next/head";

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
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
          style={{ borderRadius: "50%" }}
        />
      </Head>
      <main>
        <HomeContent />
      </main>
    </>
  );
}
