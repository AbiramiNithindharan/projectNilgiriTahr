"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./photogallery.module.css";
import MenuButton from "@/components/PhotoGallery/components/MenuButton";
import MenuOverlay from "@/components/PhotoGallery/components/MenuOverlay";

import { useSearchParams } from "next/navigation";
import {
  galleryCategories,
  GalleryCategory,
  SubCategory,
} from "@/data/galleryData";

import { galleryBanners } from "@/data/galleryBanner";

const getCategoryById = (id: string): GalleryCategory =>
  galleryCategories.find((c) => c.id === id) ?? galleryCategories[0];

export default function PhotoGallery() {
  const searchParams = useSearchParams();

  const initialCategoryId =
    searchParams.get("category") ?? galleryCategories[0].id;

  const [activeCategoryId, setActiveCategoryId] =
    useState<string>(initialCategoryId);

  const activeCategory = useMemo(
    () => getCategoryById(activeCategoryId),
    [activeCategoryId],
  );
  const [activeSubId, setActiveSubId] = useState<string>(
    activeCategory.subCategories[0].id,
  );

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(
    activeCategoryId,
  );

  useEffect(() => {
    setActiveSubId(activeCategory.subCategories[0].id);
  }, [activeCategory]);

  const activeSubCategory = useMemo<SubCategory | undefined>(() => {
    return activeCategory.subCategories.find((sub) => sub.id === activeSubId);
  }, [activeCategory, activeSubId]);

  const currentImages: string[] = activeSubCategory?.images ?? [];

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
    if (!isPlaying || !lightboxOpen || currentImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % currentImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, lightboxOpen, currentImages]);

  useEffect(() => {
    setOpenCategoryId(activeCategoryId);
  }, [activeCategoryId]);

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
          src={galleryBanners[activeCategory.id]}
          alt={`${activeCategory.label} banner`}
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
            key={activeCategory.label}
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
            {activeCategory.label}
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
            {activeCategory.label}
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
            <aside className={styles.sidebar}>
              <h3 className={styles.sidebarTitle}>Categories</h3>

              <div className={styles.categoryList}>
                {galleryCategories.map((category) => {
                  const isOpen = openCategoryId === category.id;
                  const isActive = activeCategoryId === category.id;

                  return (
                    <div key={category.id} className={styles.categoryItem}>
                      {/* MAIN CATEGORY */}
                      <button
                        className={`${styles.mainCategory} ${
                          isActive ? styles.activeMain : ""
                        }`}
                        onClick={() => {
                          setActiveCategoryId(category.id);
                          setOpenCategoryId((prev) =>
                            prev === category.id ? null : category.id,
                          );
                        }}
                      >
                        <span>{category.label}</span>
                        <span
                          className={`${styles.chevron} ${
                            isOpen ? styles.chevronOpen : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      {/* DROPDOWN */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className={styles.subCategoryList}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {category.subCategories.map((sub) => (
                              <button
                                key={sub.id}
                                className={`${styles.subCategory} ${
                                  sub.id === activeSubId ? styles.activeSub : ""
                                }`}
                                onClick={() => setActiveSubId(sub.id)}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </aside>
          )}

          {/* Image Grid */}
          <div className={styles.imageArea}>
            <motion.h2
              className={styles.categoryTitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory.label}
              <span style={{ opacity: 0.6, margin: "0 8px" }}>›</span>
              <motion.span
                key={activeSubId}
                className={styles.categoryTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeSubCategory?.label}
              </motion.span>
            </motion.h2>

            <motion.div
              layout
              className={styles.imageGrid}
              transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
            >
              {currentImages.map((img: string, index: number) => (
                <motion.div
                  key={index}
                  className={styles.imageCard}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={img}
                    alt={`${activeCategory} ${index}`}
                    width={300}
                    height={300}
                    className={styles.galleryImage}
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
                    src={currentImages[currentIndex]}
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
          categories={galleryCategories}
          onSelect={(catId, subId) => {
            setActiveCategoryId(catId);
            setActiveSubId(subId);
          }}
        />
      )}
    </>
  );
}
