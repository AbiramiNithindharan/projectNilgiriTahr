import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  menuItems: Array<{ label: string; href: string }>;
}

export default function MenuOverlay({
  isOpen,
  onClose,
  onNavigate,
  menuItems,
}: MenuOverlayProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  const isMobile = windowWidth <= 768;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      style={{
        position: "absolute",
        top: "100%", // sits just below the category bar
        left: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        borderRadius: "0 0 10px 10px",
        zIndex: 999,
        display: "block",
        height: "auto",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        style={{
          width: "100%",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          background: "transparent",
        }}
      >
        {/* Close Button */}
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
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#2d5016",
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

        {/* Menu Content */}
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
            padding: "clamp(1rem, 4vw, 4rem)",
            maxWidth: "1400px",
            margin: "0 auto",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "2rem" : "4rem",
          }}
        >
          {/* Right Side - Navigation */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            style={{
              flex: isMobile ? "none" : 1,
              display: "flex",
              justifyContent: "center",
              width: isMobile ? "100%" : "auto",
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
                  alignItems: isMobile ? "center" : "flex-start",
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
                      onClick={() => onNavigate(item.href)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#2d5016",
                        textDecoration: "none",
                        fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                        padding: "0.5rem 0",
                        borderBottom: "2px solid transparent",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        fontFamily: "Poppins, sans-serif",
                        display: "block",
                        textAlign: isMobile ? "center" : "left",
                        cursor: "pointer",
                        width: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = "#a8dab5";
                        e.currentTarget.style.color = "#a8dab5";
                        e.currentTarget.style.transform = isMobile
                          ? "scale(1.05)"
                          : "translateX(10px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = "transparent";
                        e.currentTarget.style.color = "#f1faee";
                        e.currentTarget.style.transform = isMobile
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
  );
}
