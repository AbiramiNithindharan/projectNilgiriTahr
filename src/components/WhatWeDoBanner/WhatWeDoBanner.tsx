"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./WhatWeDoBanner.module.css";

interface WhatWeDoBannerProps {
  onAnimationComplete?: () => void;
}

export default function WhatWeDoBanner({
  onAnimationComplete,
}: WhatWeDoBannerProps) {
  const [isClient, setIsClient] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const bannerControls = useAnimation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const textAnimationDuration = 1.2;

  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        onAnimationComplete?.();
      }, textAnimationDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isClient, textAnimationDuration, onAnimationComplete]);

  return (
    <>
      {/* Banner Section */}
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "60vh",
          marginTop: "100px",
        }}
      >
        <motion.img
          src="/gallery/nt-portrait/nilgiritahr-17.jpg"
          alt="Wildlife animals"
          className={styles.bannerImage}
          initial={{ scale: 1.1, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.3,
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, rgba(27, 67, 50, 0.6), rgba(82, 183, 136, 0.3))",
            zIndex: 5,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10,
            color: "white",
          }}
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "800",
              margin: "0",
              fontFamily: "Poppins, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            What We Do
          </motion.h1>
        </div>
      </motion.div>

      {/* Description Section Below Banner */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        style={{
          padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 3rem)",
          background: "linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
              lineHeight: "1.8",
              color: "#2d5016",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              marginBottom: "2rem",
            }}
          >
            Project Nilgiri Tahr is a comprehensive conservation initiative
            dedicated to protecting and preserving the endangered Nilgiri Tahr,
            a species endemic to the Western Ghats of Tamil Nadu and Kerala.
            Through scientific research, habitat restoration, and community
            engagement, we work to ensure the long-term survival of this
            magnificent species.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              lineHeight: "1.7",
              color: "#1b4332",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
            }}
          >
            Our multifaceted approach includes population surveys, radio
            collaring studies, grassland restoration, and collaborative
            conservation efforts with local communities and stakeholders to
            create a sustainable future for the Nilgiri Tahr.
          </motion.p>
        </div>
      </motion.section>
    </>
  );
}
