"use client";

import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./category-page.module.css";
import { client } from "@/lib/sanityClient";
import Link from "next/link";

interface Poster {
  _id: string;
  title: string;
  caption?: string;
  image?: { asset?: { url: string }; alt?: string };
  downloadableFile?: { asset?: { url: string; originalFilename: string } };
  publishedAt: string;
}

interface News {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  mainImage?: any;
}

interface Category {
  _id: string;
  title: string;
  bannerImage?: string;
}

export default function CategoryClient({
  category,
  news,
  slug,
  isPosterCategory,
}: {
  category: Category;
  news: any[];
  slug: string;
  isPosterCategory: boolean;
}) {
  const [_hoveredCard, setHoveredCard] = useState<string | null>(null);
  const builder = imageUrlBuilder(client);
  const urlFor = (source: any) => builder.image(source);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* Banner */}
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "45vh",
          marginTop: "100px",
        }}
      >
        <motion.img
          src="/gallery/nt-portrait/nilgiritahr-33.jpeg"
          alt={category.title}
          className={styles.bannerImage}
          initial={{ scale: 1.1, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(45deg, rgba(27, 67, 50, 0.6), rgba(82, 183, 136, 0.3))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "800",
              fontFamily: "Poppins, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            {category.title}
          </motion.h1>
        </div>
      </motion.div>

      {/* Main Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={styles.section}
      >
        {isPosterCategory ? (
          // 🎞 POSTER LAYOUT
          <motion.div
            variants={itemVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "2rem",
              padding: "2rem",
            }}
          >
            <div className={styles.swiperContainer}>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: ".poster-next",
                  prevEl: ".poster-prev",
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={news.length > 3}
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
                    slidesPerView: 3,
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
                {news.map((poster: Poster) => (
                  <SwiperSlide key={poster._id}>
                    <motion.div
                      key={poster._id}
                      style={{
                        background: "white",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px rgba(27,67,50,0.08)",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {poster.image?.asset?.url && (
                        <div className={styles.cardImage}>
                          <Image
                            src={poster.image.asset.url}
                            alt={poster.image.alt || poster.title}
                            fill
                            className={styles.image}
                          />
                        </div>
                      )}
                      <div style={{ padding: "1rem" }}>
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {poster.title}
                        </h3>
                        {poster.caption && (
                          <p
                            style={{
                              color: "#555",
                              fontSize: "0.95rem",
                              marginBottom: "0.8rem",
                            }}
                          >
                            {poster.caption}
                          </p>
                        )}
                        {poster.downloadableFile?.asset?.url && (
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "center",
                            }}
                          >
                            <a
                              href={poster.downloadableFile.asset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: "#1b4332",
                                padding: "0.6rem 1rem",
                                borderRadius: "6px",
                                color: "white",
                                fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              View
                            </a>

                            <a
                              href={`/api/download?file=${encodeURIComponent(
                                poster.downloadableFile.asset.url,
                              )}`}
                              style={{
                                display: "inline-block",
                                background: "#40916C",
                                color: "#fff",
                                padding: "0.6rem 1.2rem",
                                borderRadius: "8px",
                                fontWeight: "600",
                                textDecoration: "none",
                              }}
                            >
                              Download
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Custom Navigation Buttons */}
              {news.length > 2 && (
                <>
                  <button
                    className="poster-prev"
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
                    className="poster-next"
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
        ) : (
          // 📰 NEWS LAYOUT
          <motion.div
            variants={itemVariants}
            className={styles.swiperContainer}
          >
            <div className={styles.swiperContainer}>
              <Swiper
                key={news.length}
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                navigation={{
                  nextEl: ".news-next",
                  prevEl: ".news-prev",
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={news.length > 2}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                style={{
                  padding: "2rem",
                  background: "rgba(0, 0, 0, 0.02)",
                  borderRadius: "20px",
                }}
              >
                {news.map((item: News) => (
                  <SwiperSlide key={item._id} className={styles.newsCard}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      style={{
                        background: "white",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px rgba(27,67,50,0.08)",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <div className={styles.cardImage}>
                        <Image
                          src={
                            item.mainImage?.asset?.url ||
                            "/banners/DJI_0036.jpg"
                          }
                          alt={item.title}
                          fill
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.cardContent}>
                        <p className={styles.date}>
                          {new Date(item.publishedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </p>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.subtitle}>{item.excerpt}</p>
                        <a
                          href={`/news-categories/${slug}/${item.slug.current}`}
                          className={styles.readMore}
                        >
                          Read Full Article →
                        </a>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              {news.length > 2 && (
                <>
                  <button
                    className="news-prev"
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
                    className="news-next"
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
        )}

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href={"/news-categories"}>
            <button
              style={{
                background: "transparent",
                border: "2px solid #000",
                color: "#000",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#000";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#000";
              }}
            >
              Back to News & Updates
            </button>
          </Link>
        </motion.div>
      </motion.section>
    </>
  );
}
