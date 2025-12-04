"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./photogallery.module.css";
import MenuButton from "@/components/PhotoGallery/components/MenuButton";
import MenuOverlay from "@/components/PhotoGallery/components/MenuOverlay";

import { useSearchParams } from "next/navigation";

export default function PhotoGallery() {
  const categories = {
    NilgiriTahr: [
      "/gallery/nt-portrait/nilgiritahr-1.JPG",
      "/gallery/nt-portrait/nilgiritahr-2.JPG",
      "/gallery/nt-portrait/nilgiritahr-3.JPG",
      "/gallery/nt-portrait/nilgiritahr-4.JPG",
      "/gallery/nt-portrait/nilgiritahr-5.JPG",
      "/gallery/nt-portrait/nilgiritahr-7.jpg",
      "/gallery/nt-portrait/nilgiritahr-8.jpg",
      "/gallery/nt-portrait/nilgiritahr-9.jpg",
      "/gallery/nt-portrait/nilgiritahr-10.jpg",
      "/gallery/nt-portrait/nilgiritahr-13.JPG",
      "/gallery/nt-portrait/nilgiritahr-14.JPG",
      "/gallery/nt-portrait/nilgiritahr-15.JPG",
      "/gallery/nt-portrait/nilgiritahr-16.JPG",
    ],
    AssociateFauna: [
      "/gallery/associate-fauna/associate-fauna-1.JPG",
      "/gallery/associate-fauna/associate-fauna-2.JPG",
      "/gallery/associate-fauna/associate-fauna-3.JPG",
      "/gallery/associate-fauna/associate-fauna-4.JPG",
      "/gallery/associate-fauna/associate-fauna-5.JPG",
      "/gallery/associate-fauna/associate-fauna-6.JPG",
      "/gallery/associate-fauna/associate-fauna-7.JPG",
    ],
    RadioCollared: [
      "/gallery/radio-collared/radiocollar-1.JPG",
      "/gallery/radio-collared/radiocollar-2.JPG",
      "/gallery/radio-collared/radiocollar-3.JPG",
    ],
    OurWork: [
      "/gallery/our-work/our-work-1.JPG",
      "/gallery/our-work/our-work-2.png",
      "/gallery/our-work/our-work-3.JPG",
      "/gallery/our-work/our-work-4.JPG",
      "/gallery/our-work/our-work-5.JPG",
    ],
  };

  const banners = {
    NilgiriTahr: "/gallery/nt-portrait/nilgiritahr-15.JPG",
    AssociateFauna: "/gallery/associate-fauna/associate-fauna-2.JPG",
    RadioCollared: "/gallery/radio-collared/radiocollar-2.JPG",
    OurWork: "/gallery/our-work/our-work-3.JPG",
  };

  const searchParams = useSearchParams();
  const initialCategory =
    (searchParams.get("category") as keyof typeof categories) || "NilgiriTahr";

  const [activeCategory, setActiveCategory] =
    useState<keyof typeof categories>(initialCategory);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle window resize for responsive logic
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 1024;

  // Auto slide
  useEffect(() => {
    if (!isPlaying || !lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories[activeCategory].length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, lightboxOpen, activeCategory]);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleCategoryChange = (cat: keyof typeof categories) => {
    setActiveCategory(cat);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const cat = searchParams.get("category") as keyof typeof categories;
    if (cat && categories[cat]) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

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
          height: "80vh",
          marginTop: "100px",
        }}
      >
        <motion.img
          key={activeCategory} // Important for smooth transitions when switching
          src={banners[activeCategory]}
          alt={`${activeCategory} banner`}
          className={styles.bannerImage}
          initial={{ scale: 1.1, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.2,
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10,
            color: "white",
          }}
        >
          <motion.h1
            key={activeCategory}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "800",
              margin: "0",
              fontFamily: "Poppins, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            {activeCategory}
          </motion.h1>
        </div>
      </motion.div>

      {/* Mobile Menu Bar (below banner) */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            backgroundColor: "#f4f4f4",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.2rem",
              color: "#1b4332",
              margin: 0,
            }}
          >
            {activeCategory}
          </h3>
          <MenuButton onClick={() => setIsMenuOpen(true)} variant="compact" />
        </div>
      )}

      {/* Gallery Section */}
      <motion.div
        className={styles.galleryContainer}
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isMenuOpen ? 120 : 0, // slide down when menu opens
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
      >
        <motion.div
          className={styles.galleryInner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sidebar for large screens */}
          {!isMobile && (
            <div className={styles.sidebar}>
              <h3>Categories</h3>
              <div className={styles.categoryList}>
                {Object.keys(categories).map((cat) => (
                  <div
                    key={cat}
                    className={`${styles.category} ${
                      activeCategory === cat ? styles.activeCategory : ""
                    }`}
                    onClick={() =>
                      handleCategoryChange(cat as keyof typeof categories)
                    }
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Grid */}
          <div className={styles.imageArea}>
            <motion.h2
              className={styles.categoryTitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory}
            </motion.h2>
            <motion.div
              layout
              className={styles.imageGrid}
              transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
            >
              {categories[activeCategory].map((img, index) => (
                <motion.div
                  key={index}
                  className={styles.imageCard}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <Image
                    src={img}
                    alt={`${activeCategory} ${index}`}
                    width={300}
                    height={300}
                    className={styles.galleryImage}
                    onClick={() => handleImageClick(index)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                className={styles.lightbox}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Controls */}
                <div className={styles.lightboxControls}>
                  <button onClick={() => setIsPlaying((prev) => !prev)}>
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}>
                    Zoom In
                  </button>
                  <button onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}>
                    Zoom Out
                  </button>
                  <button onClick={() => setLightboxOpen(false)}>Close</button>
                </div>

                {/* Image */}
                <div className={styles.lightboxImageWrapper}>
                  <motion.img
                    key={currentIndex}
                    src={categories[activeCategory][currentIndex]}
                    alt="lightbox"
                    className={styles.lightboxImage}
                    style={{ transform: `scale(${zoom})` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Menu Overlay for Mobile */}
      {isMobile && (
        <MenuOverlay
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={(cat) =>
            handleCategoryChange(cat as keyof typeof categories)
          }
          menuItems={Object.keys(categories).map((cat) => ({
            label: cat,
            href: cat,
          }))}
        />
      )}
    </>
  );
}
