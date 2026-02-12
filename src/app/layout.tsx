import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { Toaster } from "react-hot-toast";
import FloatingNotification from "@/components/FloatingNotification/FloatingNotification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Project Nilgiri Tahr",
  description: "Tamil Nadu Forest Department - Project Nilgiri Tahr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className}`}
      >
        {/* ✅ client wrapper handles hooks & header */}
        <ClientLayout>
          {children}{" "}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                marginBottom: "30px",
                padding: "2rem",
                borderLeft: "5px solid blue",
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <FloatingNotification />
        </ClientLayout>
      </body>
    </html>
  );
}
