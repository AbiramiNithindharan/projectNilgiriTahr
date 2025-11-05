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
  const [amount, setAmount] = useState<string>("100");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    amount?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  // Load Razorpay script once
  useEffect(() => {
    const id = "razorpay-script";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // --- Utility: Sanitize input ---
  const sanitize = (input: string) => {
    const trimmed = input.trim();
    return trimmed.replace(/[<>\/\\'"`;]/g, ""); // remove potentially unsafe chars
  };

  // Convert the amount string to number for validation/submission
  const toAmountNumber = (amtStr: string) => {
    // empty => NaN
    if (!amtStr || amtStr.trim() === "") return NaN;
    // parse as integer (₹ - whole rupees)
    const n = parseInt(amtStr, 10);
    return Number.isFinite(n) ? n : NaN;
  };

  // --- Validation logic ---
  const validateForm = () => {
    const newErrors: { name?: string; email?: string; amount?: string } = {};

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);

    if (!safeName) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s'.-]{2,50}$/.test(safeName)) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!safeEmail) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(safeEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const amt = toAmountNumber(amount);
    if (isNaN(amt)) {
      newErrors.amount = "Please enter an amount.";
    } else if (amt < 10) {
      newErrors.amount = "Minimum donation amount is ₹10.";
    } else if (amt > 100000) {
      newErrors.amount = "Maximum donation limit is ₹1,00,000.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Payment Handler ---
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const amt = toAmountNumber(amount);

      const res = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          name: sanitize(name),
          email: sanitize(email),
        }),
      });

      const order = await res.json();
      if (!res.ok || order.error)
        throw new Error(order.error || "Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: process.env.NEXT_PUBLIC_APP_NAME || "Nilgiri Tahr Project",
        description: "Government-authorized donation support",
        order_id: order.id,
        prefill: { name, email },
        theme: { color: "#0d6efd" },
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              name: sanitize(name),
              email: sanitize(email),
              amount: amt,
            }),
          });

          const data = await verifyRes.json();
          if (data.success) {
            setName("");
            setEmail("");
            setAmount("100");
            setErrors({});
            alert("✅ Payment Verified Successfully!");
          } else {
            alert("❌ Payment verification failed.");
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal closed by user.");
            setName("");
            setEmail("");
            setAmount("100");
            setErrors({});
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      setAmount("");
      return;
    }
    // remove all non-digit chars
    let cleaned = raw.replace(/[^\d]/g, "");
    // remove leading zeros but keep a single "0" if user typed just 0
    cleaned = cleaned.replace(/^0+(?=\d)/, "");
    setAmount(cleaned);
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
        <h1 className={styles.donateHeading}>
          Support the Nilgiri Tahr Project
        </h1>

        <form
          className={styles.donateForm}
          onSubmit={handleDonate}
          noValidate
          aria-label="Donation form"
        >
          <label className={styles.label}>
            Name:
            <input
              type="text"
              value={name}
              className={styles.input}
              placeholder="Your full name"
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={!!errors.name}
              aria-describedby="nameError"
            />
            {errors.name && (
              <span id="nameError" className={styles.error}>
                {errors.name}
              </span>
            )}
          </label>

          <label className={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              className={styles.input}
              placeholder="Your official email"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!!errors.email}
              aria-describedby="emailError"
            />
            {errors.email && (
              <span id="emailError" className={styles.error}>
                {errors.email}
              </span>
            )}
          </label>

          <label className={styles.label}>
            Amount (₹):
            <input
              inputMode="numeric"
              pattern="\d*"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              min={10}
              max={100000}
              className={styles.input}
              required
              aria-invalid={!!errors.amount}
              aria-describedby="amountError"
              placeholder="Enter amount in ₹"
            />
            {errors.amount && (
              <span id="amountError" className={styles.error}>
                {errors.amount}
              </span>
            )}
          </label>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Processing..." : "Donate Securely"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
