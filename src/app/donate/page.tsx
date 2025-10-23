"use client";

import { useEffect, useState } from "react";
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
        handler: function (response: any) {
          // Optional: verify payment via backend
          alert("✅ Payment successful — thank you for your support!");
          console.log("Payment response:", response);
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
    <div className={styles.container}>
      <h1>Support the Nilgiri Tahr Project</h1>

      <div className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Amount (₹):
          <input
            type="number"
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
      </div>
    </div>
  );
}
