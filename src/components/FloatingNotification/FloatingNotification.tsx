"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FloatingNotification.module.css";

export default function FloatingNotification() {
  const [open, setOpen] = useState(false);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closePopup = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Floating Icon */}
      <div className={styles.floatingIcon} onClick={() => setOpen(true)}>
        <div className={styles.glow}></div>
        <Image
          src="/logo/bell-icon.png"
          alt="Notification"
          width={50}
          height={50}
          className={styles.bell}
        />
      </div>

      {/* Modal */}
      {open && (
        <div className={styles.overlay} onClick={closePopup}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closePopup}>
              ✕
            </button>

            <Image
              src="/icon/webinar.jpg"
              alt="Notification Popup"
              width={400}
              height={400}
              className={styles.popupImage}
            />
          </div>
        </div>
      )}
    </>
  );
}
