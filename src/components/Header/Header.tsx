"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

// Import new components
import Logo from "./components/Logo";
import ProjectTitle from "./components/ProjectTitle";
import CenterText from "./components/CenterText";
import MenuButton from "./components/MenuButton";
import MenuOverlay from "./components/MenuOverlay";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftLogoSrc?: string;
  leftLogoAlt?: string;
  rightLogoSrc?: string;
  rightLogoAlt?: string;
  rightDonateLogoSrc?: string;
  rightDonateLogoAlt?: string;
  onMenuClick?: () => void;
  onContactClick?: () => void;
  isVisible?: boolean;
}

export default function Header({
  title = "Welcome to Our Platform",
  subtitle = "Discover amazing possibilities",
  leftLogoSrc = "/logo/header-left-logo.png",
  leftLogoAlt = "Left Logo",
  rightLogoSrc = "/logo/header-right-logo.png",
  rightLogoAlt = "Right Logo",
  rightDonateLogoSrc = "/logo/donation.png",
  rightDonateLogoAlt = "donate Logo",
  onMenuClick,
  onContactClick,
  isVisible = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const router = useRouter();

  // Motion values for smoother animations
  const headerY = useMotionValue(0);
  const headerOpacity = useMotionValue(1);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY.current;

    if (Math.abs(scrollDiff) < 3) return;

    lastScrollY.current = currentScrollY;
    setIsScrolled(currentScrollY > 1);
  }, []);

  // Throttled scroll listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null as any;
      }, 16);
    };

    if (isVisible) {
      const delayId = setTimeout(() => {
        window.addEventListener("scroll", throttledScroll, { passive: true });
        lastScrollY.current = window.scrollY;
      }, 2000);

      return () => {
        clearTimeout(delayId);
        if (timeoutId) clearTimeout(timeoutId);
        window.removeEventListener("scroll", throttledScroll);
      };
    }
  }, [isVisible, handleScroll]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (href: string) => {
    handleMenuClose();
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  const menuItems = [
    { label: "Who We Are", href: "/who-we-are" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Where We Work", href: "#where-we-work" },
    { label: "News Room", href: "#news-room" },
    { label: "Photo Gallery", href: "#photo-gallery" },
    { label: "Blogs", href: "#blogs" },
    { label: "Contact Us", href: "#contact-us" },
  ];

  return (
    <>
      <motion.header
        className={styles.header}
        initial={{ y: -120, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -120,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
          opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled
            ? "rgba(10, 9, 9, 0.19)"
            : "rgba(10, 9, 9, 0.19)",
          backdropFilter: isScrolled ? "none" : "none",
          borderBottom: isScrolled ? "none" : "none",
          boxShadow: isScrolled ? "none" : "none",
          padding: isScrolled ? "0.5rem 2rem" : "1rem 2rem",
          minHeight: isScrolled ? "70px" : "100px",
          willChange: "transform, opacity",
          transition: "all 0.2s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isScrolled ? "flex-start" : "center",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            minHeight: isScrolled
              ? "clamp(40px, 8vw, 50px)"
              : "clamp(60px, 10vw, 80px)",
            padding: "0 clamp(0.5rem, 2vw, 2rem)",
            gap: isScrolled ? "clamp(0.8rem, 1.5vw, 1rem)" : "0",
            transition: "all 0.3s ease",
          }}
        >
          {/* Left Logo */}
          <Logo
            src={leftLogoSrc}
            alt={leftLogoAlt}
            size={isScrolled ? "small" : "large"}
            delay={0.1}
            isVisible={isVisible}
          />

          {/* Project Title - Only when scrolled */}
          {isScrolled && (
            <ProjectTitle
              isScrolled={isScrolled}
              title="Project Nilgiri Tahr / நீலகிரி வரையாடு திட்டம்"
            />
          )}

          {/* Center Text - Only when not scrolled */}
          {!isScrolled && <CenterText isVisible={isVisible} />}

          {/* Right Section - Only when not scrolled */}
          {!isScrolled && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: "clamp(0.8rem, 2vw, 1.5rem)",
                flexShrink: 0,
              }}
            >
              <Logo
                src={rightLogoSrc}
                alt={rightLogoAlt}
                size="large"
                delay={0}
                isVisible={true}
              />
              <MenuButton onClick={handleMenuToggle} variant="default" />
              <Logo
                src={rightDonateLogoSrc}
                alt={rightDonateLogoAlt}
                size="small"
                delay={0}
                isVisible={true}
              />
            </motion.div>
          )}

          {/* Compact Menu Button - Only when scrolled */}
          {isScrolled && (
            <>
              <MenuButton onClick={handleMenuToggle} variant="compact" />
              <Logo
                src={rightDonateLogoSrc}
                alt={rightDonateLogoAlt}
                size="small"
                delay={0.1}
                isVisible={true}
              />
            </>
          )}
        </div>
      </motion.header>

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onNavigate={handleNavigation}
        menuItems={menuItems}
      />
    </>
  );
}
