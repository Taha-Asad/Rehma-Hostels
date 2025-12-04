import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
// import { auth } from "@/auth";
// import Navbar from "@/components/Navbar/Navbar";
// import { Footer } from "@/components/Footer/Footer";
// import { redirect } from "next/navigation";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
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
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let session = null;

  // try {
  //   session = await auth();
  // } catch (err) {
  //   console.error("Auth failed:", err);
  // }

  // const role = session?.user?.role;
  // const showNavbarFooter = role !== "ADMIN";

  // if (role === "ADMIN") {
  //   // Only redirect if session exists
  //   return redirect("/admin");
  // }

  return (
    <html
      lang="en"
      style={{ overflow: "overlay" }}
      className={`${poppins.className} ${inter.className}`}
    >
      <body suppressHydrationWarning>
        <SessionProvider>
          <AppRouterCacheProvider>
            <ClientThemeProvider>
              {/* {showNavbarFooter && <Navbar />} */}
              {children}
              {/* {showNavbarFooter && <Footer />} */}
            </ClientThemeProvider>

            <Toaster />
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
