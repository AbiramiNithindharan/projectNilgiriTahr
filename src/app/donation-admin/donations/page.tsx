"use client";

import { useEffect, useState } from "react";
import styles from "./donations.module.css";
import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { motion } from "framer-motion";

export default function DonationsDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      const res = await fetch("/api/donations", {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/donation-admin/login";
        return;
      }

      const data = await res.json();
      setDonations(data);
      setLoading(false);
    };

    fetchDonations();
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Donation Dashboard</h2>
        <button
          onClick={async () => {
            await fetch("/api/donation-admin/logout");
            window.location.href = "/admin";
          }}
          className={styles.logout}
        >
          Logout
        </button>
      </motion.div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <p className={styles.loading}>Loading donations...</p>
        ) : donations.length > 0 ? (
          <DataTable columns={columns} data={donations} />
        ) : (
          <p className={styles.noData}>No donations found.</p>
        )}
      </div>
    </div>
  );
}
