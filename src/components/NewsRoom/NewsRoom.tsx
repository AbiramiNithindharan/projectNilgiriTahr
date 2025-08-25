"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "./NewsRoom.module.css";

export default function NewsRoom() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const newsCategories = [
    {
      id: "press-release",
      title: "Press Release",
      count: 12,
      description: "Official announcements and updates about Project Nilgiri Tahr conservation efforts and research findings.",
      icon: "📰"
    },
    {
      id: "annual-reports",
      title: "Annual Reports", 
      count: 5,
      description: "Comprehensive yearly reports documenting conservation progress, research outcomes, and project achievements.",
      icon: "📊"
    },
    {
      id: "magazines",
      title: "Magazines",
      count: 18,
      description: "Featured articles and stories about Nilgiri Tahr conservation in various wildlife and nature magazines.",
      icon: "📖"
    },
    {
      id: "newsletters",
      title: "Newsletters", 
      count: 8,
      description: "Regular updates and insights from our conservation work in the Western Ghats ecosystem.",
      icon: "📧"
    },
    {
      id: "in-the-news",
      title: "In The News",
      count: 24,
      description: "Media coverage and news articles featuring our Nilgiri Tahr conservation initiatives.",
      icon: "📺"
    },
    {
      id: "article-publication",
      title: "Article Publication",
      count: 16,
      description: "Scientific papers and research publications documenting our conservation research and findings.",
      icon: "📄"
    }
  ];

  const recentNews = [
    {
      id: "news-1",
      title: "New Nilgiri Tahr Population Survey Reveals Promising Results",
      date: "December 15, 2024",
      category: "Press Release",
      excerpt: "Latest comprehensive survey shows stable population growth in key conservation areas across the Western Ghats.",
      image: "/banners/DJI_0036.jpg",
      readTime: "3 min read"
    },
    {
      id: "news-2", 
      title: "Community Conservation Programs Show Remarkable Success",
      date: "December 10, 2024",
      category: "In The News",
      excerpt: "Local communities play crucial role in habitat restoration and Nilgiri Tahr protection efforts.",
      image: "/banners/DJI_0036.jpg",
      readTime: "5 min read"
    },
    {
      id: "news-3",
      title: "Research Publication: Habitat Preferences of Nilgiri Tahr",
      date: "December 5, 2024", 
      category: "Article Publication",
      excerpt: "New research reveals critical habitat requirements for sustainable Nilgiri Tahr conservation.",
      image: "/banners/DJI_0036.jpg",
      readTime: "8 min read"
    }
  ];

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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        padding: "120px 2rem 80px",
        background: "#ffffff",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
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
            padding: "2rem 0",
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
            }}
          >
            08
          </div>

          {/* Main Heading */}
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "900",
              lineHeight: "1.1",
              margin: "0 0 2rem 0",
              color: "#000000",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            News Room — stay updated with the latest conservation news, research findings, and community initiatives.
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
            Get the latest updates on our conservation work, research publications, media coverage, and community engagement initiatives protecting the Nilgiri Tahr.
          </p>

          {/* View All Button */}
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
            VIEW ALL NEWS
          </motion.button>
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
              fontSize: "clamp(6rem, 15vw, 12rem)",
              fontWeight: "900",
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
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: "8rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#52b788",
              marginBottom: "1rem",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            09
          </div>
          <h3
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "900",
              margin: "0 0 2rem 0",
              color: "#000000",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Categories
          </h3>
        </div>

        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-categories',
              prevEl: '.swiper-button-prev-categories',
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
                    height: "320px",
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          {newsCategories.length > 4 && (
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
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                  e.currentTarget.style.color = "#1b4332";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
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
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                  e.currentTarget.style.color = "#1b4332";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Recent News Section */}
      <motion.div
        variants={itemVariants}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "600", 
              color: "#52b788",
              marginBottom: "1rem",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            10
          </div>
          <h3
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "900",
              margin: "0 0 2rem 0",
              color: "#000000",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Recent News
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          {recentNews.map((news) => (
            <motion.article
              key={news.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
            >
              {/* News Image */}
              <div
                style={{
                  height: "200px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "#52b788",
                    color: "#ffffff",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {news.category}
                </div>
              </div>

              {/* News Content */}
              <div
                style={{
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                    fontSize: "0.9rem",
                    color: "#666666",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <span>{news.date}</span>
                  <span>{news.readTime}</span>
                </div>

                <h4
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#1b4332",
                    margin: "0 0 1rem 0",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.3",
                  }}
                >
                  {news.title}
                </h4>

                <p
                  style={{
                    fontSize: "1rem",
                    color: "#666666",
                    lineHeight: "1.6",
                    margin: "0 0 1.5rem 0",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {news.excerpt}
                </p>

                <button
                  style={{
                    background: "transparent",
                    border: "1px solid #52b788",
                    color: "#52b788",
                    padding: "0.8rem 1.5rem",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#52b788";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#52b788";
                  }}
                >
                  READ MORE
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}