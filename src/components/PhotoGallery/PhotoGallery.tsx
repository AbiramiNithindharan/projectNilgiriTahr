"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { AtomCategories } from "./components/AtomCategories";
import styles from "./PhotoGallery.module.css";

import Link from "next/link";

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

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

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        padding: "120px 2rem 80px",
        background: " #201d1ae6",
        minHeight: "100vh",
        position: "relative",
        color: "#ffffff",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 8vw, 8rem)",
            alignItems: "center",
            marginBottom: "8rem",
          }}
        >
          {/* Left Side - Content */}
          <div
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
              10
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
              Tahr Image Bank — a comprehensive library of free-to-use resources
              created for conservation education.
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                margin: "0 0 2rem 0",
                color: "#e0e6ed",
                fontFamily: "Inter, sans-serif",
                fontWeight: "400",
              }}
            >
              Explore our extensive collection of high-quality images
              documenting Nilgiri Tahr, their habitat, and conservation efforts
              across the Western Ghats.
            </p>

            {/* View All Button */}
            <Link href={"/photo-gallery"}>
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
                BROWSE GALLERY
              </motion.button>
            </Link>
          </div>

          {/* Right Side - Large "IMAGE" text */}
          <div
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
                fontSize: "clamp(6rem, 15vw, 12rem)",
                fontWeight: "900",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
                opacity: 0.05,
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
              }}
            >
              IMAGE
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "6rem",
            }}
          >
            <AtomCategories onSelect={(id) => setSelectedCategory(id)} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
