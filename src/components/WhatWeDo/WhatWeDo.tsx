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
    </section>
  );
}
