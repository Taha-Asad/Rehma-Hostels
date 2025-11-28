import { auth } from "@/auth";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { redirect } from "next/navigation";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  let session = null;

  try {
    session = await auth();
  } catch (err) {
    console.error("Auth failed:", err);
  }

  const role = session?.user?.role;
  const showNavbarFooter = role !== "ADMIN";

  if (role === "ADMIN") {
    // Only redirect if session exists
    return redirect("/admin");
  }

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
