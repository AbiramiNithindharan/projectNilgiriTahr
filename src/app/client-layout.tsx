"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";

const Navbar = dynamic(
  () => import("@/app/e-com/store/components/Navbar/Navbar")
);
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isECom = pathname.startsWith("/e-com");

  const [showHeader] = useState(true);

  const handleMenuClick = () => console.log("Menu clicked!");
  const handleContactClick = () => console.log("Contact Us clicked!");

  return (
    <>
      <CartProvider>
        <div
          style={{
            position: "relative",
            zIndex: "20",
          }}
        >
          <Header
            onMenuClick={handleMenuClick}
            onContactClick={handleContactClick}
            isVisible={isHome ? false : showHeader}
          />

          {isECom && <Navbar />}
        </div>

        {children}

        <Footer />
      </CartProvider>
    </>
  );
}
