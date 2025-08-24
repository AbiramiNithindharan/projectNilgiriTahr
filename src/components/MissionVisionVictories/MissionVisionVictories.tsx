"use client";

import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import styles from "./MissionVisionVictories.module.css";

export default function MissionVisionVictories() {
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const sections = [
    {
      id: "our-vision",
      title: "Our Vision",
      icon: "🦌",
      content:
        "Our vision is to be a hub for passionate individuals, conservationists, and communities united in their commitment to safeguarding the Nilgiri tahr and its unique ecosystem.",
    },
    {
      id: "our-mission",
      title: "Our Mission",
      icon: "🌿",
      content:
        "Our mission is to champion the conservation and protection of Nilgiri tahr, an iconic species endemic to the Western Ghats of Tamil Nadu.",
    },
  ];

  const victories = [
    {
      id: "survey-2024",
      title: "Survey 2024",
      icon: "📊",
      content:
        "Comprehensive population survey conducted across all Nilgiri Tahr habitats, documenting current distribution patterns and population dynamics to inform conservation strategies.",
    },
    {
      id: "radio-collaring",
      title: "Radio Collaring",
      icon: "📡",
      content:
        "Advanced radio collaring program to track individual animals, understand movement patterns, and monitor behavior for effective habitat management and protection.",
    },
    {
      id: "survey-2025",
      title: "Survey 2025",
      icon: "🔬",
      content:
        "Planned extensive field survey using cutting-edge technology and community participation to assess conservation progress and plan future protection measures.",
    },
  ];

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
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Mission and Vision Section */}
        <motion.div
          variants={sectionVariants}
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
            06
          </div>
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
            What Drives Us — our mission, vision, and victories in conservation.
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666666",
              fontFamily: "Inter, sans-serif",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            Our commitment to conservation is built on clear vision, dedicated
            mission, and proven achievements in protecting the Nilgiri Tahr.
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "2rem",
            marginBottom: "6rem",
          }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={sectionVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(15px)",
                borderRadius: "20px",
                padding: "3rem 2rem",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1.5rem",
                  filter:
                    "drop-shadow(0 4px 8px rgba(27, 67, 50, 0.2))",
                }}
              >
                {section.icon}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: "700",
                  color: "#1b4332",
                  marginBottom: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {section.title}
              </h3>

              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  lineHeight: "1.7",
                  color: "#2d5016",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  margin: "0",
                  opacity: 0.9,
                }}
              >
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Our Victories Section */}
        <motion.div
          variants={sectionVariants}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: "800",
              margin: "0 0 1rem 0",
              background:
                "linear-gradient(135deg, #081c15, #1b4332, #2d5016, #52b788)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.2",
            }}
          >
            Our Victories
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #52b788, #a8dab5)",
              margin: "0 auto 2rem",
              borderRadius: "2px",
            }}
          />
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
              color: "#2d5016",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
            }}
          >
            Key milestones and ongoing initiatives showcasing our conservation
            progress
            <br /> and commitment to protecting the Nilgiri Tahr.
          </p>
        </motion.div>

        {/* Victories Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {victories.map((victory, index) => (
            <motion.div
              key={victory.id}
              variants={sectionVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(15px)",
                borderRadius: "16px",
                padding: "2.5rem 2rem",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle background pattern */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  background:
                    "linear-gradient(45deg, rgba(82, 183, 136, 0.05), transparent)",
                  borderRadius: "0 16px 0 100px",
                }}
              />

              <div
                style={{
                  fontSize: "3.5rem",
                  marginBottom: "1.5rem",
                  filter:
                    "drop-shadow(0 4px 8px rgba(27, 67, 50, 0.2))",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {victory.icon}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
                  fontWeight: "700",
                  color: "#1b4332",
                  marginBottom: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {victory.title}
              </h3>

              <p
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  lineHeight: "1.6",
                  color: "#2d5016",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  margin: "0",
                  opacity: 0.9,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {victory.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

