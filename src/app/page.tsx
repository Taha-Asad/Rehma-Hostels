import type { Metadata } from "next";
import HomeContent from "./HomeContent";
import AdminDashboard from "./admin/page";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

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

export default async function HomePage() {
  console.log("auth.ts LOADED");
  const session = await auth();
  const role = session?.user?.role;

  // Example: show navbar/footer only on non-admin pages
  const showNavbarFooter = role !== "ADMIN";

  return (
    <>
      {/* Favicon (can leave this for now) */}
      <link
        rel="icon"
        href="/favicon.ico"
        sizes="any"
        style={{ borderRadius: "50%" }}
      />

      {showNavbarFooter && <Navbar />}

      <main>{role === "ADMIN" ? <AdminDashboard /> : <HomeContent />}</main>

      {showNavbarFooter && <Footer />}
    </>
  );
}
