"use client";
import { motion } from "framer-motion";
import styles from "./donation-admin.module.css";

export default function DonationAdminDashboard() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className={styles.pageWrapper}>
      {/* DONATIONS SECTION */}
      <motion.section
        className={styles.section}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4 }}
      >
        <h2 className={styles.sectionTitle}>Donations</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Donation Amount</span>
            <h3 className={styles.cardValue}>₹ 1,24,500</h3>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Last Month Donations</span>
            <h3 className={styles.cardValue}>₹ 18,200</h3>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Donors</span>
            <h3 className={styles.cardValue}>342</h3>
          </div>
        </div>
      </motion.section>

      {/* STORE SECTION */}
      <motion.section
        className={styles.section}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className={styles.sectionTitle}>Store</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Sales</span>
            <h3 className={styles.cardValue}>₹ 2,45,800</h3>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Last Month Sales</span>
            <h3 className={styles.cardValue}>₹ 52,400</h3>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Orders</span>
            <h3 className={styles.cardValue}>687</h3>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
