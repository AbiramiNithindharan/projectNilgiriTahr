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

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const getHeader = () => document.querySelector<HTMLElement>(headerSelector);

    const updateHeaderHeight = () => {
      const header = getHeader();
      const height = header
        ? Math.ceil(header.getBoundingClientRect().height)
        : 100;
      setHeaderHeight(height);
      navEl.style.setProperty("--header-height", `${height}px`);
    };

    // initial measurement
    setTimeout(updateHeaderHeight, 0);

    // ResizeObserver to detect header size changes (best for animated/shrinking header)
    let ro: ResizeObserver | null = null;
    const headerEl = getHeader();
    if (headerEl && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      ro.observe(headerEl);
    }

    // update on window resize as fallback
    const onResize = () => updateHeaderHeight();
    window.addEventListener("resize", onResize, { passive: true });

    // optionally update on scroll because your header changes on scroll (keeps things in sync)
    const onScroll = () => updateHeaderHeight();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (ro && headerEl) ro.unobserve(headerEl);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/donation-admin/logout");
    window.location.href = "/admin";
  };

  // Animate navbar only after header height is known
  useEffect(() => {
    if (headerHeight === null) return;
    controls.start({
      top: headerHeight,
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

            <span className={styles.logoText}>Dashboard</span>
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
