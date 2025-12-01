import { auth } from "@/auth";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { redirect } from "next/navigation";
import HomeContent from "../components/client/HomeContent";
import { ClientScrollProvider } from "../utils/ClientScrollProvider";
import RoomPage from "@/components/home/Rooms/RoomPage";
import Testimonials from "@/components/home/Testimonials";
import FAQs from "@/components/home/FAQS";
import Client from "@/components/client/Client";
import NewsPage from "@/components/News/NewsPage";
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
      <ClientScrollProvider>
        <HomeContent />
        <section id="rooms">
          <RoomPage />
        </section>
        <section id="reviews">
          <Testimonials />
        </section>
        <section id="faqs">
          <FAQs />
        </section>
        <section>
          <NewsPage />
        </section>
        <Client />
      </ClientScrollProvider>
      {showNavbarFooter && <Footer />}
    </>
  );
}
