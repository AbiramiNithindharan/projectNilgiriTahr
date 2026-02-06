"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./failed.module.css";

export default function DonationFailedPage() {
  const router = useRouter();
  const reason = useSearchParams().get("reason");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Donation Not Completed</h1>

        <p className={styles.message}>
          Your transaction could not be completed at this time.
        </p>

        <div className={styles.reason}>
          Reason: {reason || "Payment verification issue"}
        </div>

        <div className={styles.actions}>
          <button onClick={() => router.push("/donate")}>Retry Donation</button>
        </div>

        <p className={styles.support}>
          If the amount was debited, please contact
          <strong> support@nilgiritahr.gov.in</strong> with transaction details.
        </p>
      </div>
    </div>
  );
}
