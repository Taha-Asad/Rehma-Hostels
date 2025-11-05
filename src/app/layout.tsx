import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Navbar from "@/components/Navbar/Navbar";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: "Rehma Hostels & Professional Apartment",
  description:
    "Looking for rooms for rent in Lahore? Rehma Hostels offers budget-friendly, secure, and fully equipped rooms for individuals and professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{ overflow: "overlay" }}
      className={`${poppins.className} ${inter.className}`}
    >
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ClientThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ClientThemeProvider>
          <Toaster />
          <SpeedInsights />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
