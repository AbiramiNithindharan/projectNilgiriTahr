"use client";

import React from "react";
import Image from "next/image";
import styles from "./wildlife-sanctuaries.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";
import { motion } from "framer-motion";
const WildlifeSanctuariesClient = () => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "60vh",
          marginTop: "100px",
        }}
      >
        <motion.img
          src="/gallery/wildlife-sanctuaries.JPG"
          alt="wildlife sanctuaries"
          className={styles.bannerImage}
          initial={{ scale: 1.1, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.3,
          }}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, rgba(67, 56, 27, 0.77), rgba(183, 149, 82, 0.49))",
            zIndex: 5,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10,
            color: "white",
          }}
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: "800",
              margin: "0",
              fontFamily: "Poppins, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Wildlife Sanctuaries
          </motion.h1>
        </div>
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        style={{
          padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 3rem)",
          background: "linear-gradient(135deg, #fffcf8 0%, #f5ede8 100%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "clamp(1rem, 6vw, 2rem)",
              fontWeight: "500",
              margin: "0",
              color: "#5f3e0e",
              fontFamily: "Poppins, sans-serif",
              textShadow: "1px 1px 2.5px rgba(114, 99, 68, 0.7)",
              marginBottom: "20px",
            }}
          >
            Wildlife Sanctuaries (6)
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
              lineHeight: "1.8",
              color: "#502c16",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              marginBottom: "3rem",
            }}
          >
            Wildlife sanctuaries act as <strong>buffer areas</strong> around
            core habitats, providing connectivity and space for species to move
            between protected regions. The six key sanctuaries supporting
            Nilgiri Tahr populations are:
          </motion.p>

          <ul className={styles.list}>
            {[
              {
                title: "Kodaikanal Wildlife Sanctuary",
                desc: "– Safeguards upper hill grasslands.",
              },
              {
                title: "Nellai Wildlife Sanctuary",
                desc: "– Recently confirmed as Tahr habitat during the 2025 synchronized survey.",
              },
              {
                title: "Kanyakumari Wildlife Sanctuary",
                desc: "– Southern limit of Nilgiri Tahr range.",
              },
              {
                title: "Mundanthurai Wildlife Sanctuary",
                desc: "– A part of KMTR landscape.",
              },
              {
                title: "Grizzled Squirrel Wildlife Sanctuary",
                desc: "– Provides ecological corridors to adjacent tiger reserves.",
              },
              {
                title: "Indira Gandhi Wildlife Sanctuary",
                desc: "– Supports both forest and grassland ecosystems for multiple species.",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                className={styles.listItem}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.15 }}
              >
                <div className={styles.card}>
                  <div className={styles.icon}>{index + 1}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
              lineHeight: "1.8",
              color: "#502c16",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              margin: "2rem",
            }}
          >
            These sanctuaries are critical for dispersal and maintaining genetic
            diversity within the Nilgiri Tahr population.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default WildlifeSanctuariesClient;
