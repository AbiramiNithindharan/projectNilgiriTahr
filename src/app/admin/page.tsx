"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import DashboardLogin from "./components/DashboardLogin";
import styles from "./admin.module.css";
const CMSAccessForm = dynamic(() => import("./components/CmsAccessForm"), {
  ssr: false,
});
export default function CMSPortal() {
  const [activeTab, setActiveTab] = useState<"cms" | "donation">("cms");

  return (
    <div className={styles.portalContainer}>
      <div className={styles.bgOverlay}></div>
      <motion.div
        className={styles.portalCard}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.tabSwitcher}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "cms" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("cms")}
          >
            News Admin
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "donation" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("donation")}
          >
            Dashboard Login
          </button>
        </div>

        <div className={styles.formWrapper}>
          <AnimatePresence mode="wait">
            {activeTab === "cms" ? (
              <motion.div
                key="cms"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
              >
                <CMSAccessForm />
              </motion.div>
            ) : (
              <motion.div
                key="donation"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <DashboardLogin />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
