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
  imageSrc?: string;
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

  // header measurement
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerOverlaying, setHeaderOverlaying] = useState(false); // fixed/sticky/absolute

  // Banner images array
  const bannerImages = [
    {
      src: "/banners/DJI_0036.jpg",
      alt: "Nilgiri Tahr conservation work",
      link: "/banner-content-1",
    },
    {
      src: "/banners/Banner_2.jpg",
      alt: "Western Ghats landscape",
      link: "/banner-content-2",
    },
  ];

  // Recent News
  const recentNews = [
    "Nilgiri Tahr spotted in new habitats across the Western Ghats.",
    "Conservation project expands with community participation.",
    "Government announces new measures for wildlife protection.",
  ];
  const loopedNews = [...recentNews, ...recentNews];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // measure header height and position (client-only)
  useEffect(() => {
    if (!isClient) return;

    const selectors = [
      "header",
      "#header",
      ".site-header",
      "#site-header",
      "[data-site-header]",
      ".header",
    ];

    const findHeaderEl = () =>
      selectors.reduce<HTMLElement | null>((found, sel) => {
        if (found) return found;
        const el = document.querySelector(sel) as HTMLElement | null;
        return el ?? null;
      }, null);

    const measureHeader = () => {
      const headerEl = findHeaderEl();
      if (!headerEl) {
        setHeaderHeight(0);
        setHeaderOverlaying(false);
        return;
      }
      const rect = headerEl.getBoundingClientRect();
      const computed = window.getComputedStyle(headerEl);
      const pos = computed.position || "";
      const overlays = ["fixed", "sticky", "absolute"].includes(pos);
      setHeaderHeight(Math.round(rect.height) || 0);
      setHeaderOverlaying(overlays);
    };

    // initial measure
    measureHeader();

    // recalc on window resize
    window.addEventListener("resize", measureHeader);

    // observe header size changes if possible
    let ro: ResizeObserver | null = null;
    const headerEl = findHeaderEl();
    if (headerEl && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measureHeader);
      try {
        ro.observe(headerEl);
      } catch (e) {
        // ignore
      }
    }

    return () => {
      window.removeEventListener("resize", measureHeader);
      if (ro) ro.disconnect();
    };
  }, [isClient]);

  // Text animation duration
  const textAnimationDuration = 0;

  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        onAnimationComplete?.();
      }, textAnimationDuration);

      return () => clearTimeout(timer);
    }
  }, [isClient, textAnimationDuration, bannerControls, onAnimationComplete]);

  // container style: if header overlays, push banner down and reduce banner's height
  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    height:
      headerOverlaying && headerHeight
        ? `calc(${height} - ${headerHeight}px)`
        : height,
    marginTop:
      headerOverlaying && headerHeight ? `${headerHeight - 50}px` : undefined,
    background: "#000000",
    marginBottom: "100px",
  };

  return (
    <motion.div
      className={styles.banner}
      animate={bannerControls}
      initial={{ opacity: 1 }}
      style={containerStyle}
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
                    objectPosition: "center",
                  }}
                />

                <div className={styles.imageOverlay}></div>

                {/* Banner Text Overlay - show only on first image */}
                {activeIndex === index && index === 0 && (
                  <div
                    style={{
                      position: "relative",
                      zIndex: 10,
                      bottom: "10%",
                      height: "80%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      maxWidth: "1000px",
                      margin: "0 auto",
                      padding: "120px clamp(2rem, 5vw, 4rem) 0",
                    }}
                  >
                    {/* Large Typography - Centered */}
                    <div
                      style={{
                        textAlign: "center",
                        color: "#ffffff",
                        maxWidth: "100%",
                        width: "100%",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <h1
                          style={{
                            fontSize: "clamp(2.5rem, 10vw, 5rem)",
                            fontWeight: "300",
                            lineHeight: "0.9",
                            marginBottom: "10px",
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "-0.04em",
                            textTransform: "lowercase",
                          }}
                        >
                          Conserving the
                        </h1>
                      </motion.div>

                      <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        <h1
                          style={{
                            fontSize: "clamp(2.5rem, 10vw, 5rem)",
                            fontWeight: "300",
                            lineHeight: "0.9",
                            margin: "-0.05em 0 10px 0",
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "-0.04em",
                            textTransform: "lowercase",
                          }}
                        >
                          mountain
                        </h1>
                      </motion.div>

                      <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        <h1
                          style={{
                            fontSize: "clamp(2.5rem, 10vw, 5rem)",
                            fontWeight: "300",
                            lineHeight: "0.9",
                            margin: "-0.05em 0 10px 0",
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "-0.04em",
                            textTransform: "lowercase",
                          }}
                        >
                          monarchs of the
                        </h1>
                      </motion.div>

                      <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                      >
                        <h1
                          style={{
                            fontSize: "clamp(2.5rem, 10vw, 5rem)",
                            fontWeight: "300",
                            lineHeight: "0.9",
                            margin: "-0.05em 0 10px 0",
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "-0.04em",
                            textTransform: "lowercase",
                          }}
                        >
                          Western Ghats
                        </h1>
                      </motion.div>
                    </div>
                  </div>
                )}

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
                        className={styles.knowMoreBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#ffffff";
                          e.currentTarget.style.color = "#000000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#0000006e";
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
