"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import styles from "./admin.module.css";
import toast, { Toaster } from "react-hot-toast";
import DashboardLogin from "./components/DashboardLogin";
const CMSAccessForm = dynamic(() => import("./components/CmsAccessForm"), {
  ssr: false,
});
export default function AdminClient() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const errorParam = searchParams.get("error");
  const [activeTab, setActiveTab] = useState<"cms" | "donation">(
    tabParam === "donation" ? "donation" : "cms",
  );
  useEffect(() => {
    if (errorParam === "unauthorized") {
      toast.error("Unauthorized. Please Login.");
    }
  }, [searchParams]);
  return (
    <div className={styles.portalContainer}>
      <div className={styles.bgOverlay}></div>
      <Toaster position="top-center" />
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
