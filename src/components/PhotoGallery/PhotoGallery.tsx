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

  const categories = [
    { id: "all", label: "All", count: 1247 },
    { id: "nilgiri-tahr", label: "Nilgiri Tahr", count: 432 },
    { id: "aerial", label: "Aerial", count: 156 },
    { id: "landscape", label: "Landscape", count: 289 },
    { id: "associate-flora", label: "Associate Flora", count: 198 },
    { id: "fauna", label: "Fauna", count: 172 },
    { id: "exhibition", label: "Exhibition", count: 98 },
  ];

  const galleryImages = [
    {
      id: "img-1",
      src: "/banners/DJI_0036.jpg",
      alt: "Nilgiri Tahr in natural habitat",
      category: "nilgiri-tahr",
      title: "Nilgiri Tahr Adult",
      description:
        "Adult Nilgiri Tahr grazing in the high-altitude grasslands of the Western Ghats",
    },
    {
      id: "img-2",
      src: "/banners/DJI_0036.jpg",
      alt: "Western Ghats landscape",
      category: "landscape",
      title: "Western Ghats Vista",
      description: "Panoramic view of the Western Ghats mountain range",
    },
    {
      id: "img-3",
      src: "/banners/DJI_0036.jpg",
      alt: "Aerial view of Tahr habitat",
      category: "aerial",
      title: "Habitat Overview",
      description: "Aerial perspective of Nilgiri Tahr conservation areas",
    },
    {
      id: "img-4",
      src: "/banners/DJI_0036.jpg",
      alt: "Associate flora of Western Ghats",
      category: "associate-flora",
      title: "Endemic Flora",
      description: "Unique plant species in Nilgiri Tahr habitat ecosystem",
    },
    {
      id: "img-5",
      src: "/banners/DJI_0036.jpg",
      alt: "Fauna species",
      category: "fauna",
      title: "Wildlife Diversity",
      description: "Other fauna species sharing the Nilgiri Tahr habitat",
    },
    {
      id: "img-6",
      src: "/banners/DJI_0036.jpg",
      alt: "Exhibition display",
      category: "exhibition",
      title: "Conservation Exhibition",
      description:
        "Educational exhibition showcasing Nilgiri Tahr conservation efforts",
    },
    {
      id: "img-7",
      src: "/banners/DJI_0036.jpg",
      alt: "Community",
      category: "exhibition",
      title: "Community",
      description:
        "Powerful community showcasing Nilgiri Tahr conservation efforts",
    },
    {
      id: "img-8",
      src: "/banners/DJI_0036.jpg",
      alt: "Exhibition display",
      category: "exhibition",
      title: "Outreach",
      description: "Outreach showcasing Nilgiri Tahr conservation efforts",
    },
    {
      id: "img-9",
      src: "/banners/DJI_0036.jpg",
      alt: "technologies",
      category: "fauna",
      title: "Technologies",
      description: "Growing Tech showcasing Nilgiri Tahr conservation efforts",
    },
    {
      id: "img-10",
      src: "/banners/DJI_0036.jpg",
      alt: "pioneer",
      category: "aerial",
      title: "Pioneers",
      description: "pioneer supporting Nilgiri Tahr conservation to grow",
    },
    {
      id: "img-11",
      src: "/banners/DJI_0036.jpg",
      alt: "tamil-literature",
      category: "aerial",
      title: "Tamil Literature",
      description:
        "Tamil Literature that grows with conservation of Nilgiri tahr",
    },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

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
        background: "#000000",
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
