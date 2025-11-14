"use client";

import { motion } from "framer-motion";
import styles from "./ShopBanner.module.css";

export default function ShopBanner() {
  const handleScroll = () => {
    const storeSection = document.querySelector("#storeContainer");
    if (storeSection) {
      storeSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className={styles.bannerSection}>
      {/* Background Image */}
      <motion.img
        src="/banners/t-shirt-2.jpg"
        alt="Shop Banner"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={styles.bannerImage}
      />

      {/* Blur + dark overlay */}
      <motion.div
        className={styles.blurOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Gradient overlay */}
      <motion.div
        className={styles.gradientOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Text Content */}
      <div className={styles.textContainer}>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.bannerTitle}
        >
          Official Government Merchandise
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className={styles.bannerText}
        >
          Explore our collection of premium-quality printed T-shirts that
          represent national pride and style.
        </motion.p>

        {/* ✅ Animated Shop Now Button */}
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className={styles.shopButton}
          onClick={handleScroll}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
}
