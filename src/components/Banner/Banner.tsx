"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import styles from "./Banner.module.css";
import Link from "next/link";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const bannerControls = useAnimation();

  // Banner images array
  const bannerImages = [
    {
      src: "/banners/final-banner-image.jpg",
      alt: "Nilgiri Tahr conservation work",
      link: "/banner-content-1", // 👈 unique page for this slide
    },
    {
      src: "/banners/Banner_2.jpg",
      alt: "Western Ghats landscape",
      link: "/banner-content-2", // 👈 unique page for this slide
    },
  ];
  // Recent News
  const recentNews = [
    "Nilgiri Tahr spotted in new habitats across the Western Ghats.",
    "Conservation project expands with community participation.",
    "Government announces new measures for wildlife protection.",
  ];

  // Duplicate once for a seamless loop
  const loopedNews = [...recentNews, ...recentNews];

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
        background: "#000000",
      }}
    >
      {/* Swiper Background Carousel */}
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
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="slide"
          speed={1200}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          allowTouchMove={false}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Background Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />

                {/* Overlay content (always above image) */}
                {activeIndex === index && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "13%",
                      left: "80%",
                      transform: "translateX(-50%)",
                      zIndex: 999999, // 👈 higher than next/image span
                      pointerEvents: "auto",
                    }}
                  >
                    <Link href={image.link} style={{ textDecoration: "none" }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          background: "#000000",
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
                          marginTop: "2rem",
                          position: "relative",
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
                        KNOW MORE
                      </motion.button>
                    </Link>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Progress Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: animationComplete ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        style={{
          position: "absolute",
          bottom: "20%",
          right: "5%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        {bannerImages.map((_, index) => (
          <div
            key={index}
            style={{
              width: "3px",
              height: activeIndex === index ? "40px" : "20px",
              background:
                activeIndex === index
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(255, 255, 255, 0.3)",
              transition: "all 0.8s ease",
              borderRadius: "2px",
            }}
          />
        ))}
      </motion.div>

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
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
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
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "2px",
            height: "80px",
            background:
              "linear-gradient(to bottom, transparent, #ffffff, transparent)",
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
            ease: "easeInOut",
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

      {/* Recent News Ticker */}

      <div className={styles.newsTicker}>
        <span className={styles.newsHeading}>Recent News</span>

        {/* You can tweak speed via the CSS var below (e.g., 16s / 24s) */}
        <div
          className={styles.tickerWrapper}
          style={{ ["--ticker-speed" as any]: "20s" }}
        >
          <div className={styles.tickerTrack}>
            {loopedNews.map((news, i) => (
              <span key={i} className={styles.newsItem}>
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
