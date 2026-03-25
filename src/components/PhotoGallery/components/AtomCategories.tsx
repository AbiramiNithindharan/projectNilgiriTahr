"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GALLERY_ATOM_CATEGORIES } from "@/data/galleryAtomData";
import styles from "./AtomCategories.module.css";

type Props = {
  onSelect?: (id: string) => void;
};

export function AtomCategories({ onSelect }: Props) {
  const [opened, setOpened] = useState(false);
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const router = useRouter();
  const [screenSize, setScreenSize] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const isMainActive = activeMain !== null;
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("desktop");
      } else if (window.innerWidth >= 640) {
        setScreenSize("tablet");
      } else {
        setScreenSize("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainCategories = GALLERY_ATOM_CATEGORIES;
  const config = useMemo(() => {
    switch (screenSize) {
      case "tablet":
        return {
          nucleusSize: opened ? 150 : 180,
          orbitRadius: 220,
          electronSize: 75,
          subRadius: 110,
          subElectron: 95,
          leftOffset: 60,
          SubElectronPositionX: 10,
          SubElectronPositionY: 0,
        };
      case "mobile":
        return {
          nucleusSize: opened ? 70 : 100,
          orbitRadius: 100,
          electronSize: 40,
          subRadius: 55,
          subElectron: 40,
          leftOffset: 40,
          SubElectronPositionX: 0,
          SubElectronPositionY: 0,
        };
      default:
        return {
          nucleusSize: opened ? 180 : 220,
          orbitRadius: 280,
          electronSize: 90,
          subRadius: 130,
          subElectron: 110,
          leftOffset: 100,
          SubElectronPositionX: 5,
          SubElectronPositionY: 5,
        };
    }
  }, [screenSize, opened]);
  const nucleusSize = config.nucleusSize;

  const ORBIT_RADIUS = config.orbitRadius;
  const ELECTRON_SIZE = config.electronSize;
  const SubElectron = config.subElectron;
  const ELECTRON_RADIUS = ELECTRON_SIZE / 2;
  const SubElectronPositionX = config.SubElectronPositionX;
  const SubElectronPositionY = config.SubElectronPositionY;
  const spacing = 40;

  return (
    <div className={styles.wrapper}>
      {/* NUCLEUS */}
      <motion.div
        className={`${styles.nucleus} ${isMainActive ? styles.blurred : ""}`}
        animate={{
          width: nucleusSize,
          height: nucleusSize,
        }}
        transition={{ type: "spring", stiffness: 120 }}
        onClick={() => {
          setOpened(!opened);
          setActiveMain(null);
        }}
      >
        <Image
          src="/icon/galleryIcon.jpg"
          alt="Nucleus"
          fill
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
      </motion.div>
      {/* MAIN ELECTRONS */}

      {opened &&
        mainCategories.map((cat, index) => {
          const isLeft = index < 3;
          const positionIndex = index % 3;

          let angle;

          if (isLeft) {
            // center around 180° (true left side)
            angle = (180 - spacing + positionIndex * spacing) * (Math.PI / 180);
          } else {
            // center around 0° (true right side)
            angle = (-spacing + positionIndex * spacing) * (Math.PI / 180);
          }

          let x = Math.cos(angle) * (ORBIT_RADIUS - ELECTRON_RADIUS);
          const y = Math.sin(angle) * (ORBIT_RADIUS - ELECTRON_RADIUS);

          if (isLeft) {
            x -= config.leftOffset;
          }
          return (
            <React.Fragment key={cat.id}>
              <motion.div
                className={`${styles.electronWrapper} ${
                  isMainActive && activeMain !== cat.id ? styles.blurred : ""
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x,
                  y,
                }}
                whileHover={{ scale: 1.05 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
                style={{
                  top: "50%",
                  left: "50%",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMain((prev) => (prev === cat.id ? null : cat.id));
                }}
              >
                <div
                  className={styles.electron}
                  style={{
                    width: ELECTRON_SIZE,
                    height: ELECTRON_SIZE,
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className={styles.label}>{cat.label}</span>
              </motion.div>
              <AnimatePresence>
                {activeMain === cat.id &&
                  cat.subCategories.map((sub, i) => {
                    const SUB_RADIUS = config.subRadius;

                    const subAngle =
                      (i / cat.subCategories.length) * Math.PI * 2;

                    const subX = x + Math.cos(subAngle) * SUB_RADIUS;
                    const subY = y + Math.sin(subAngle) * SUB_RADIUS;

                    return (
                      <motion.div
                        key={sub.id}
                        className={styles.electronWrapper}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: subX - SubElectronPositionX,
                          y: subY - SubElectronPositionY,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 14,
                        }}
                        style={{
                          top: "50%",
                          left: "50%",
                          zIndex: "1000",
                        }}
                        onClick={() => {
                          router.push(sub.route);
                          onSelect?.(activeMain);
                        }}
                      >
                        <div
                          className={styles.electron}
                          style={{
                            width: SubElectron,
                            height: SubElectron,
                          }}
                        >
                          <Image
                            src={sub.image}
                            alt={sub.label}
                            fill
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <span className={styles.label}>{sub.label}</span>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
    </div>
  );
}
