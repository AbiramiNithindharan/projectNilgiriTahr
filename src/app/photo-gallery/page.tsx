"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./photogallery.module.css";

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
    Architecture: [
      "/images/arch1.jpg",
      "/images/arch2.jpg",
      "/images/arch3.jpg",
    ],
    People: [
      "/images/people1.jpg",
      "/images/people2.jpg",
      "/images/people3.jpg",
    ],
    Wildlife: [
      "/images/wild1.jpg",
      "/images/wild2.jpg",
      "/images/wild3.jpg",
      "/images/wild4.jpg",
    ],
  };

  const [activeCategory, setActiveCategory] =
    useState<keyof typeof categories>("NilgiriTahr");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);

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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories[activeCategory].length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + categories[activeCategory].length) %
        categories[activeCategory].length
    );
  };

  const handleZoom = () => {
    setZoom((prev) => (prev === 1 ? 1.5 : 1));
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        {Object.keys(categories).map((cat) => (
          <div
            key={cat}
            className={`${styles.category} ${
              activeCategory === cat ? styles.activeCategory : ""
            }`}
            onClick={() => setActiveCategory(cat as keyof typeof categories)}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className={styles.imageArea}>
        <h2 className={styles.categoryTitle}>{activeCategory}</h2>
        <div className={styles.imageGrid}>
          {categories[activeCategory].map((img, index) => (
            <div key={index} className={styles.imageCard}>
              <Image
                src={img}
                alt={`${activeCategory} ${index}`}
                width={300}
                height={200}
                className={styles.galleryImage}
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen View */}
      {lightboxOpen && (
        <div className={styles.lightbox}>
          <div className={styles.lightboxControls}>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={handleZoom}>
              {zoom === 1 ? "Zoom In" : "Zoom Out"}
            </button>
            <button onClick={() => setLightboxOpen(false)}>Close</button>
          </div>
          <div className={styles.lightboxImageContainer}>
            <button className={styles.navButton} onClick={handlePrev}>
              ‹
            </button>
            <Image
              src={categories[activeCategory][currentIndex]}
              alt="Large view"
              width={800}
              height={500}
              className={styles.lightboxImage}
              style={{ transform: `scale(${zoom})` }}
            />
            <button className={styles.navButton} onClick={handleNext}>
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
