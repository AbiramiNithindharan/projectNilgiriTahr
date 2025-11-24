"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { X } from "lucide-react";
import styles from "./DashboardSidebar.module.css";

export default function DashboardSidebar({ open, onClose }: any) {
  return (
    <AnimatePresence>
      {" "}
      {open && (
        <>
          {" "}
          {/* BACKDROP */}
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.5,
            }}
            exit={{
              opacity: 0,
            }}
          />{" "}
          {/* SIDEBAR PANEL */}
          <motion.div
            className={styles.sidebar}
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              type: "tween",
              duration: 0.3,
            }}
          >
            {" "}
            <div className={styles.header}>
              {" "}
              <span className={styles.title}>Menu</span>{" "}
              <button className={styles.closeBtn} onClick={onClose}>
                {" "}
                <X size={20} />{" "}
              </button>{" "}
            </div>{" "}
            <div className={styles.menuList}>
              {" "}
              <Link
                href="/donation-admin"
                onClick={onClose}
                className={styles.item}
              >
                {" "}
                Home{" "}
              </Link>{" "}
              <Link
                href="/donation-admin/donations"
                onClick={onClose}
                className={styles.item}
              >
                {" "}
                Donations{" "}
              </Link>{" "}
              <div className={styles.sectionTitle}>Store</div>{" "}
              <Link
                href="/donation-admin/e-com/AddProducts"
                onClick={onClose}
                className={styles.item}
              >
                {" "}
                ➤ Add T-Shirt{" "}
              </Link>{" "}
              <Link
                href="/donation-admin/e-com/SalesTable"
                onClick={onClose}
                className={styles.item}
              >
                {" "}
                ➤ View Table{" "}
              </Link>{" "}
            </div>{" "}
          </motion.div>{" "}
        </>
      )}
    </AnimatePresence>
  );
}
