"use client";

import { motion } from "framer-motion";
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
        ease: "easeOut",
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
        "Oru mission is to champion the conservation and protection of Nilgiri tahr, an iconic species endemic to the Western Ghats of Tamil Nadu.",
    },
  ];

  const victories = [
    {
      id: "survey-2024",
      title: "Survey 2024",
      icon: "📊",
      content: "Comprehensive population survey conducted across all Nilgiri Tahr habitats, documenting current distribution patterns and population dynamics to inform conservation strategies.",
    },
    {
      id: "radio-collaring",
      title: "Radio Collaring",
      icon: "📡",
      content: "Advanced radio collaring program to track individual animals, understand movement patterns, and monitor behavior for effective habitat management and protection.",
    },
    {
      id: "survey-2025",
      title: "Survey 2025",
      icon: "🔬",
      content: "Planned extensive field survey using cutting-edge technology and community participation to assess conservation progress and plan future protection measures.",
    },
  ];

  const ourWork = [
    {
      id: "habitat-restoration",
      title: "Survey",
      icon: "📋",
      content: "Coordinated, synchronized surveys would help in delineating the actual distributional areas, current population, evaluating conservation challenges and getting an effective population enumeration.",
    },
    {
      id: "community-engagement",
      title: "Radio Collaring",
      icon: "📡",
      content: "Radio collaring helps to understand the animal movement pattern, habitat use, home range and behaviour of the collared individuals across the divisions.",
    },
    {
      id: "research-monitoring",
      title: "Reintroduction",
      icon: "🦌",
      content: "Reintroduced populations would be extensively monitored to understand the adaptation and challenges in the process.",
    },
    {
      id: "policy-advocacy",
      title: "Grassland Restoration",
      icon: "🌱",
      content: "Grassland restoration work involving removal of invasive species and planting of native Grass species in Nilgiri Tahr habitats which lead to substantial improvements in the hydrology of the region.",
    },
     {
      id: "policy-advocacy1",
      title: "Eco Tourism",
      icon: "🏔️",
      content: "These eco-tourism centres will enable the students and public to understand the conservation significance and ecological importance of the endemic mammal, Nilgiri tahr.",
    },
     {
      id: "policy-advocacy2",
      title: "Communication & Outreach",
      icon: "📢",
      content: "Outreach programmes shall be organized to exhibit the conservation value of this species at educational institutions, media and among citizens hence leading to the successful community based conservation of Nilgiri Tahr.",
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        padding: "clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Mission and Vision Section */}
        <motion.div
          variants={sectionVariants}
          style={{
            textAlign: "center",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "700",
              color: "#1b4332",
              marginBottom: "1rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            What Drives Us
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "#52b788",
              margin: "0 auto 2rem auto",
              borderRadius: "2px",
            }}
          ></div>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#6b7280",
              fontFamily: "Poppins, sans-serif",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            Our commitment to conservation is built on clear vision, dedicated
            mission, and proven achievements.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(2rem, 4vw, 3rem)",
            marginBottom: "clamp(5rem, 8vw, 7rem)",
          }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={sectionVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "clamp(2rem, 4vw, 2.5rem)",
                textAlign: "center",
                transition: "all 0.3s ease",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = "#52b788";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3rem)",
                  marginBottom: "1.5rem",
                }}
              >
                {section.icon}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                  fontWeight: "600",
                  color: "#1b4332",
                  marginBottom: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {section.title}
              </h3>

              <p
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  lineHeight: "1.7",
                  color: "#6b7280",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  margin: "0",
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
            marginBottom: "clamp(3rem, 6vw, 4rem)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "700",
              color: "#1b4332",
              marginBottom: "1rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Our Victories
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "#52b788",
              margin: "0 auto 2rem auto",
              borderRadius: "2px",
            }}
          ></div>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#6b7280",
              fontFamily: "Poppins, sans-serif",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            Key milestones and ongoing initiatives in our conservation efforts.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {victories.map((victory, index) => (
            <motion.div
              key={victory.id}
              variants={sectionVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "clamp(2rem, 4vw, 2.5rem)",
                textAlign: "center",
                transition: "all 0.3s ease",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = "#52b788";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3rem)",
                  marginBottom: "1.5rem",
                }}
              >
                {victory.icon}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                  fontWeight: "600",
                  color: "#1b4332",
                  marginBottom: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {victory.title}
              </h3>

              <p
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  lineHeight: "1.7",
                  color: "#6b7280",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  margin: "0",
                }}
              >
                {victory.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Our Work Section */}
        <motion.div
          variants={sectionVariants}
          style={{
            textAlign: "center",
            marginTop: "clamp(5rem, 8vw, 7rem)",
            marginBottom: "clamp(3rem, 6vw, 4rem)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "700",
              color: "#1b4332",
              marginBottom: "1rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Our Work
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "#52b788",
              margin: "0 auto 2rem auto",
              borderRadius: "2px",
            }}
          ></div>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#6b7280",
              fontFamily: "Poppins, sans-serif",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            Through comprehensive conservation programs, we address multiple aspects of Nilgiri Tahr protection, from habitat restoration to community involvement, ensuring a holistic approach to wildlife conservation.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {ourWork.map((work, index) => (
            <motion.div
              key={work.id}
              variants={sectionVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "clamp(1.5rem, 3vw, 2rem)",
                textAlign: "center",
                transition: "all 0.3s ease",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = "#52b788";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.5rem)",
                  marginBottom: "1rem",
                }}
              >
                {work.icon}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: "600",
                  color: "#1b4332",
                  marginBottom: "1rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {work.title}
              </h3>

              <p
                style={{
                  fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
                  lineHeight: "1.6",
                  color: "#6b7280",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  margin: "0",
                }}
              >
                {work.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
