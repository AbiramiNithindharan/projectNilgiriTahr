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
                height: "500px",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {/* Image Section */}
              <div
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
                >
                  {/* Placeholder icon based on card type */}
                  {card.title.includes("Research") && "🔬"}
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
                  {card.title.includes("ECO-TOURISM") && "📈"}

                  {/* Overlay for image placeholder */}
                  <div
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
                <div style={{ flex: 1 }}>
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
