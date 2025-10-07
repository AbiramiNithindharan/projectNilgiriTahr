"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./news-categories.module.css";
import Link from "next/link";

export default function NewsRoom() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const newsCategories = [
    {
      id: "press-release",
      title: "Press Release",
      count: 12,
      link: "/news-categories/press-release",
      description:
        "Official announcements and updates about Project Nilgiri Tahr conservation efforts and research findings.",
      icon: "📰",
    },
    {
      id: "annual-reports",
      title: "Annual Reports",
      count: 5,
      link: "/news-categories/annual-reports",
      description:
        "Comprehensive yearly reports documenting conservation progress, research outcomes, and project achievements.",
      icon: "📊",
    },
    {
      id: "magazines",
      title: "Magazines",
      count: 18,
      link: "/news-categories/magazines",
      description:
        "Featured articles and stories about Nilgiri Tahr conservation in various wildlife and nature magazines.",
      icon: "📖",
    },
    {
      id: "newsletters",
      title: "Newsletters",
      count: 8,
      link: "/news-categories/news-letters",
      description:
        "Regular updates and insights from our conservation work in the Western Ghats ecosystem.",
      icon: "📧",
    },
    {
      id: "in-the-news",
      title: "In The News",
      count: 24,
      link: "/news-categories/in-the-news",
      description:
        "Media coverage and news articles featuring our Nilgiri Tahr conservation initiatives.",
      icon: "📺",
    },
    {
      id: "article-publication",
      title: "Article Publication",
      count: 16,
      link: "/news-categories/article-publication",
      description:
        "Scientific papers and research publications documenting our conservation research and findings.",
      icon: "📄",
    },
    {
      id: "blog",
      title: "Blog",
      count: 5,
      link: "/news-categories/blog",
      description:
        "Static documentation about our work and achievement regard nilgiri tahr project in detail",
      icon: "🖇️",
    },
  ];

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
      {/* Banner Section */}
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "40vh", // Reduced from 60vh to 40vh
          marginTop: "100px",
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Forest landscape"
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
            News & Updates
          </motion.h1>
        </div>
      </motion.div>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          padding: "40px 2rem 80px",
          background: "#ffffff",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {" "}
        {/* News Categories Slider */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "5rem",
          }}
        >
          <div className={styles.swiperContainer}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-categories",
                prevEl: ".swiper-button-prev-categories",
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={newsCategories.length > 3}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              style={{
                padding: "2rem",
                background: "rgba(0, 0, 0, 0.02)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
              }}
            >
              {newsCategories.map((category, index) => (
                <SwiperSlide key={category.id}>
                  <Link href={category.link}>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onMouseEnter={() => setHoveredCard(category.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "16px",
                        padding: "2rem",
                        textAlign: "center",
                        boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        height: "360px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "4rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {category.icon}
                      </div>

                      <div>
                        <h4
                          style={{
                            fontSize: "1.4rem",
                            fontWeight: "700",
                            color: "#1b4332",
                            margin: "0 0 0.5rem 0",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {category.title}
                        </h4>

                        <div
                          style={{
                            fontSize: "2rem",
                            fontWeight: "900",
                            color: "#52b788",
                            margin: "0.5rem 0 1rem 0",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {category.count}
                        </div>

                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#666666",
                            lineHeight: "1.6",
                            margin: "0",
                            fontFamily: "Inter, sans-serif",
                            opacity: 0.9,
                          }}
                        >
                          {category.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {newsCategories.length > 3 && (
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
      </motion.section>
    </>
  );
}
