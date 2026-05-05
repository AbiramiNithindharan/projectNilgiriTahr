"use client";

import React from "react";
import Image from "next/image";
import styles from "./tiger-reserves.module.css";
import { motion } from "framer-motion";
const TigerReservesClient = () => {
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
          src="/gallery/nt-portrait/nilgiritahr-28.jpeg"
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
            Tiger Reserves
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
            Tiger Reserves (3)
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
              textAlign: "justify",
            }}
          >
            Tiger Reserves provide the{" "}
            <strong>highest degree of protection</strong> under India’s Wildlife
            Protection Act, benefiting Nilgiri Tahr populations through strict
            habitat preservation and funding support. Three major tiger reserves
            overlap with Tahr habitats:
          </motion.p>
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "clamp(0.8rem, 6vw, 1.5rem)",
              fontWeight: "500",
              margin: "0",
              color: "#5f3e0e",
              fontFamily: "Poppins, sans-serif",
              textShadow: "1px 1px 2.5px rgba(114, 99, 68, 0.7)",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            {" "}
            1. Kalakkad Mundanthurai Tiger Reserve (KMTR)
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
              textAlign: "justify",
            }}
          >
            Located in the southernmost part of Tamil Nadu, KMTR encompasses a
            wide range of habitats, from tropical evergreen forests to
            high-altitude grasslands. It harbors genetically diverse populations
            of Nilgiri Tahr and provides essential connectivity to the
            Agasthyamalai Biosphere Reserve.
          </motion.p>
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "clamp(0.8rem, 6vw, 1.5rem)",
              fontWeight: "500",
              margin: "0",
              color: "#5f3e0e",
              fontFamily: "Poppins, sans-serif",
              textShadow: "1px 1px 2.5px rgba(114, 99, 68, 0.7)",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            {" "}
            2. Anamalai Tiger Reserve (ATR)
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
              textAlign: "justify",
            }}
          >
            Spread across Coimbatore and Pollachi, ATR is a critical landscape
            where montane grasslands meet tropical forests. Grass Hills within
            ATR are one of the most important strongholds for Nilgiri Tahr
            populations.
          </motion.p>
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "clamp(0.8rem, 6vw, 1.5rem)",
              fontWeight: "500",
              margin: "0",
              color: "#5f3e0e",
              fontFamily: "Poppins, sans-serif",
              textShadow: "1px 1px 2.5px rgba(114, 99, 68, 0.7)",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            {" "}
            3. Srivilliputhur Megamalai Tiger Reserve (SMTR)
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
              textAlign: "justify",
            }}
          >
            This newly designated reserve is vital for linking fragmented
            habitats, particularly in Meghamalai and Grizzled Squirrel Wildlife
            Sanctuary regions. It also provides corridors for other endangered
            species alongside Nilgiri Tahr.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default TigerReservesClient;
