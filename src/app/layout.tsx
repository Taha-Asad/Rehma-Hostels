import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Navbar from "@/components/Navbar";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rehma Hostels & Professional Apartment",
  description:
    "Landing page and admin/student portal for hostel management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppRouterCacheProvider>
          <ClientThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ClientThemeProvider>
          <Toaster />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
