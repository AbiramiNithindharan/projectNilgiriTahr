"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./WhatWeDo.module.css";
import Link from "next/link";

interface WorkCard {
  title: string;
  description: string;
  sectionId: string;
  image: string;
}

export default function WhatWeDo() {
  const cards: WorkCard[] = [
    {
      title: "Conservation Research",
      description:
        "Project Nilgiri Tahr conducts comprehensive scientific research to understand the behavior, ecology, and habitat requirements of this endangered species, providing crucial data for effective conservation strategies.",
      sectionId: "conservation-research",
      image: "/images/conservation-research.jpg",
    },
    {
      title: "Habitat Restoration",
      description:
        "Through Project Nilgiri Tahr initiatives, we restore degraded grasslands and forest corridors, removing invasive species and replanting native vegetation to create sustainable habitats for the Nilgiri Tahr population.",
      sectionId: "habitat-restoration",
      image: "/images/habitat-restoration.jpg",
    },
    {
      title: "Community Engagement",
      description:
        "Project Nilgiri Tahr works closely with local tribal communities and stakeholders, fostering conservation awareness and developing sustainable livelihood programs that benefit both people and wildlife.",
      sectionId: "community-engagement",
      image: "/images/community-engagement.jpg",
    },
    {
      title: "Monitoring & Protection",
      description:
        "Our Project Nilgiri Tahr team implements advanced monitoring techniques including radio collaring and camera trapping to track population dynamics and ensure the safety of these magnificent mountain goats.",
      sectionId: "monitoring-protection",
      image: "/images/monitoring-protection.jpg",
    },
    {
      title: "Research & Documentation",
      description:
        "Systematic documentation of Nilgiri Tahr populations, breeding patterns, and environmental factors affecting their survival through advanced research methodologies and scientific studies.",
      sectionId: "research-documentation",
      image: "/images/research-documentation.jpg",
    },
    {
      title: "Policy & Advocacy",
      description:
        "Working with government agencies and conservation organizations to develop and implement effective policies for Nilgiri Tahr protection and Western Ghats ecosystem conservation.",
      sectionId: "policy-advocacy",
      image: "/images/policy-advocacy.jpg",
    },
    {
      title: "BIENNIAL SYNCHRONISED SURVEY",
      description:
        "Coordinated, synchronized surveys would help in delineating the actual distributional areas, current population, evaluating conservation challenges and getting an effective population enumeration.",
      sectionId: "biennial-synchronized-survey",
      image: "/images/conservation-research.jpg",
    },
    {
      title: "TRANQUILIZATION AND COLLARING",
      description:
        "Radio collaring helps to understand the animal movement pattern, habitat use, home range and behaviour of the collared individuals across the divisions.",
      sectionId: "tranquilization-and-collaring",
      image: "/images/conservation-research.jpg",
    },
    {
      title: "REINTRODUCTION AND MONITORING",
      description:
        "Reintroduced populations would be extensively monitored to understand the adaptation and challenges in the process.",
      sectionId: "reintroduction-and-monitoring",
      image: "/images/conservation-research.jpg",
    },
    {
      title: "DIAGNOSIS AND TREATMENT",
      description:
        "Based on the pathological analysis and diagnostics for abnormal swellings, suggested preventive measures, treatment plans could be adopted for the affected animals across various divisions",
      sectionId: "diagnosis-and-treatment",
      image: "/images/conservation-research.jpg",
    },
    {
      title: "SHOLA GRASSLAND RESTORATION PILOT ",
      description:
        "Grassland restoration work involving removal of invasive species and planting of native Grass species in Nilgiri Tahr habitats which lead to substantial improvements in the hydrology of the region.",
      sectionId: "shola-grassland-restoration-pilot",
      image: "/images/conservation-research.jpg",
    },
    {
      title: "IMPLEMENTATION OF ECO-TOURISM PROGRAMMES",
      description:
        "These eco-tourism centres will enable the students and public to understand the conservation significance and ecological importance of the endemic mammal, Nilgiri tahr.",
      sectionId: "implementation-of-eco-tourism-programmes",
      image: "/images/conservation-research.jpg",
    },
    {
      title: "COMMUNICATION AND OUTREACH",
      description:
        "Outreach programmes shall be organized to exhibit the conservation value of this species at educational institutions, media and among citizens hence leading to the successful community-based conservation of Nilgiri Tahr.",
      sectionId: "communication-and-outreach",
      image: "/images/conservation-research.jpg",
    },
  ];

  return (
    <section
      id="what-we-do"
      style={{
        padding: "120px 2rem 80px",
        background: "#000000",
        minHeight: "100vh",
        position: "relative",
        color: "#ffffff",
      }}
    >
      {/* Background Image */}
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
        <Image
          src="/banners/DJI_0036.jpg"
          alt="Nilgiri Tahr habitat"
          fill
          style={{
            objectFit: "cover",
            opacity: 0.3,
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 8vw, 8rem)",
          alignItems: "center",
        }}
      >
        {/* Left Side - Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
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
            05
          </div>

          {/* Main Heading */}
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "900",
              lineHeight: "1.1",
              margin: "0 0 2rem 0",
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            What We Do — comprehensive conservation efforts through research,
            habitat restoration, and community engagement.
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "1.1rem",
              textAlign: "justify",
              lineHeight: "1.8",
              margin: "0 0 2rem 0",
              color: "#e0e6ed",
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
            }}
          >
            Our work encompasses scientific research, habitat restoration,
            community engagement, and policy advocacy to ensure the survival and
            thriving of Nilgiri Tahr populations in the Western Ghats.
          </p>

          {/* Learn More Button */}
          <Link href="/what-we-do">
            <motion.button
              whileHover={{ scale: 1.02 }}
              style={{
                background: "transparent",
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
              EXPLORE OUR WORK
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Side - Large "CONSERVATION" text */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
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
              fontSize: "clamp(3rem, 12vw, 8rem)",
              fontWeight: "700",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              opacity: 0.15,
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
            }}
          >
            CONSERVATION
          </div>
        </motion.div>
      </div>

      {/* Work Cards Section */}
      {/* <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "8rem",
          maxWidth: "1400px",
          margin: "8rem auto 0",
        }}
      > */}
      {/* Section Header */}
      {/*  <div
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
            06
          </div>
          <h3
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "900",
              margin: "0 0 2rem 0",
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Our Work
          </h3>
        </div>
 */}
      {/* Work Cards Slider */}
      {/* <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={styles.swiperContainer}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-work",
              prevEl: ".swiper-button-prev-work",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-work",
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={cards.length > 3}
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
            }}
            style={{
              padding: "2rem",
              background: "rgba(27, 67, 50, 0.03)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              border: "1px solid rgba(27, 67, 50, 0.1)",
              position: "relative",
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    height: "420px", // Fixed height for all cards
                    display: "flex",
                    flexDirection: "column",
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 16px 48px rgba(27, 67, 50, 0.12)",
                    transition: { duration: 0.2 },
                  }}
                > */}
      {/* Card Image */}
      {/* <div
                    style={{
                      height: "200px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "16px 16px 0 0",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #e8f5f0, #a8dab5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "4rem",
                        color: "#1b4332",
                        fontWeight: "bold",
                        position: "relative",
                      }}
                    > */}
      {/* Placeholder icon based on card type */}
      {/*  {card.title.includes("Research") && "🔬"}
                      {card.title.includes("Habitat") && "🌱"}
                      {card.title.includes("Community") && "🤝"}
                      {card.title.includes("COMMUNICATION") && "🤝"}
                      {card.title.includes("Monitoring") && "📊"}
                      {card.title.includes("MONITORING") && "📊"}
                      {card.title.includes("SURVEY") && "📊"}
                      {card.title.includes("Documentation") && "📋"}
                      {card.title.includes("Policy") && "📜"}
                      {card.title.includes("COLLARING") && "🦌"}
                      {card.title.includes("TREATMENT") && "🏥"}
                      {card.title.includes("GRASSLAND") && "🌱"}
                      {card.title.includes("ECO-TOURISM") && "📈"} */}

      {/* Overlay for image placeholder */}
      {/*  <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(45deg, rgba(27, 67, 50, 0.1), rgba(82, 183, 136, 0.1))",
                        }}
                      />
                    </div>
                  </div> */}

      {/* Card Content */}
      {/*  <div
                    style={{
                      padding: "1.5rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  > */}
      {/* Title */}
      {/* <div>
                      <h3
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "700",
                          margin: "0 0 1rem 0",
                          color: "#1b4332",
                          fontFamily: "Poppins, sans-serif",
                          lineHeight: "1.3",
                          minHeight: "2.6rem",
                        }}
                      >
                        {card.title}
                      </h3>
                    </div> */}

      {/* Description */}
      {/*  <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#2d5016",
                          lineHeight: "1.5",
                          margin: "0",
                          fontFamily: "Poppins, sans-serif",
                          opacity: 0.9,
                          display: "-webkit-box",
                          WebkitLineClamp: 5, // Limit to 5 lines
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {card.description}
                      </p>
                    </div>
 */}
      {/* Learn More Button */}
      {/* <div style={{ marginTop: "1rem" }}>
                      <button
                        style={{
                          background: "transparent",
                          color: "#52b788",
                          border: "2px solid #52b788",
                          borderRadius: "8px",
                          padding: "0.5rem 1rem",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          fontFamily: "Poppins, sans-serif",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
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
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
 */}
      {/* Custom Navigation Buttons */}
      {/* {cards.length > 3 && (
            <>
              <button
                className="swiper-button-prev-work"
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
                className="swiper-button-next-work"
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
 */}
      {/* Custom Pagination */}
      {/*  <div
            className="swiper-pagination-work"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.8rem",
              marginTop: "2rem",
            }}
          />
        </motion.div> */}
      {/*  </motion.div> */}
    </section>
  );
}
