"use client";

import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import styles from "./MissionVisionVictories.module.css";
import Link from "next/link";
import Image from "next/image";

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
      icon: "/gallery/nt-portrait/nilgiritahr-19.jpg",
      content:
        "We envision a living sanctuary of collaboration, where people and nature come together in harmony. A place where conservationists, communities, and young minds unite to protect the Nilgiri Tahr — the mountain monarch of the Western Ghats — and the delicate tapestry of life it represents. Through shared wisdom and collective action, we aspire to see these misty highlands flourish, with thriving herds roaming free as symbols of resilience, hope, and balance. Our vision is a future, where protecting the Nilgiri Tahr becomes a legacy of care passed down through generations.",
    },
    {
      id: "our-mission",
      title: "Our Mission",
      icon: "/icon/mission.jpeg",
      content:
        "Our mission is to guard the Nilgiri Tahr, an ancient and enduring spirit of the mountains, with science as our guide and communities as our strength. We strive to heal the grasslands, restore lost habitats, and safeguard these wild beings from the threats of a changing world. By weaving together research, education, and local stewardship, we seek to create landscapes where wildlife and people coexist in harmony. In protecting the Nilgiri Tahr, we protect the heart of the Western Ghats — ensuring its mist-clad peaks continue to echo with life for centuries to come.",
    },
  ];

  return (
    <motion.section
      className={styles.section}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
            02
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: "900",
              lineHeight: "1.1",
              margin: "0 0 2rem 0",
              color: "#573f29",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            What Drives Us
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#b48a5c",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "rgba(82, 183, 136, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 16px rgba(27, 67, 50, 0.18)",
                  }}
                >
                  <Image
                    src={section.icon}
                    alt={section.title}
                    width={48}
                    height={48}
                    priority={index === 0}
                    style={{
                      borderRadius: "50%",
                      transform: "scale(1.25)",
                    }}
                  />
                </div>
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: "700",
                  color: "#573f29",
                  marginBottom: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {section.title}
              </h3>

              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  textAlign: "justify",
                  lineHeight: "1.7",
                  color: "#b48a5c",
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
      </div>
    </motion.section>
  );
}
