"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./protective-areas-admin-units.module.css";
import Image from "next/image";
import { administrativeAreas } from "@/data/administrativeAreas";
import Link from "next/link";

export default function WhereWeWork() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const cardVariants = {
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
          src="/gallery/nt-portrait/nilgiritahr-33.jpeg"
          alt="Tahr Habitat"
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
            Where we work
          </motion.h1>
        </div>
      </motion.div>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          padding: "70px 4rem 80px",
          background: "#ffffffff",
          minHeight: "100vh",
          position: "relative",
          color: "#000000ff",
        }}
      >
        {/* Protected Areas and Administrative Units Slider */}
        <motion.div
          variants={cardVariants}
          style={{
            marginBottom: "4rem",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: "700",
              margin: "0 0 1rem 0",
              color: "#3f3e3eff",
              fontFamily: "Poppins, sans-serif",
              textAlign: "center",
            }}
          >
            Protected Areas & Administrative Units
          </h3>

          <div className={styles.swiperContainer}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-areas",
                prevEl: ".swiper-button-prev-areas",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-areas",
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={administrativeAreas.length > 3}
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
                background: "rgba(27, 67, 50, 0.02)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(27, 67, 50, 0.1)",
                position: "relative",
              }}
            >
              {administrativeAreas.map((area, index) => (
                <SwiperSlide key={area.id}>
                  <Link href={area.link} passHref>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      style={{
                        background:
                          area.type === "protected"
                            ? "linear-gradient(135deg, rgba(82, 183, 136, 0.95), rgba(64, 145, 108, 0.9))"
                            : "rgba(255, 255, 255, 0.95)",
                        color:
                          area.type === "protected" ? "#ffffff" : "#1b4332",
                        borderRadius: "16px",

                        textAlign: "center",
                        boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                        border:
                          area.type === "protected"
                            ? "1px solid rgba(255, 255, 255, 0.2)"
                            : "1px solid rgba(27, 67, 50, 0.1)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        height: "380px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Image at the top */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "180px",
                          overflow: "hidden",
                          borderRadius: "16px 16px 0 0",
                        }}
                      >
                        <Image
                          src={area.image}
                          alt={area.title}
                          fill
                          className={styles.cardImage}
                        />
                      </div>

                      <h4
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "700",
                          paddingTop: "30px",
                          margin: "0 0 1rem 0",
                          fontFamily: "Poppins, sans-serif",
                          lineHeight: "1.3",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {area.title}
                      </h4>

                      <p
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: "1.5",
                          margin: "0 0 30px 0",
                          padding: "0 10px 0 10px",
                          fontFamily: "Poppins, sans-serif",
                          opacity: area.type === "protected" ? 0.95 : 0.8,
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {area.description}
                      </p>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {administrativeAreas.length > 4 && (
              <>
                <button
                  className="swiper-button-prev-areas"
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
                  className="swiper-button-next-areas"
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

            {/* Custom Pagination */}
            <div
              className="swiper-pagination-areas"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.8rem",
                marginTop: "2rem",
              }}
            />
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
