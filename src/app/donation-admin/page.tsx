"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./donation-admin.module.css";
import { supabaseClient } from "@/lib/supabaseClient";

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
    fetchDonationStats();
    fetchContactStats();
  }, []);

  const fetchDonationStats = async () => {
    // Date range for last month
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );
    //Fetch ONLY required fields + ONLY success
    const { data, error } = await supabaseClient
      .from("donations")
      .select("amount, email, created_at")
      .eq("status", "paid");

    if (error) {
      console.error("Error fteching donations:", error);
      return;
    }
    if (!data) return;

    // TOTAL AMOUNT
    const totalAmount = data.reduce((sum, d) => sum + d.amount, 0);

    // LAST MONTH FILTER
    const lastMonthAmount = data
      .filter((d) => {
        const date = new Date(d.created_at);
        return date >= firstDayLastMonth && date < firstDayThisMonth;
      })
      .reduce((sum, d) => sum + d.amount, 0);

    // UNIQUE DONORS
    const totalDonors = new Set(data.map((d) => d.email)).size;

    setStats({
      totalAmount,
      lastMonthAmount,
      totalDonors,
    });
  };

  const fetchContactStats = async () => {
    const now = new Date();
    const last7Days = new Date();
    last7Days.setDate(now.getDate() - 7);

    // ✅ Counts
    const { count: recentCount } = await supabaseClient
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .gte("created_at", last7Days.toISOString());

    const { count: notRepliedCount } = await supabaseClient
      .from("contact_messages")
      .select("*", { count: "exact" })
      .eq("is_replied", false);

    // ✅ Latest messages
    const { data: messages, error } = await supabaseClient
      .from("contact_messages")
      .select("id, name, message, created_at, is_replied")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error(error);
      return;
    }

    setContactStats({
      recentMessages: recentCount || 0,
      notReplied: notRepliedCount || 0,
    });

    setLatestMessages(messages || []);
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
