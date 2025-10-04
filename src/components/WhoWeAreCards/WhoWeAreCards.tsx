"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./WhoWeAreCards.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function WhoWeAreCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cards = [
    {
      id: "1",
      icon: "🎖️",
      title: "Board Members",
      description:
        "Our board comprises distinguished wildlife conservationists, forest officials, and environmental scientists who provide strategic guidance for Nilgiri Tahr conservation initiatives and policy development.",
      sectionId: "board-members",
    },
    {
      id: "2",
      icon: "🔍",
      title: "Research Team",
      description:
        "A dedicated team of wildlife biologists, ecologists, and field researchers conducting cutting-edge studies on Nilgiri Tahr behavior, population dynamics, and habitat requirements for evidence-based conservation.",
      sectionId: "research-team",
    },
    {
      id: "3",
      icon: "🔬",
      title: "Scientific Committee",
      description:
        "Leading experts in wildlife conservation, veterinary science, and ecosystem management who review research findings and develop scientific protocols for Nilgiri Tahr protection and habitat restoration.",
      sectionId: "scientific-committee",
    },
    {
      id: "4",
      icon: "🤝",
      title: "Our Partners",
      description:
        "Collaborative network including Tamil Nadu Forest Department, local communities, international conservation organizations, and academic institutions working together for Nilgiri Tahr conservation success.",
      sectionId: "our-partners",
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut", // use a valid string easing from Framer Motion
      } as const,
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      style={{
        padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)",
        background: "#ffffff",
        minHeight: "80vh",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Our Team Heading */}
        <motion.div
          variants={cardVariants}
          style={{
            textAlign: "center",
            marginBottom: "clamp(3rem, 6vw, 4rem)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "700",
              color: "#1b4332",
              margin: "0 0 1rem 0",
              fontFamily: "Poppins, sans-serif",
              background: "linear-gradient(135deg, #1b4332, #2d5016, #52b788)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Team
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              color: "#6b7280",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Meet the dedicated professionals committed to protecting and
            conserving the endangered Nilgiri Tahr
          </p>
        </motion.div>

        <div className={styles.swiperContainer}>
          {/* Custom Navigation Buttons */}
          {cards.length > 3 && (
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
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={cards.length > 3}
            grabCursor={true} // 👈 shows hand cursor + allows drag swipe
            touchRatio={1.2}
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
            navigation={{
              nextEl: ".swiper-button-next-categories",
              prevEl: ".swiper-button-prev-categories",
            }}
            onBeforeInit={(swiper) => {
              const navigation = swiper.params.navigation as any;
              navigation.prevEl = ".swiper-button-prev-categories";
              navigation.nextEl = ".swiper-button-next-categories";
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={card.id}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => scrollToSection(card.sectionId)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "clamp(1rem, 2vw, 2rem)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    textAlign: "center",
                    height: "350px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(1rem, 3vw, 1.5rem)",
                      fontWeight: "600",
                      color: "#1b4332",
                      margin: "0 0 clamp(0.5rem, 1vw, 1rem) 0",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: "1.2",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "clamp(0.75rem, 2vw, 1rem)",
                      lineHeight: "1.4",
                      color: "#6b7280",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "400",
                      margin: "0",
                      display: "-webkit-box",
                      WebkitLineClamp: 6, // Limit to 3 lines on mobile
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {card.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
}
