"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./WhoWeAreCards.module.css";

export default function WhoWeAreCards() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cards = [
    {
      title: "Board Members",
      description: "Our board comprises distinguished wildlife conservationists, forest officials, and environmental scientists who provide strategic guidance for Nilgiri Tahr conservation initiatives and policy development.",
      sectionId: "board-members",
    },
    {
      title: "Research Team",
      description: "A dedicated team of wildlife biologists, ecologists, and field researchers conducting cutting-edge studies on Nilgiri Tahr behavior, population dynamics, and habitat requirements for evidence-based conservation.",
      sectionId: "research-team",
    },
    {
      title: "Scientific Committee",
      description: "Leading experts in wildlife conservation, veterinary science, and ecosystem management who review research findings and develop scientific protocols for Nilgiri Tahr protection and habitat restoration.",
      sectionId: "scientific-committee",
    },
    {
      title: "Our Partners",
      description: "Collaborative network including Tamil Nadu Forest Department, local communities, international conservation organizations, and academic institutions working together for Nilgiri Tahr conservation success.",
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
        ease: "easeOut",
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
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
            Meet the dedicated professionals committed to protecting and conserving the endangered Nilgiri Tahr
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isClient && window.innerWidth >= 768 ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.2 }
              }}
              onClick={() => scrollToSection(card.sectionId)}
              style={{
                background: "#ffffff",
                borderRadius: "8px",
                padding: "clamp(1rem, 2vw, 2rem)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
                transition: "all 0.3s ease",
                cursor: "pointer",
                textAlign: "center",
                minHeight: "clamp(120px, 25vw, 200px)", // Reduced height for mobile
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.5rem)",
                  fontWeight: "600",
                  color: "#1f2937",
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
                  WebkitLineClamp: 3, // Limit to 3 lines on mobile
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}