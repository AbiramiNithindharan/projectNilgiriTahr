"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "./cms-access.css";

export default function CMSAccessPortal() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let data;

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      try {
        data = await res.json();
      } catch {
        data = { success: false, message: "Server returned invalid response" };
      }

      setLoading(false);

      if (res.ok && data.success) {
        router.push("/studio");
      } else {
        setError(data.message || "Access denied");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error or invalid request");
    }
  };

  return (
    <motion.div
      className="cms-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="bg-overlay"></div>

      <motion.div
        className="cms-card"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.h1
          className="cms-title"
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Admin Access Portal
        </motion.h1>

        <motion.p
          className="cms-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Authorized users only
        </motion.p>

        <motion.form
          onSubmit={handleAccess}
          className="cms-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <input
            type="password"
            placeholder="Enter access password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="cms-input"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="cms-button"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </motion.button>
        </motion.form>

        {error && (
          <motion.p
            className="cms-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {error}
          </motion.p>
        )}
        {loading && (
          <motion.p
            className="cms-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Loading...
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
