"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./contact.module.css";

export default function Contact() {
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

    const form = new FormData(e.target);

    const res = await fetch("/api/contact-submit", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    alert("Message sent successfully!");
  }

  async function handleVolunteerSubmit(e: any) {
    e.preventDefault();

    const form = new FormData(e.target);

    await fetch("/api/volunteer-submit", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("vname"),
        email: form.get("vemail"),
        phone: form.get("vphone"),
        interest: form.get("vinterest"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    alert("Volunteer registration successful!");
  }

  return (
    <>
      {/* Banner Section */}
      <motion.div
        className={styles.banner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "40vh", // Increased from 40vh back to 60vh for desktop
          marginTop: "100px", // Account for header
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Forest landscape"
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
              "linear-gradient(45deg, rgba(27, 67, 50, 0.6), rgba(82, 183, 136, 0.3))",
            zIndex: 5,
          }}
        />

        {/* Title in center of banner */}
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
              whiteSpace: "nowrap", // Keep text in one line
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
