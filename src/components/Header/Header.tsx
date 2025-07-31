"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link"; // Add Next.js Link import
import { useRouter } from "next/navigation"; // Add useRouter for programmatic navigation
import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftLogoSrc?: string;
  leftLogoAlt?: string;
  rightLogoSrc?: string;
  rightLogoAlt?: string;
  onMenuClick?: () => void;
  onContactClick?: () => void;
  isVisible?: boolean; // Add this prop to control visibility
}

export default function Header({
  title = "Welcome to Our Platform",
  subtitle = "Discover amazing possibilities",
  leftLogoSrc = "/logo/header-left-logo.png",
  leftLogoAlt = "Left Logo",
  rightLogoSrc = "/logo/header-right-logo.png",
  rightLogoAlt = "Right Logo",
  onMenuClick,
  onContactClick,
  isVisible = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef(0);

  // Motion values for smoother animations
  const headerY = useMotionValue(0);
  const headerOpacity = useMotionValue(1);

  // Set isDesktop on mount and on resize
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY.current;

    // Only react to significant scroll changes
    if (Math.abs(scrollDiff) < 3) return;

    // Update scroll direction
    scrollDirection.current = scrollDiff > 0 ? 1 : -1;
    lastScrollY.current = currentScrollY;

    // Show/hide logic
    if (currentScrollY > 200) {
      if (scrollDirection.current > 0 && currentScrollY > 300) {
        // Scrolling down - hide
        setHeaderVisible(false);
        headerY.set(-120);
        headerOpacity.set(0);
      } else if (scrollDirection.current < 0) {
        // Scrolling up - show
        setHeaderVisible(true);
        headerY.set(0);
        headerOpacity.set(1);
      }
    } else {
      // Near top - always show
      setHeaderVisible(true);
      headerY.set(0);
      headerOpacity.set(1);
    }
  }, [headerY, headerOpacity]);

  // Throttled scroll listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null as any;
      }, 16); // ~60fps
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

  const router = useRouter(); // Add router hook

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (href: string) => {
    handleMenuClose();
    if (href.startsWith('#')) {
      // Handle anchor links (scroll to section)
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle page navigation
      router.push(href);
    }
  };

  const menuItems = [
    { label: "Who We Are", href: "/who-we-are" }, // Changed to page route
    { label: "What We Do", href: "/what-we-do" }, // Changed to page route
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
          y: isVisible ? (headerVisible ? 0 : -120) : -120,
          opacity: isVisible ? (headerVisible ? 1 : 0) : 0,
        }}
        transition={{
          y: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          padding: "1rem 2rem",
          minHeight: "100px",
          willChange: "transform, opacity", // Optimize for animations
        }}
      >
        <div
          className="headerContentWrapper"
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            minHeight: "clamp(60px, 10vw, 80px)", // Responsive height
            padding: "0 clamp(0.5rem, 2vw, 2rem)", // Responsive padding
          }}
        >
          {/* Left Logo Section */}
          <motion.div
            className={styles.leftLogo}
            initial={{ x: -50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // width: "clamp(100px, 18vw, 90px)", // Increased minimum size for small screens
              // height: "clamp(100px, 18vw, 90px)",
              flexShrink: 0, // Prevent shrinking
            }}
          >
            <img
              src={leftLogoSrc}
              alt={leftLogoAlt}
              style={{
                width: "clamp(100px, 18vw, 90px)", // Increased minimum size for small screens
                height: "clamp(100px, 18vw, 90px)",
                objectFit: "contain",
              }}
            />
          </motion.div>

          {/* Center Text Section */}
          <motion.div
            className={styles.centerText}
            initial={{ y: -30, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            style={{
              textAlign: "center",
              color: "#333",
              // flex: 1,
              margin: "0 clamp(0.5rem, 2vw, 2rem)", // Responsive margin
              minWidth: 0, // Allow text to shrink
            }}
          >
            <h2
              style={{
                fontSize: "clamp(10px, 2vw, 20px)", // Adjusted responsive font size
                fontWeight: "600",
                letterSpacing: "clamp(0.2px, 0.05vw, 0.8px)",
                margin: "0",
                opacity: "0.9",
                textTransform: "uppercase",
                color: "#1b4332",
                fontFamily: "Poppins, sans-serif",
                lineHeight: "1.1",
              }}
            >
              Government of Tamil Nadu
            </h2>
            <p
              style={{
                fontSize: "clamp(9px, 1.8vw, 18px)",
                margin: "clamp(1px, 0.3vw, 4px) 0 0 0",
                opacity: "0.85",
                fontWeight: "500",
                letterSpacing: "clamp(0.1px, 0.03vw, 0.3px)",
                color: "#2d5016",
                fontFamily: "Poppins, sans-serif",
                lineHeight: "1.1",
              }}
            >
              Tamil Nadu Forest Department
            </p>
            <h1
              style={{
                fontSize: "clamp(11px, 2.5vw, 24px)",
                fontWeight: "800",
                margin: "0",
                background:
                  "linear-gradient(135deg, #081c15, #1b4332, #2d5016, #52b788)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "clamp(0.05px, 0.03vw, 0.3px)",
                lineHeight: "1.1",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Project Nilgiri Tahr / நீலகிரி வரையாடு திட்டம்
            </h1>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className={styles.rightSection}
            initial={{ x: 50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: "clamp(0.8rem, 2vw, 1.5rem)", // Responsive gap
              // width: "clamp(100px, 18vw, 90px)", // Increased minimum size for small screens
              // height: "clamp(100px, 18vw, 90px)",
              flexShrink: 0, // Prevent shrinking
            }}
          >
            {/* Right Logo */}
            <img
              src={rightLogoSrc}
              alt={rightLogoAlt}
              style={{
                width: "clamp(100px, 18vw, 90px)", // Increased minimum size for small screens
                height: "clamp(100px, 18vw, 90px)",
                objectFit: "contain",
              }}
            />

            {/* Menu Button - Better responsive design */}
            <button
              onClick={handleMenuToggle}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(3px, 0.7vw, 5px)",
                transition: "all 0.3s ease",
                width: "clamp(40px, 7vw, 50px)",
                height: "clamp(40px, 7vw, 50px)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.background = "rgba(27, 67, 50, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{
                  width: "clamp(20px, 4vw, 28px)",
                  height: "3px",
                  background: "#1b4332",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                }}
              ></span>
              <span
                style={{
                  width: "clamp(20px, 4vw, 28px)",
                  height: "3px",
                  background: "#1b4332",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                }}
              ></span>
              <span
                style={{
                  width: "clamp(20px, 4vw, 28px)",
                  height: "3px",
                  background: "#1b4332",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                }}
              ></span>
            </button>
          </motion.div>
        </div>
        {/* {!isDesktop && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              marginRight: "35px",
            }}
          >
            <button
              onClick={handleMenuToggle}
              style={{
                background: "rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "clamp(4px, 1vw, 6px)",
                cursor: "pointer",
                padding: "clamp(0.4rem, 1vw, 0.6rem)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(2px, 0.5vw, 4px)",
                transition: "all 0.3s ease",
                width: "clamp(32px, 6vw, 45px)", // Responsive button size
                height: "clamp(32px, 6vw, 45px)",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
              }}
            >
              <span
                style={{
                  width: "clamp(14px, 3vw, 20px)",
                  height: "2px",
                  background: "#333",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                }}
              ></span>
              <span
                style={{
                  width: "clamp(16px, 3.5vw, 25px)",
                  height: "2px",
                  background: "#333",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                }}
              ></span>
              <span
                style={{
                  width: "clamp(12px, 2.5vw, 20px)",
                  height: "2px",
                  background: "#333",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                }}
              ></span>
            </button>
          </div>
        )} */}
      </motion.header>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          className={styles.menuOverlay}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(0, 30, 0, 0.95), rgba(20, 60, 20, 0.95))",
            backdropFilter: "blur(20px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              color: "white",
            }}
          >
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
              }}
            >
              <button
                onClick={handleMenuClose}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "2rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ×
              </button>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: "clamp(1rem, 4vw, 4rem)", // Responsive padding
                maxWidth: "1400px",
                margin: "0 auto",
                flexDirection: window.innerWidth <= 768 ? "column" : "row", // Conditional layout
                gap: window.innerWidth <= 768 ? "2rem" : "4rem",
              }}
            >
              {/* Left Side */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  flex: window.innerWidth <= 768 ? "none" : 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    window.innerWidth <= 768 ? "center" : "flex-start",
                  gap: "clamp(1rem, 3vw, 2rem)",
                  textAlign: window.innerWidth <= 768 ? "center" : "left",
                  width: window.innerWidth <= 768 ? "100%" : "auto",
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 6vw, 3rem)", // Responsive title
                    fontWeight: "800",
                    color: "#f1faee",
                    margin: "0",
                    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
                    fontFamily: "Poppins, sans-serif",
                    lineHeight: "1.1",
                  }}
                >
                  The Nilgiri Tahr
                </h2>
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  style={{
                    background: "rgba(168, 218, 181, 0.15)",
                    border: "2px solid #a8dab5",
                    color: "#f1faee",
                    padding:
                      "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
                    borderRadius: "8px",
                    fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                    fontFamily: "Poppins, sans-serif",
                    alignSelf:
                      window.innerWidth <= 768 ? "center" : "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#a8dab5";
                    e.currentTarget.style.color = "#081c15";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(168, 218, 181, 0.15)";
                    e.currentTarget.style.color = "#f1faee";
                  }}
                >
                  Know More
                </motion.button>
              </motion.div>

              {/* Right Side */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                style={{
                  flex: window.innerWidth <= 768 ? "none" : 1,
                  display: "flex",
                  justifyContent: "center",
                  width: window.innerWidth <= 768 ? "100%" : "auto",
                }}
              >
                <nav>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "clamp(1rem, 2vw, 1.5rem)",
                      alignItems:
                        window.innerWidth <= 768 ? "center" : "flex-start",
                    }}
                  >
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      >
                        <button
                          onClick={() => handleNavigation(item.href)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f1faee",
                            textDecoration: "none",
                            fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                            fontWeight: "500",
                            transition: "all 0.3s ease",
                            padding: "0.5rem 0",
                            borderBottom: "2px solid transparent",
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                            fontFamily: "Poppins, sans-serif",
                            display: "block",
                            textAlign:
                              window.innerWidth <= 768 ? "center" : "left",
                            cursor: "pointer",
                            width: "100%",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderBottomColor = "#a8dab5";
                            e.currentTarget.style.color = "#a8dab5";
                            e.currentTarget.style.transform =
                              window.innerWidth <= 768
                                ? "scale(1.05)"
                                : "translateX(10px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderBottomColor =
                              "transparent";
                            e.currentTarget.style.color = "#f1faee";
                            e.currentTarget.style.transform =
                              window.innerWidth <= 768
                                ? "scale(1)"
                                : "translateX(0)";
                          }}
                        >
                          {item.label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
