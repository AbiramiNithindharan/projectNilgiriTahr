"use client";

import { useState, useMemo } from "react";
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

  const nucleusSize = opened ? 130 : 220;

  const mainCategories = GALLERY_ATOM_CATEGORIES;
  const ORBIT_RADIUS = 280;
  const ELECTRON_SIZE = 110;
  const ELECTRON_RADIUS = ELECTRON_SIZE / 2;
  const spacing = 40;

  return (
    <div className={styles.wrapper}>
      {/* ORBIT RING */}
      {/*  {opened && (
        <div
          className={styles.orbitRing}
          style={{
            width: ORBIT_RADIUS * 2,
            height: ORBIT_RADIUS * 2,
          }}
        />
      )} */}
      {/* NUCLEUS */}
      <motion.div
        className={styles.nucleus}
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
          style={{ objectFit: "cover" }}
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
            x -= 70;
          }
          return (
            <>
              <motion.div
                key={cat.id}
                className={styles.electron}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.05, 1],
                  x,
                  y,
                }}
                whileHover={{ scale: 1.1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  scale: {
                    repeat: Infinity,
                    duration: 4,
                  },
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
                style={{
                  width: 110,
                  height: 110,
                  top: "50%",
                  left: "50%",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMain((prev) => (prev === cat.id ? null : cat.id));
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <AnimatePresence>
                {activeMain === cat.id &&
                  cat.subCategories.map((sub, i) => {
                    const SUB_RADIUS = 90;

                    const subAngle =
                      (i / cat.subCategories.length) * Math.PI * 2;

                    const subX = x + Math.cos(subAngle) * SUB_RADIUS;
                    const subY = y + Math.sin(subAngle) * SUB_RADIUS;

                    return (
                      <motion.div
                        key={sub.id}
                        className={styles.electron}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: subX,
                          y: subY,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 14,
                        }}
                        style={{
                          width: 70,
                          height: 70,
                          top: "50%",
                          left: "50%",
                        }}
                        onClick={() => {
                          router.push(sub.route);
                          onSelect?.(activeMain);
                        }}
                      >
                        <Image
                          src={sub.image}
                          alt={sub.label}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </>
          );
        })}
    </div>
  );
}
