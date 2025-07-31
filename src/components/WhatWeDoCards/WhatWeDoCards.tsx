"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./WhatWeDoCards.module.css";
import { easeOut } from "framer-motion";

export default function WhatWeDoCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
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
        ease: easeOut,
      },
    },
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e5e7eb",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                height: "400px",
              }}
            >
              {/* Image Section */}
              <div
                style={{
                  position: "relative",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    transform:
                      hoveredCard === index ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))",
                  }}
                />
              </div>

              {/* Content Section */}
              <div
                style={{
                  padding: "clamp(1.25rem, 2.5vw, 1.5rem)",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 2.2vw, 1.25rem)",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: "0 0 1rem 0",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {card.title}
                </h3>

                {/* Description overlay on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredCard === index ? 1 : 0,
                    y: hoveredCard === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: "clamp(1.25rem, 2.5vw, 1.5rem)",
                    right: "clamp(1.25rem, 2.5vw, 1.5rem)",
                    bottom: "clamp(1.25rem, 2.5vw, 1.5rem)",
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    padding: "1rem",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                      lineHeight: "1.6",
                      color: "#374151",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "400",
                      margin: "0",
                      textAlign: "center",
                    }}
                  >
                    {card.description}
                  </p>
                </motion.div>

                {/* Default state content */}
                <div
                  style={{
                    opacity: hoveredCard === index ? 0 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                      lineHeight: "1.6",
                      color: "#6b7280",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "400",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Hover to learn more.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
