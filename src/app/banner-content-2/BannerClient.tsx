"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./banner-content-2.module.css";

const BannerClient = () => {
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
          src="/banners/Banner_2.jpg"
          alt="Nilgiri Tahr Initiative"
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
            objectPosition: "top",
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
            top: "60%",
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
              fontSize: "clamp(1rem, 6vw, 2rem)",
              fontWeight: "800",
              margin: "0",
              fontFamily: "Poppins, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Project Nilgiri Tahr
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
            Conserving Tamil Nadu’s State Animal – The Endangered Nilgiri Tahr
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
              marginBottom: "2rem",
            }}
          >
            As per the <strong>G.O. (MS).No. 222</strong> environment, climate
            change and forest, Honourable Chief Minister,{" "}
            <span className={styles.bold}>Thiru. M. K. Stalin</span>, on October
            12, 2023 launched <strong>Project Nilgiri Tahr</strong> and Project
            Director office has been opened at Forest Campus, Coimbatore on
            12.10.2023.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              lineHeight: "1.7",
              color: "#502c16",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
            }}
          >
            The <strong>Nilgiri Tahr (Varaiyadu)</strong> is the State animal of
            Tamil Nadu and is an endangered, endemic ungulate. To conserve and
            protect this state animal, a dedicated scientific research team and
            the Project Director’s office have been established in Coimbatore.
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              lineHeight: "1.7",
              color: "#502c16",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              textAlign: "start",
            }}
          >
            <h2 className={styles.subheading}>Project Components</h2>
            <ul className={styles.list}>
              <li>Administrative setup</li>
              <li>Annual synchronized surveys</li>
              <li>Radio collaring of the Nilgiri Tahr</li>
              <li>Restoration of shola grasslands</li>
              <li>Disease diagnostics</li>
              <li>Reintroduction programs</li>
              <li>Implementation of ecotourism</li>
              <li>Conservation education and outreach</li>
            </ul>
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              lineHeight: "1.7",
              color: "#502c16",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
            }}
          >
            To commemorate the birth anniversary of{" "}
            <strong>E.R.C. Davidar</strong>, who pioneered conservation efforts
            for the Nilgiri Tahr, his birth date,{" "}
            <span className={styles.bold}>7th October</span> has been declared
            as <span className={styles.italic}>“Nilgiri Tahr Day”</span>.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default BannerClient;
