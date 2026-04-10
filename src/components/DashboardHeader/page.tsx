"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import styles from "./DashboardHeader.module.css";

export default function DashboardHeader() {
  const navRef = useRef<HTMLElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerSelector = "#site-header";
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

  const controls = useAnimation();

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = async () => {
    await fetch("/api/donation-admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin?tab=donation";
  };
  // Animate navbar only after header height is known
  useEffect(() => {
    controls.start({
      transition: { type: "spring", stiffness: 120, damping: 18 },
    });
  }, [headerHeight, controls]);

  return (
    <>
      <motion.nav
        ref={navRef as any}
        className={styles.navbar}
        aria-label="Main navigation"
        animate={controls}
        initial={{ top: 0 }}
      >
        <div className={styles.container}>
          {/* Logo */}
          <button onClick={openSidebar} className={styles.logo}>
            <Menu className={styles.logoIcon} />

            <span className={styles.logoText}>
              Project Nilgiri Tahr Admin Dashboard
            </span>
          </button>

          {/* Icons */}
          <div className={styles.icons}>
            <button onClick={handleLogout} className={styles.logout}>
              Logout
            </button>
          </div>
        </div>
      </motion.nav>
      <DashboardSidebar open={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
