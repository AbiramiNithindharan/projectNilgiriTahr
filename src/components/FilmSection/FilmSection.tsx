"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import styles from "./FilmSection.module.css";

export default function FilmSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Image
          src="/banners/DJI_0036.jpg"
          alt="Nilgiri Tahr in natural habitat"
          fill
          style={{
            objectFit: "cover",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 clamp(2rem, 5vw, 4rem)",
          gap: "clamp(3rem, 8vw, 8rem)",
        }}
      >
        {/* Left Content */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem 0",
          }}
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: "900",
              lineHeight: "0.9",
              margin: "0 0 2rem 0",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.04em",
              textTransform: "lowercase",
            }}
          >
            Chasing<br />
            Nilgiri Tahr
          </motion.h1>

          {/* Play Button */}
          <motion.div
            variants={itemVariants}
            style={{
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoPlaying(true)}
              style={{
                background: "transparent",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "20px solid #ffffff",
                  borderTop: "12px solid transparent",
                  borderBottom: "12px solid transparent",
                  marginLeft: "4px",
                }}
              />
              
              {/* Animated circles */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "140px",
                  height: "140px",
                  border: "1px solid #ffffff",
                  borderRadius: "50%",
                  top: "-10px",
                  left: "-10px",
                }}
              />
            </motion.button>
            
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginLeft: "140px",
                marginTop: "-60px",
              }}
            >
              WATCH<br />
              THE TRAILER
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            style={{
              maxWidth: "500px",
            }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                margin: "0 0 2rem 0",
                fontFamily: "Inter, sans-serif",
                fontWeight: "400",
              }}
            >
              This <strong>Emmy-winning film about our work</strong> has helped tens of millions of viewers understand the <strong>Nilgiri Tahr crisis</strong>. It has won numerous awards, including the Audience Award at the Sundance Film Festival, Best Documentary at the Peabody Awards, Outstanding Nature Documentary at the Emmys, and was even shortlisted for an Academy Award.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              style={{
                background: "transparent",
                border: "2px solid #ffffff",
                color: "#ffffff",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Content - Large "NILGIRI" text */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              fontWeight: "900",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              opacity: 0.1,
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
            }}
          >
            NILGIRI
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            style={{
              position: "relative",
              width: "80%",
              maxWidth: "800px",
              aspectRatio: "16/9",
              background: "#000",
            }}
          >
            <button
              onClick={() => setIsVideoPlaying(false)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            {/* Video placeholder */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "1.5rem",
              }}
            >
              Video Player Placeholder
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
