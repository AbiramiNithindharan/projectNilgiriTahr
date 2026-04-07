"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./login.module.css";
import { motion } from "framer-motion";

export default function DashboardLogin() {
  const searchParams = useSearchParams();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const err = searchParams.get("error");

    if (err === "unauthorized") {
      setError("Please login to access the dashboard.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/donation-admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        window.location.href = "/donation-admin";
      } else {
        setError("Invalid Username or Password");
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
        <h2 className={styles.title}>Dashboard Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label className={styles.label}>User Name</label>
          <input
            type="text"
            placeholder="eg: JohnDoe"
            value={username}
            className={styles.inputText}
            onChange={(e) => {
              setUserName(e.target.value);
              if (error) setError("");
            }}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••••"
            value={password}
            className={styles.inputText}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
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
