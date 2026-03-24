"use client";

import { useState } from "react";
import Toast from "@/components/Toast/Toast";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./contact.module.css";

export default function Contact() {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null,
  );

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
  }

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

  async function handleContactSubmit(e: any) {
    e.preventDefault();

    try {
      const form = new FormData(e.target);

      const res = await fetch("/api/contact-submit", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
          company: form.get("company"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.errors?.join(", ") || "Something went wrong", "error");
        return;
      }
      e.target.reset();
      showToast("Message sent successfully!", "success");
    } catch (err) {
      showToast("Something went wrong! Please try again.", "error");
    }
  }

  async function handleVolunteerSubmit(e: any) {
    e.preventDefault();

    try {
      const form = new FormData(e.target);

      const res = await fetch("/api/volunteer-submit", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("vname"),
          email: form.get("vemail"),
          phone: form.get("vphone"),
          company: form.get("company"),
          interest: form.get("vinterest"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.errors?.join(", ") || "Unable to register", "error");
        return;
      }

      e.target.reset();
      showToast("Volunteer registration successful!", "success");
    } catch (err) {
      showToast("Network error. Try again later.", "error");
    }
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Banner Section */}
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
          objectFit: "cover",
          objectPosition: "top",
        }}
      >
        <motion.img
          src="/gallery/nt-portrait/nilgiritahr-33.jpeg"
          alt="nilgiritahr"
          className={styles.bannerImage}
          initial={{ scale: 1.1, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            delay: 0.3,
          }}
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
              "linear-gradient(45deg, rgba(67, 48, 27, 0.6), rgba(183, 131, 82, 0.3))",
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
            maxWidth: "800px",
            padding: "0 2rem",
          }}
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "800",

              fontFamily: "Poppins, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Contact Us
          </motion.h1>
        </div>
      </motion.div>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "8rem",
            background: "#000000",
            width: "100%",
            height: "100%",
          }}
        >
          <div className={styles.pageContainer}>
            {/* CONTACT FORM SECTION */}
            <section className={styles.formSection}>
              <div className={styles.imageContainer}>
                <Image
                  src="/gallery/contact.jpg"
                  alt="Contact"
                  fill
                  className={styles.formImage}
                />
              </div>
              <div className={styles.formContainer}>
                <h2>Contact Us</h2>
                <p>
                  We’d love to hear from you. Please fill out the form below.
                </p>
                <form className={styles.form} onSubmit={handleContactSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <input
                    type="text"
                    name="company"
                    style={{ display: "none" }}
                  />
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Send Message
                  </button>
                </form>
              </div>
            </section>

            {/* VOLUNTEER REGISTRATION FORM SECTION */}
            <section
              className={`${styles.formSection} ${styles.reverseLayout}`}
            >
              <div className={styles.formContainer}>
                <h2>Volunteer Registration</h2>
                <p>Join our team and make a difference in your community.</p>
                <form className={styles.form} onSubmit={handleVolunteerSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="vname">Full Name</label>
                    <input type="text" id="vname" name="vname" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="vemail">Email</label>
                    <input type="email" id="vemail" name="vemail" required />
                  </div>
                  <input
                    type="text"
                    name="company"
                    style={{ display: "none" }}
                  />
                  <div className={styles.formGroup}>
                    <label htmlFor="vphone">Phone Number</label>
                    <input type="tel" id="vphone" name="vphone" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="vinterest">Area of Interest</label>
                    <textarea
                      id="vinterest"
                      name="vinterest"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className={styles.submitButton}>
                    Register Now
                  </button>
                </form>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src="/gallery/volunteer.JPG"
                  alt="Volunteer"
                  fill
                  className={styles.formImage}
                />
              </div>
            </section>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
