"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./donation-admin.module.css";

export default function DonationAdminDashboard() {
  const [stats, setStats] = useState({
    totalAmount: 0,
    lastMonthAmount: 0,
    totalDonors: 0,
  });
  const [contactStats, setContactStats] = useState({
    recentMessages: 0,
    notReplied: 0,
  });
  const [latestMessages, setLatestMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // ✅ Stats are aggregated server-side (admin-only route) — the browser never
  // queries Supabase directly for donor or contact data.
  const fetchDashboardStats = async () => {
    try {
      const res = await fetch("/api/donation-admin/stats", {
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Error fetching dashboard stats:", res.status);
        return;
      }

      const result = await res.json();

      setStats(result.stats);
      setContactStats(result.contactStats);
      setLatestMessages(result.latestMessages || []);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  // 🇮🇳 Currency formatter (BEST PRACTICE)
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className={styles.pageWrapper}>
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
            <h3 className={styles.cardValue}>₹ {stats.totalAmount}</h3>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Last Month Donations</span>
            <h3 className={styles.cardValue}>₹ {stats.lastMonthAmount}</h3>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Total Donors</span>
            <h3 className={styles.cardValue}>
              {stats.totalDonors.toLocaleString("en-IN")}
            </h3>
          </div>
        </div>
      </motion.section>
      {/* CONTACT SECTION */}
      <motion.section
        className={styles.section}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4 }}
      >
        <h2 className={styles.sectionTitle}>Contact Messages</h2>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Recent Messages (7 days)</span>
            <h3 className={styles.cardValue}>{contactStats.recentMessages}</h3>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Not Replied</span>
            <h3 className={styles.cardValue}>{contactStats.notReplied}</h3>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
