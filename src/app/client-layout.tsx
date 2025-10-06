"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [showHeader] = useState(true);

  const handleMenuClick = () => console.log("Menu clicked!");
  const handleContactClick = () => console.log("Contact Us clicked!");

  return (
    <>
      <Header
        onMenuClick={handleMenuClick}
        onContactClick={handleContactClick}
        isVisible={isHome ? false : showHeader}
      />
      {children}
      <Footer />
    </>
  );
}
