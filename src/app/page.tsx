import HomeContent from "../components/client/HomeContent";
import { ClientScrollProvider } from "../utils/ClientScrollProvider";
import RoomPage from "@/components/home/Rooms/RoomPage";
import Testimonials from "@/components/home/Testimonials";
import FAQs from "@/components/home/FAQS";
import Client from "@/components/client/Client";
import NewsComponentPage from "@/components/home/News/NewsComponentPage";
export default async function HomePage() {
  return (
    <>
      {/* Favicon (can leave this for now) */}
      <link
        rel="icon"
        href="/favicon.ico"
        sizes="any"
        style={{ borderRadius: "50%" }}
      />

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
        <section id="news">
          <NewsComponentPage />
        </section>
        <Client />
      </ClientScrollProvider>
    </>
  );
}
