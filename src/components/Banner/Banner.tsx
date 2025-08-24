import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import styles from "./Banner.module.css";

interface BannerProps {
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  height?: string;
  onAnimationComplete?: () => void;
}

export default function Banner({
  imageSrc,
  imageAlt = "Banner",
  title = "Your Journey Starts Here",
  subtitle = "Explore our services and find what you need",
  height = "100vh",
  onAnimationComplete,
}: BannerProps) {
  const [isClient, setIsClient] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const bannerControls = useAnimation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Text animation duration
  const textAnimationDuration = 2.5;

  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        onAnimationComplete?.();

        // setTimeout(() => {
        //   bannerControls.start({
        //     height: "calc(100vh - 100px)",
        //     transition: { duration: 0.8, ease: "easeInOut" },
        //   });
        // }, 100);
      }, textAnimationDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isClient, textAnimationDuration, bannerControls, onAnimationComplete]);

  return (
    <motion.div
      className={styles.banner}
      animate={bannerControls}
      initial={{ opacity: 1 }}
      style={{ 
        position: "relative", 
        overflow: "hidden",
        height: "100vh",
        background: "#ffffff"
      }}
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity:1}}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.2,
        }}
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
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          style={{
            objectFit: "cover",
            // filter: "brightness(1) contrast(1.05) saturate(0.9)",
          }}
        />
      </motion.div>

      {/* Main Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "120px clamp(2rem, 5vw, 4rem) 0", // Account for header space
        }}
      >
        {/* Large Typography - Adjusted for screen fit */}
        <div
          style={{
            textAlign: "left",
            color: "#ffffff", // Changed to white for better contrast without overlay
            maxWidth: "100%",
            width: "100%",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Added text shadow for readability
          }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 10vw, 7rem)",
                fontWeight: "900",
                lineHeight: "0.9",
                margin: "0",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.04em",
                textTransform: "lowercase",
              }}
            >
              We're the
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 10vw, 7rem)",
                fontWeight: "900",
                lineHeight: "0.9",
                margin: "-0.05em 0 0 0",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.04em",
                textTransform: "lowercase",
              }}
            >
              Agency
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 10vw, 7rem)",
                fontWeight: "900",
                lineHeight: "0.9",
                margin: "-0.05em 0 0 0",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.04em",
                textTransform: "lowercase",
              }}
            >
              for{" "}
              <span style={{ marginLeft: "clamp(1.5rem, 5vw, 4rem)" }}>
                the
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 10vw, 7rem)",
                fontWeight: "900",
                lineHeight: "0.9",
                margin: "-0.05em 0 0 0",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.04em",
                textTransform: "lowercase",
              }}
            >
              Nilgiri Tahr
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Bottom Left Scroll Indicator */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        style={{
          position: "absolute",
          bottom: "5%",
          left: "5%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.9rem",
          fontWeight: "600",
          fontFamily: "Inter, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#ffffff",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ 
            scaleX: [1, 1.8, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: "50px",
            height: "2px",
            background: "#ffffff",
            transformOrigin: "left",
          }}
        />
      </motion.div>

      {/* Right Side Vertical Scroll Indicator */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{
          position: "absolute",
          right: "3%",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          color: "#ffffff",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Scroll Text */}
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: "600",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            marginBottom: "1rem",
          }}
        >
          SCROLL
        </div>

        {/* Vertical Line */}
        <motion.div
          animate={{ 
            scaleY: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 2.8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: "2px",
            height: "80px",
            background: "linear-gradient(to bottom, transparent, #ffffff, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Arrow Down */}
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            marginTop: "0.5rem",
            fontSize: "1.2rem",
            fontWeight: "300",
          }}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
}