import { auth } from "@/auth";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { redirect } from "next/navigation";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  console.log("auth.ts LOADED");

  // Example: show navbar/footer only on non-admin pages
  const session = await auth();
  const role = session?.user?.role;
  const showNavbarFooter = role !== "ADMIN";

  if (role === "ADMIN") redirect("/admin");

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
      <HomeContent />

      {showNavbarFooter && <Footer />}
    </>
  );
}
