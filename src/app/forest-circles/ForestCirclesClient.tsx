"use client";

import React from "react";
import styles from "./forest-circles.module.css";
import { motion } from "framer-motion";
import { administrativeAreas } from "@/data/administrativeAreas";
import Image from "next/image";
const ForestCirclesClient = () => {
  return (
    <>
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
            src="/gallery/forest-circles.JPG"
            alt="Nilgiri Tahr"
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
              Forest Circles
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                fontSize: "clamp(0.5rem, 6vw, 1.5rem)",
                fontWeight: "600",
                margin: "0",
                fontFamily: "Poppins, sans-serif",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              Key Forest Circles Managing Nilgiri Tahr Habitats:
            </motion.p>
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
              Forest Circles (5)
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
              Forest circles represent the highest level of administrative
              management in the state forest structure. Each circle oversees
              multiple forest divisions, ensuring coordination of conservation
              activities such as synchronized surveys, anti-poaching measures,
              and ecological restoration projects.
            </motion.p>

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
              Key Forest Circles Managing Nilgiri Tahr Habitats:
            </motion.h3>
            <ul className={styles.list}>
              {[
                {
                  title: "Mudumalai Tiger Reserve Circle (MTR)",
                  desc: "Protects northern Tahr populations in the Nilgiris region.",
                },
                {
                  title: "Anamalai Tiger Reserve Circle (ATR)",
                  desc: "Connects fragmented high-altitude grasslands across Coimbatore and Pollachi areas.",
                },
                {
                  title: "Srivilliputhur Megamalai Tiger Reserve Circle (SMTR)",
                  desc: "Oversees critical southern landscapes including Megamalai and Grizzled Squirrel habitats.",
                },
                {
                  title: "Dindigul Circle",
                  desc: "Encompasses Kodaikanal and associated hill ranges.",
                },
                {
                  title: "Kalakkad Mundanthurai Tiger Reserve Circle (KMTR)",
                  desc: "Focuses on the southernmost Tahr populations near Agasthyamalai.",
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
              These circles provide policy direction and coordinate resources
              across divisions, linking field operations with state-level
              planning.
            </motion.p>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default ForestCirclesClient;
