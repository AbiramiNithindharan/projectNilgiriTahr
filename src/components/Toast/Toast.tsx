"use client";

import { useEffect } from "react";
import styles from "./toast.module.css";

export default function Toast({ message, type, onClose }: any) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000); // auto hide
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${styles.toast} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      {message}
    </div>
  );
}
