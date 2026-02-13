"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./WhereWeWork.module.css";
import Image from "next/image";
import { administrativeAreas } from "@/data/administrativeAreas";
import Link from "next/link";

export default function WhereWeWork() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const workAreas = [
    {
      id: "shola-grassland",
      title: "Shola Grassland",
      description:
        "High-altitude grassland ecosystems interspersed with stunted tropical montane forests, providing crucial habitat for Nilgiri Tahr.",
      icon: "/gallery/where-we-work/SholaGrassland.jpeg",
      details:
        "Critical grazing areas for Nilgiri Tahr herds in the upper elevations of the Western Ghats.",
    },
    {
      id: "montane-forest",
      title: "Montane Forest",
      description:
        "Tropical montane cloud forests that provide shelter and browse for Nilgiri Tahr during adverse weather conditions.",
      icon: "/gallery/where-we-work/MontaneForests.jpeg",
      details:
        "Dense forest areas offering protection and diverse vegetation for wildlife.",
    },
    {
      id: "evergreen-forest",
      title: "Evergreen Forest",
      description:
        "Dense evergreen forests in the lower elevations that form part of the Nilgiri Tahr's extended habitat range.",
      icon: "/gallery/where-we-work/evergreen.jpeg",
      details:
        "Rich biodiversity zones supporting the broader ecosystem of the Western Ghats.",
    },
  ];

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
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          padding: "120px 2rem 80px",
          background: "#f8f5f5ff",
          minHeight: "100vh",
          position: "relative",
          color: "#4e3825",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Header Section */}
          <motion.div
            variants={cardVariants}
            style={{
              textAlign: "center",
              marginBottom: "5rem",
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
              07
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "900",
                lineHeight: "1.1",
                margin: "0 0 2rem 0",
                color: "#000",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Where We Work — across diverse ecosystems and protected regions in
              the Western Ghats.
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#000",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.6",
                fontFamily: "Inter, sans-serif",
                fontWeight: "400",
              }}
            >
              Our conservation efforts span multiple ecosystems and
              administrative regions where Nilgiri Tahr populations thrive.
            </p>
          </motion.div>

          {/* Work Area Visuals */}
          <motion.div
            variants={itemVariants}
            style={{
              marginBottom: "6rem",
            }}
          >
            <div className={styles.swiperContainer}>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next-areas",
                  prevEl: ".swiper-button-prev-areas",
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={workAreas.length > 3}
                breakpoints={{
                  468: {
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
                  background: "#f5eade",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  position: "relative",
                }}
              >
                {workAreas.map((area) => (
                  <SwiperSlide key={area.id}>
                    <motion.div
                      key={area.id}
                      variants={cardVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onMouseEnter={() => setHoveredCard(area.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px #35261950",
                        border: "1px solid #352619",
                        cursor: "pointer",
                        height: "100%",
                        minHeight: "380px",
                        overflow: "hidden",
                        display: "grid",
                        gridTemplateRows: "50% 1fr",
                      }}
                    >
                      {/* Image Section */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          src={area.icon}
                          alt={area.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{
                            objectFit: "cover",
                          }}
                          priority={false}
                        />

                        {/* Dark overlay for title readability */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.55))",
                          }}
                        />

                        {/* Centered Title */}
                        <h4
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#ffffff",
                            fontSize: "1.6rem",
                            fontWeight: "700",
                            fontFamily: "Poppins, sans-serif",
                            margin: 0,
                            textAlign: "center",
                            padding: "0 1rem",
                            lineHeight: "1.2",
                            zIndex: 2,
                            textShadow: "0 4px 12px rgba(0,0,0,0.4)",
                          }}
                        >
                          {area.title}
                        </h4>
                      </div>
                      {/* Content Section */}
                      <div
                        style={{
                          padding: "1.5rem 1.75rem 2rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#92622f",
                            lineHeight: "1.6",
                            margin: 0,
                            fontFamily: "Poppins, sans-serif",
                            opacity: 0.9,
                            textAlign: "justify",
                          }}
                        >
                          {hoveredCard === area.id
                            ? area.details
                            : area.description}
                        </p>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              {workAreas.length > 2 && (
                <>
                  <button
                    className="swiper-button-prev-areas"
                    style={{
                      position: "absolute",
                      left: "-1.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(247, 235, 221, 0.95)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(116, 108, 76, 0.2)",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      color: "#5f452d",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: 10,
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#5f452d";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform =
                        "translateY(-50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(247, 235, 221, 0.95)";
                      e.currentTarget.style.color = "#5f452d";
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
                      background: "rgba(247, 235, 221, 0.95)",
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
                      color: "#5f452d",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: 10,
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#5f452d";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform =
                        "translateY(-50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(247, 235, 221, 0.95)";
                      e.currentTarget.style.color = "#5f452d";
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

          {/* Learn More Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/protective-areas-admin-units">
              <motion.button
                whileHover={{ scale: 1.02 }}
                style={{
                  background: "transparent",
                  border: "2px solid #4d3824",
                  color: "#352619",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginBottom: "4rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#352619";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#352619";
                }}
              >
                LEARN MORE
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
