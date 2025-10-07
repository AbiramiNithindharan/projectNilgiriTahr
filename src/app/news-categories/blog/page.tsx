"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import styles from "./blog.module.css";

export default function Blog() {
  const blogs = [
    {
      id: 1,
      image: "/banners/Banner_2.jpg",
      date: "October 2025",
      title: "Driving Innovation for a Sustainable Future",
      subtitle:
        "Discover how small innovations in local communities are creating a lasting positive impact.",
      link: "#",
    },
    {
      id: 2,
      image: "/banners/who-we-are.JPG",
      date: "September 2025",
      title: "Education that Transforms Lives",
      subtitle:
        "Our latest initiatives aim to make education more accessible, inclusive, and engaging for all.",
      link: "#",
    },
    {
      id: 3,
      image: "/gallery/ranges.jpg",
      date: "August 2025",
      title: "The Power of Green Energy",
      subtitle:
        "How renewable energy adoption is reshaping our approach to sustainability and development.",
      link: "#",
    },
    {
      id: 4,
      image: "/gallery/survey-2025.JPG",
      date: "July 2025",
      title: "Empowering Communities through Development",
      subtitle:
        "From small villages to towns, see how collective efforts lead to large-scale progress.",
      link: "#",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {/* Banner Section */}
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "40vh",
          marginTop: "100px",
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Blog Banner"
          className={styles.bannerImage}
          initial={{ scale: 1.1, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className={styles.bannerOverlay}
        />
        <div className={styles.bannerText}>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Blog
          </motion.h1>
        </div>
      </motion.div>

      {/* Blog Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={styles.section}
      >
        <motion.div variants={itemVariants} className={styles.swiperContainer}>
          <h2 className={styles.sectionTitle}>Latest Blog Posts</h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next-blog",
              prevEl: ".swiper-button-prev-blog",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={blogs.length > 3}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.blogSwiper}
          >
            {blogs.map((item) => (
              <SwiperSlide key={item.id} className={styles.blogCard}>
                <div className={styles.cardImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.date}>{item.date}</p>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.subtitle}>{item.subtitle}</p>
                  <a href={item.link} className={styles.readMore}>
                    Read More →
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          {blogs.length > 3 && (
            <>
              <button
                className="swiper-button-prev-blog"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.95)",
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
                  transition: "all 0.3s ease",
                  zIndex: 10,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#52b788";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform =
                    "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.95)";
                  e.currentTarget.style.color = "#1b4332";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ‹
              </button>
              <button
                className="swiper-button-next-blog"
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.95)",
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
                  transition: "all 0.3s ease",
                  zIndex: 10,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#52b788";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform =
                    "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.95)";
                  e.currentTarget.style.color = "#1b4332";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ›
              </button>
            </>
          )}
        </motion.div>
      </motion.section>
    </>
  );
}
