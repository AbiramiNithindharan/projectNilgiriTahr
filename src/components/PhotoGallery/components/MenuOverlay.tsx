"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./menuOverlay.module.css";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categories: Record<string, { id: number; title: string }[]>;
  onSelect: (cat: string, subId: number) => void;
};

export default function MenuOverlay({
  isOpen,
  onClose,
  categories,
  onSelect,
}: Props) {
  const [openCat, setOpenCat] = useState<string | null>(null);
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
        top: "100%",
        left: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        borderRadius: "0 0 10px 10px",
        zIndex: 999,

        overflow: "hidden",
      }}
    >
      {/* Close Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        style={{
          width: "100%",
          padding: "1.5rem",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
            color: "#2d5016",
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

        {/* Menu Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            marginTop: "2rem",
          }}
        >
          {Object.entries(categories).map(([cat, subs]) => {
            const isOpenCat = openCat === cat;

            return (
              <div key={cat}>
                {/* MAIN CATEGORY */}
                <div
                  onClick={() => setOpenCat(isOpenCat ? null : cat)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#1b4332",
                    cursor: "pointer",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid #e5e5e5",
                  }}
                >
                  {cat}
                  <span>{isOpenCat ? "▲" : "▼"}</span>
                </div>

                {/* SUB CATEGORIES */}
                {isOpenCat && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      paddingLeft: "1rem",
                      marginTop: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {subs.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onSelect(cat, sub.id);
                          onClose(); // 🔥 auto close
                        }}
                        style={{
                          background: "#f1fbf8",
                          border: "none",
                          borderRadius: "6px",
                          padding: "0.6rem 0.8rem",
                          textAlign: "left",
                          cursor: "pointer",
                          color: "#2d6a4f",
                          fontSize: "0.95rem",
                        }}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
