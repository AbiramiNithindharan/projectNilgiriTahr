"use client";

import { useSearchParams } from "next/navigation";
import styles from "./success.module.css";
import { motion } from "framer-motion";

export default function DonationSuccessClient() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const amount = params.get("amount");

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Donation Successful</h1>

        <p className={styles.subtitle}>
          Thank you for supporting the Nilgiri Tahr Project.
        </p>

        <div className={styles.details}>
          <div>
            <span>Reference ID</span>
            <strong>{ref || "—"}</strong>
          </div>

          <div>
            <span>Amount Paid</span>
            <strong>₹{amount || "—"}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className={styles.success}>Completed</strong>
          </div>
        </div>

        <p className={styles.note}>
          This transaction has been securely recorded. A confirmation email will
          be sent to your registered email address.
        </p>
      </div>
    </motion.div>
  );
}
