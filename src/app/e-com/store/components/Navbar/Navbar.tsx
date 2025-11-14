"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Home, ShoppingCart, ShoppingBag } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import styles from "./Navbar.module.css";
import { useCart } from "@/context/CartContext";
export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const headerSelector = "#site-header";
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

  const controls = useAnimation();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
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

  // Animate navbar only after header height is known
  useEffect(() => {
    if (headerHeight === null) return;
    controls.start({
      top: headerHeight,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    });
  }, [headerHeight, controls]);

  return (
    <motion.nav
      ref={navRef as any}
      className={styles.navbar}
      aria-label="Main navigation"
      animate={controls}
      initial={{ top: 0 }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <ShoppingBag className={styles.logoIcon} />
          <span className={styles.logoText}>Project Nilgiri Tahr</span>
        </Link>

        {/* Icons */}
        <div className={styles.icons}>
          <Link
            href="/e-com/cart"
            aria-label="Cart"
            className={styles.cartWrapper}
          >
            <ShoppingCart className={styles.icon} />
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </Link>

          <Link href="/e-com/store" aria-label="home">
            <Home className={styles.icon} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
