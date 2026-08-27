"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { motion } from "framer-motion";
import LoadingDots from "@/components/LoadingDots/LoadingDots";

type DashboardLoginProps = {
  /** Unauthorized message owned by AdminClient, so it survives a tab switch */
  redirectError?: string;
  onDismissRedirectError?: () => void;
};

export default function DashboardLogin({
  redirectError = "",
  onDismissRedirectError,
}: DashboardLoginProps) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shownError = error || redirectError;

  const clearErrors = () => {
    if (error) setError("");
    if (redirectError) onDismissRedirectError?.();
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    clearErrors();

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
        setError(data.error || "Login failed");
        console.error(data);
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
            disabled={loading}
            onChange={(e) => {
              setUserName(e.target.value);
              clearErrors();
            }}
            aria-required="true"
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••••"
            value={password}
            className={styles.inputText}
            disabled={loading}
            onChange={(e) => {
              setPassword(e.target.value);
              clearErrors();
            }}
            aria-required="true"
          />

          {shownError && <p className={styles.error}>{shownError}</p>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? <LoadingDots tone="light" label="Logging in" /> : "Login"}
          </button>
        </form>
      </motion.div>
    </>
  );
}
