import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
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
        <SessionProvider>
          <AppRouterCacheProvider>
            <ClientThemeProvider>{children}</ClientThemeProvider>
            <Toaster />
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
