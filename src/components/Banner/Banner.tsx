import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./Banner.module.css";

interface BannerProps {
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  height?: string;
  onAnimationComplete?: () => void; // Callback to trigger header animation
}

export default function Banner({
  imageSrc,
  imageAlt = "Banner",
  title = "Your Journey Starts Here",
  subtitle = "Explore our services and find what you need",
  height = "100vh", // full viewport
  onAnimationComplete,
}: BannerProps) {
  const [isClient, setIsClient] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const bannerControls = useAnimation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const projectName = "The Nilgiri Tahr";

  // Simplified animation duration
  const textAnimationDuration = 1.2; // Total duration for pop-in effect

  useEffect(() => {
    if (isClient) {
      // After text animation completes, trigger header and banner resize
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        onAnimationComplete?.(); // Notify parent component to show header

        // Start banner resize slightly after header starts appearing
        setTimeout(() => {
          bannerControls.start({
            height: "calc(100vh - 100px)",
            transition: { duration: 0.8, ease: "easeInOut" },
          });
        }, 100); // Small delay to sync with header animation
      }, textAnimationDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isClient, textAnimationDuration, bannerControls, onAnimationComplete]);

  return (
    <motion.div
      className={styles.banner}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.img
        src={imageSrc}
        alt={imageAlt}
        className={styles.bannerImage}
        initial={{ scale: 1.1, y: -50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1] as const,
          delay: 0.3,
        }}
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Animated overlay gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, rgba(27, 67, 50, 0.4), rgba(82, 183, 136, 0.2))",
          zIndex: 5,
        }}
      />

      {/* Center overlay that always stays centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <motion.div
          className={styles.projectInfo}
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            ...(animationComplete ? { marginTop: "150px" } : {}),
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.8,
          }}
        >
          <motion.h3
            className={styles.projectTitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "600",
            }}
          >
            Project
          </motion.h3>

          <motion.h2
            className={styles.projectName}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{
              display: "block",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "700",
            }}
          >
            {projectName}
          </motion.h2>

          {/* Button appears after header animation */}
          <motion.button
            className={styles.bannerKnowMoreButton}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: animationComplete ? textAnimationDuration + 0.8 : 1.2,
              type: "spring",
              stiffness: 150,
            }}
            style={{
              display: "block",
              margin: "0 auto",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "600",
            }}
          >
            Know More
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
