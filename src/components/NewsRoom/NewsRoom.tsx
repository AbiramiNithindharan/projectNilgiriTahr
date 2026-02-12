"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./NewsRoom.module.css";
import Link from "next/link";

export default function NewsRoom() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const newsCategories = [
    {
      id: "press-release",
      title: "Press Release",
      count: 12,
      description:
        "Official announcements and updates about Project Nilgiri Tahr conservation efforts and research findings.",
      icon: "📰",
    },
    {
      id: "annual-reports",
      title: "Annual Reports",
      count: 5,
      description:
        "Comprehensive yearly reports documenting conservation progress, research outcomes, and project achievements.",
      icon: "📊",
    },
    {
      id: "magazines",
      title: "Magazines",
      count: 18,
      description:
        "Featured articles and stories about Nilgiri Tahr conservation in various wildlife and nature magazines.",
      icon: "📖",
    },
    {
      id: "newsletters",
      title: "Newsletters",
      count: 8,
      description:
        "Regular updates and insights from our conservation work in the Western Ghats ecosystem.",
      icon: "📧",
    },
    {
      id: "in-the-news",
      title: "In The News",
      count: 24,
      description:
        "Media coverage and news articles featuring our Nilgiri Tahr conservation initiatives.",
      icon: "📺",
    },
    {
      id: "article-publication",
      title: "Article Publication",
      count: 16,
      description:
        "Scientific papers and research publications documenting our conservation research and findings.",
      icon: "📄",
    },
  ];

  const recentNews = [
    {
      id: "news-1",
      title: "New Nilgiri Tahr Population Survey Reveals Promising Results",
      date: "December 15, 2024",
      category: "Press Release",
      excerpt:
        "Latest comprehensive survey shows stable population growth in key conservation areas across the Western Ghats.",
      image: "/banners/DJI_0036.jpg",
      readTime: "3 min read",
    },
    {
      id: "news-2",
      title: "Community Conservation Programs Show Remarkable Success",
      date: "December 10, 2024",
      category: "In The News",
      excerpt:
        "Local communities play crucial role in habitat restoration and Nilgiri Tahr protection efforts.",
      image: "/banners/DJI_0036.jpg",
      readTime: "5 min read",
    },
    {
      id: "news-3",
      title: "Research Publication: Habitat Preferences of Nilgiri Tahr",
      date: "December 5, 2024",
      category: "Article Publication",
      excerpt:
        "New research reveals critical habitat requirements for sustainable Nilgiri Tahr conservation.",
      image: "/banners/DJI_0036.jpg",
      readTime: "8 min read",
    },
    {
      id: "news-4",
      title: "Research Publication: Habitat Preferences of Nilgiri Tahr",
      date: "December 5, 2024",
      category: "Article Publication",
      excerpt:
        "New research reveals critical habitat requirements for sustainable Nilgiri Tahr conservation.",
      image: "/banners/DJI_0036.jpg",
      readTime: "8 min read",
    },
    {
      id: "news-5",
      title: "Research Publication: Habitat Preferences of Nilgiri Tahr",
      date: "December 5, 2024",
      category: "Article Publication",
      excerpt:
        "New research reveals critical habitat requirements for sustainable Nilgiri Tahr conservation.",
      image: "/banners/DJI_0036.jpg",
      readTime: "8 min read",
    },
    {
      id: "news-6",
      title: "Research Publication: Habitat Preferences of Nilgiri Tahr",
      date: "December 5, 2024",
      category: "Article Publication",
      excerpt:
        "New research reveals critical habitat requirements for sustainable Nilgiri Tahr conservation.",
      image: "/banners/DJI_0036.jpg",
      readTime: "8 min read",
    },
  ];

  const victories = [
    {
      id: "assessment-2024",
      title: "Assessement 2024",
      image: "/gallery/survey-2024.JPG",
      link: "/victory-sections/survey-2024",
      position: "center",
      content:
        "A comprehensive survey was conducted in the year 2024, across Nilgiri Tahr habitats, documenting their population size, distribution patterns, and habitat use to strengthen long-term conservation strategies.",
    },
    {
      id: "radio-collaring",
      title: "Radio Collaring",
      image: "/gallery/radio-collared.JPG",
      link: "/victory-sections/radio-collaring",
      position: "center",
      content:
        "Radio-collaring Nilgiri Tahr to track their movements, habitat use, and behavior, providing vital insights for science-based conservation and management.",
    },
    {
      id: "assessment-2025",
      title: "Assessement 2025",
      image: "/gallery/survey-2025.JPG",
      link: "/victory-sections/survey-2025",
      position: "top",
      content:
        "The 2025 Nilgiri Tahr survey continues our mission to monitor populations across key habitats, updating trends in distribution, numbers, and health to guide future conservation action",
    },
  ];
  // Set the maximum slides you want to show on larger screens:
  const MAX_DESKTOP_SLIDES = 3;

  // Make breakpoints dynamic so the slider never requests more slides than exist:
  const breakpoints = {
    640: { slidesPerView: Math.min(1, victories.length), spaceBetween: 20 },
    768: { slidesPerView: Math.min(2, victories.length), spaceBetween: 24 },
    1024: { slidesPerView: Math.min(3, victories.length), spaceBetween: 32 },
    // keep 3 on wide screens as requested
    1280: {
      slidesPerView: Math.min(MAX_DESKTOP_SLIDES, victories.length),
      spaceBetween: 32,
    },
  };

  // Loop only if we actually have more slides than the desktop view
  const shouldLoop = victories.length > MAX_DESKTOP_SLIDES;

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Our Success Stories Section */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "8rem",
            background: "#000000",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: "800",
                margin: "0 0 1rem 0",
                lineHeight: "1.2",
                color: "white",
                paddingTop: "4rem",
              }}
            >
              Our Success Stories
            </h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #52b788, #a8dab5)",
                margin: "0 auto 2rem",
                borderRadius: "2px",
              }}
            />
            <p
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                color: "#ffffffff",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: "1.6",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
              }}
            >
              “From surveying rugged peaks to restoring grasslands and building
              bonds with communities, our success stories reflect every step
              taken to secure a future for the Nilgiri Tahr.”
            </p>
          </div>

          {/* Success Stories Cards */}
          <div
            className={styles.swiperContainer}
            style={{ position: "relative", overflow: "visible" }}
          >
            <button
              ref={prevRef}
              className="swiper-button-prev-categories"
              aria-label="Previous"
              // keep minimal inline JS; visual state handled in CSS (touch-friendly)
            >
              ‹
            </button>

            <button
              ref={nextRef}
              className="swiper-button-next-categories"
              aria-label="Next"
            >
              ›
            </button>

            <Swiper
              className={styles.mySwiper}
              key={victories.length}
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onBeforeInit={(swiper: any) => {
                // tie the refs to swiper params before init
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              loop={shouldLoop}
              breakpoints={breakpoints}
              style={{
                padding: "2.5rem",
                background: "rgba(0, 0, 0, 0.02)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
              }}
            >
              {victories.map((victory, index) => (
                <SwiperSlide key={victory.id} className={styles.swiperSlide}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onMouseEnter={() => setHoveredCard(victory.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(15px)",
                      borderRadius: "16px",
                      textAlign: "center",
                      boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      height: "550px",
                      padding: "0",
                      display: "grid",
                      gridTemplateRows: "50% 1fr",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Subtle background pattern */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "100px",
                        height: "100px",
                        background:
                          "linear-gradient(45deg, rgba(82, 183, 136, 0.05), transparent)",
                        borderRadius: "0 16px 0 100px",
                      }}
                    />

                    {/* Image Hero */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        marginBottom: "1.5rem",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={victory.image}
                        alt={victory.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: victory.position,
                          transform: "scale(1.5)",
                        }}
                        priority={index === 0}
                      />

                      {/* Overlay for contrast */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.6))",
                        }}
                      />

                      {/* Centered Title */}
                      <h3
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "#ffffff",
                          fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                          fontWeight: "700",
                          fontFamily: "Poppins, sans-serif",
                          textAlign: "center",
                          padding: "0 1rem",
                          lineHeight: "1.2",
                          textShadow: "0 4px 12px rgba(0,0,0,0.45)",
                          zIndex: 2,
                          margin: 0,
                        }}
                      >
                        {victory.title}
                      </h3>
                    </div>
                    <div
                      style={{
                        padding: "1.75rem 2rem 2rem",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                          lineHeight: "1.6",
                          color: "#2d5016",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: "400",
                          margin: "0",
                          opacity: 0.9,
                          position: "relative",
                          zIndex: 2,
                          textAlign: "justify",
                          flexGrow: 1,
                        }}
                      >
                        {victory.content}
                      </p>
                      <Link
                        href={victory.link}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          style={{
                            background: "transparent",
                            border: "2px solid #090909ff",
                            color: "#090909ff",
                            padding: "0.8rem 1.5rem",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            fontFamily: "Inter, sans-serif",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#000000";
                            e.currentTarget.style.color = "#ffffff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#000000";
                          }}
                        >
                          LEARN MORE
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {victories.length > 3 && (
              <>
                <button
                  className="swiper-button-prev-categories"
                  style={{
                    position: "absolute",
                    left: "-1.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(82, 183, 136, 0.2)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "#1b4332",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 10,
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#52b788";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.95)";
                    e.currentTarget.style.color = "#1b4332";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ‹
                </button>
                <button
                  className="swiper-button-next-categories"
                  style={{
                    position: "absolute",
                    right: "-1.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(82, 183, 136, 0.2)",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "#1b4332",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 10,
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#52b788";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.95)";
                    e.currentTarget.style.color = "#1b4332";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </motion.div>

        <div
          style={{
            padding: "0 2rem 10px",
            maxWidth: "1600px",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "center",
            marginBottom: "8rem",
          }}
        >
          {/* Left Side - Content */}
          <motion.div
            variants={itemVariants}
            style={{
              padding: "0.2rem 0",
              marginTop: "100px",
            }}
          >
            {/* Section Number */}
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#52b788",
                marginBottom: "1rem",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.1em",
                marginTop: "40px",
              }}
            >
              08
            </div>

            {/* Main Heading */}
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "900",
                lineHeight: "1.1",
                margin: "0 0 2rem 0",
                color: "#000000",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              News Room — stay updated with the latest conservation news,
              research findings, and community initiatives.
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                margin: "0 0 2rem 0",
                color: "#666666",
                fontFamily: "Inter, sans-serif",
                fontWeight: "400",
              }}
            >
              Get the latest updates on our conservation work, research
              publications, media coverage, and community engagement initiatives
              protecting the Nilgiri Tahr.
            </p>

            {/* View All Button */}
            <Link href={"/news-categories"}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                style={{
                  background: "transparent",
                  border: "2px solid #000000",
                  color: "#000000",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "2rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#000000";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                VIEW MORE
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Side - Large "NEWS" text */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: "clamp(5rem, 12vw, 10rem)",
                fontWeight: "800",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
                opacity: 0.05,
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
              }}
            >
              NEWS
            </div>
          </motion.div>
        </div>

        {/* News Categories Slider */}

        {/* Recent News Section */}
      </motion.section>
    </>
  );
}
