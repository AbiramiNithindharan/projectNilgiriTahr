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
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #5f452dcb, #b48a5c)",
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
          {/* Left Side */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              flex: isMobile ? "none" : 1,
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start",
              gap: "clamp(1rem, 3vw, 2rem)",
              textAlign: isMobile ? "center" : "left",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.8rem, 6vw, 3rem)",
                fontWeight: "800",
                color: "#f3f4f5",
                margin: "0",
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
                fontFamily: "Poppins, sans-serif",
                lineHeight: "1.1",
              }}
            >
              The Nilgiri Tahr
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <motion.button
                onClick={() => onNavigate("/admin")}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                style={{
                  background: "rgba(218, 204, 168, 0.15)",
                  border: "2px solid #f3f4f5",
                  color: "#f3f4f5",
                  padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
                  borderRadius: "8px",
                  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  fontFamily: "Poppins, sans-serif",
                  alignSelf: isMobile ? "center" : "flex-start",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f3f4f5";
                  e.currentTarget.style.color = "#5F452D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(218, 204, 168, 0.15)";
                  e.currentTarget.style.color = "#f3f4f5";
                }}
              >
                Admin Login
              </motion.button>
            </div>
          </motion.div>

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
                        color: "#f3f4f5",
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
                        e.currentTarget.style.borderBottomColor = "#d4bb97";
                        e.currentTarget.style.color = "#f3f4f5";
                        e.currentTarget.style.transform = isMobile
                          ? "scale(1.05)"
                          : "translateX(10px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = "transparent";
                        e.currentTarget.style.color = "#f3f4f5";
                        e.currentTarget.style.transform = isMobile
                          ? "scale(1)"
                          : "translateX(0)";
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
                {/* ✅ Donate + Shop links only for mobile */}
                {isMobile && (
                  <>
                    <motion.li
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.3 }}
                    >
                      <button
                        onClick={() => onNavigate("/donate")}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#f3f4f5",
                          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                          fontWeight: "500",
                          padding: "0.5rem 0",
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          cursor: "pointer",
                        }}
                      >
                        Donate
                      </button>
                    </motion.li>
                    <motion.li
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.6, duration: 0.3 }}
                    >
                      <button
                        onClick={() => onNavigate("/e-com/store")}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#f3f4f5",
                          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                          fontWeight: "500",
                          padding: "0.5rem 0",
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                          cursor: "pointer",
                        }}
                      >
                        Shop
                      </button>
                    </motion.li>
                  </>
                )}
              </ul>
            </nav>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
