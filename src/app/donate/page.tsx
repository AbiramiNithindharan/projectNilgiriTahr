"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./donate.module.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(100);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Razorpay script once on mount
  useEffect(() => {
    const id = "razorpay-script";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, email }),
      });

      const order = await res.json();
      if (!res.ok || order.error)
        throw new Error(order.error || "Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: process.env.NEXT_PUBLIC_APP_NAME || "Donation",
        description: "Thank you for supporting our cause",
        order_id: order.id,
        prefill: { name, email },
        theme: { color: "#0d6efd" },
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              name,
              email,
              amount,
            }),
          });

          const data = await verifyRes.json();
          if (data.success) {
            alert("✅ Payment Verified!");
          } else {
            alert("❌ Verification failed!");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout closed by user");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className={styles.bgOverlay}></div>
      <motion.div
        className={styles.donateCard}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.h1
          className={styles.donateHeading}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Support the Nilgiri Tahr Project
        </motion.h1>

        <motion.form
          className={styles.donateForm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <label className={styles.label}>
            Name:
            <input
              type="text"
              value={name}
              className={styles.input}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              className={styles.input}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Amount (₹):
            <input
              type="number"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1"
            />
          </label>

          <button
            className={styles.button}
            onClick={handleDonate}
            disabled={loading}
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
