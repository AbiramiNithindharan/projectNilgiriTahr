"use client";

import { motion } from "framer-motion";
import styles from "./Section1.module.css";

interface Section1Props {
  title?: string;
  subtitle?: string;
  description?: string;
  videoId?: string;
  videoTitle?: string;
}

export default function Section1({
  title = "Conservation Efforts",
  subtitle = "Protecting the Nilgiri Tahr",
  description = "The Nilgiri Tahr (Nilgiritragus hylocrius) is an endangered mountain goat species endemic to the Nilgiri Hills and the southern portion of the Western Ghats between Kerala and Tamil Nadu. Our conservation efforts focus on habitat protection, population monitoring, and community engagement to ensure the survival of this magnificent species.",
  videoId = "Cid9DZP5mS4", // Default YouTube video ID
  videoTitle = "Nilgiri Tahr Conservation Documentary",
}: Section1Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className={styles.section1}
      style={{
        padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)",
        background: "linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(2rem, 6vw, 4rem)",
          alignItems: "center",
        }}
      >
        {/* Content Section */}
        <motion.div
          className={styles.content}
          variants={itemVariants}
          style={{
            padding: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          <motion.h3
            variants={itemVariants}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              fontWeight: "600",
              color: "#52b788",
              marginBottom: "0.5rem",
              fontFamily: "Poppins, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {subtitle}
          </motion.h3>

          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "800",
              color: "#1b4332",
              marginBottom: "1.5rem",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.2",
              background: "linear-gradient(135deg, #1b4332, #2d5016, #52b788)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              lineHeight: "1.8",
              color: "#2d5016",
              marginBottom: "2rem",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
            }}
          >
            {description}
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "transparent",
              color: "#52b788",
              border: "2px solid #52b788",
              padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)",
            //   borderRadius: "50px",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
              boxShadow: "0 4px 15px rgba(82, 183, 136, 0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#52b788";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(82, 183, 136, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#52b788";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(82, 183, 136, 0.15)";
            }}
          >
            Learn More About Conservation
          </motion.button>
        </motion.div>

        {/* Video Section */}
        <motion.div
          className={styles.videoContainer}
          variants={itemVariants}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(27, 67, 50, 0.2)",
            aspectRatio: "16 / 9",
            background: "#000",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "20px",
            }}
          />

          {/* Overlay gradient for better integration */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(45deg, rgba(27, 67, 50, 0.05), transparent)",
              borderRadius: "20px",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
