"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { motion } from "framer-motion";

export default function DonationAdminForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/donation-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/donation-admin/donations";
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className={styles.card}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h2 className={styles.title}>Donation Admin Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label className={styles.label}>User Name</label>
          <input
            type="text"
            placeholder="eg: JohnDoe"
            value={username}
            className={styles.inputText}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••••"
            value={password}
            className={styles.inputText}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </>
  );
}
