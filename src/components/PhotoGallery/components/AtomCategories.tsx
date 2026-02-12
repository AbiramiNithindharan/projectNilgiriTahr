import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "../PhotoGallery.module.css";
import {
  GALLERY_ATOM_CATEGORIES,
  AtomMainCategory,
} from "@/data/galleryAtomData";

type AtomCategoriesProps = {
  onSelect: (id: string) => void;
};

type ResponsiveOffset = {
  extraLarge: { x: number; y: number };
  large?: { x: number; y: number };
  desktop?: { x: number; y: number };
  tablet?: { x: number; y: number };
  mobile?: { x: number; y: number };
};

interface OrbitStyle {
  orbitColor: string;
  childColor: string;
  electronColor?: string; // used for main electron (node) color
  childSize: number;
  orbitOffset: (
    cx: number,
    cy: number,
    angle: number,
    radius: number,
  ) => { cx: number; cy: number };
  childAngleOffset?: number;

  childBaseOffset?: {
    x?: number; // left (-) / right (+)
    y?: number; // up (-) / down (+)
  };
  childLayout: (
    i: number,
    total: number,
    radius: number,
  ) => { x: number; y: number };
}

const DEFAULT_ORBIT_STYLE: OrbitStyle = {
  orbitColor: "rgb(245, 222, 167)",
  childColor: "rgb(248, 185, 39)",
  electronColor: "rgb(255, 255, 255)",
  childSize: 38,
  orbitOffset: (cx, cy) => ({ cx, cy }),
  childLayout: (i, total, r) => {
    const angle = (i / total) * Math.PI * 2;
    return {
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    };
  },
};

const ELECTRON_BG = "#52b788";

const SUBCATEGORY_CLUSTER_OFFSET: Record<string, ResponsiveOffset> = {
  NilgiriTahr: {
    extraLarge: { x: 220, y: 70 },
    large: { x: 220, y: 40 },
    desktop: { x: 220, y: 40 },
    tablet: { x: 100, y: 60 },
    mobile: { x: 80, y: 60 },
  },

  EcoSystem: {
    extraLarge: { x: 40, y: 80 },
    large: { x: 40, y: 80 },
    desktop: { x: 40, y: 80 },
    tablet: { x: -10, y: 90 },
    mobile: { x: 10, y: 95 },
  },
  Portfolio: {
    extraLarge: { x: 50, y: 30 },
    large: { x: 50, y: 30 },
    desktop: { x: 50, y: 30 },
    tablet: { x: 110, y: 80 },
    mobile: { x: 80, y: 75 },
  },
  Study: {
    extraLarge: { x: 60, y: -10 },
    large: { x: 30, y: -10 },
    desktop: { x: 10, y: -10 },
    tablet: { x: 0, y: 40 },
    mobile: { x: 10, y: 40 },
  },

  Celebration: {
    extraLarge: { x: 50, y: 60 },
    large: { x: 50, y: 60 },
    desktop: { x: 50, y: 60 },
    tablet: { x: 100, y: 40 },
    mobile: { x: 80, y: 40 },
  },
  Poster: {
    extraLarge: { x: -20, y: 40 },
    large: { x: -20, y: 40 },
    desktop: { x: -20, y: 40 },
    tablet: { x: 0, y: 60 },
    mobile: { x: 10, y: 60 },
  },
};

const FONT_SIZE_CONFIG = {
  extraLarge: {
    nucleus: 18,
    mainCategory: 15,
    subCategory: 10,
  },
  large: {
    nucleus: 18,
    mainCategory: 15,
    subCategory: 15,
  },
  desktop: {
    nucleus: 18,
    mainCategory: 15,
    subCategory: 15,
  },
  tablet: {
    nucleus: 18,
    mainCategory: 13,
    subCategory: 13,
  },
  mobile: {
    nucleus: 18,
    mainCategory: 12,
    subCategory: 12,
  },
};

const NUCLEUS_POSITION_CONFIG = {
  extraLarge: { x: 0, y: 0 },
  large: { x: 0, y: 0 },
  desktop: { x: 0, y: 0 },
  tablet: { x: 0, y: 0 },
  mobile: { x: 0, y: 0 },
};

export function AtomCategories({ onSelect }: AtomCategoriesProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 640, h: 640 });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showOuterOrbit, setShowOuterOrbit] = useState(false);

  const getBreakpoint = () => {
    if (box.w <= 480) return "mobile";
    if (box.w <= 768) return "tablet";
    if (box.w <= 992) return "desktop";
    if (box.w <= 1200) return "large";
    return "extraLarge";
  };
  const breakpoint = getBreakpoint();
  const fontSizes = FONT_SIZE_CONFIG[breakpoint];
  const nucleusOffset = NUCLEUS_POSITION_CONFIG[breakpoint];

  // Measure container for responsive center & radii
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setBox({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const center = useMemo(
    () => ({
      x: box.w / 2 + nucleusOffset.x,
      y: box.h / 2 + nucleusOffset.y,
    }),
    [box.w, box.h, nucleusOffset.x, nucleusOffset.y],
  );

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const outerRadius = Math.min(box.w, box.h) * 0.35;
  const childOffsetBase = Math.min(box.w, box.h) * 0.64;
  const childRadius = Math.min(box.w, box.h) * 0.22;

  const safePad = 8;

  const getChildOrbitCenter = (n: {
    angle: number;
    ex: number;
    ey: number;
  }) => {
    const dx = Math.cos(n.angle);
    const dy = Math.sin(n.angle);

    const rawCx = n.ex + dx * childOffsetBase;
    const rawCy = n.ey + dy * childOffsetBase;

    const cx = clamp(
      rawCx,
      childRadius + safePad,
      box.w - childRadius - safePad,
    );
    const cy = clamp(
      rawCy,
      childRadius + safePad,
      box.h - childRadius - safePad,
    );

    return { cx, cy };
  };

  const nodesWithPos = useMemo(() => {
    const N = GALLERY_ATOM_CATEGORIES.length; // should be 8
    return GALLERY_ATOM_CATEGORIES.map((cat, i) => {
      const angle = (i / N) * Math.PI * 2;
      const ex = center.x + outerRadius * Math.cos(angle);
      const ey = center.y + outerRadius * Math.sin(angle);
      return { ...cat, angle, ex, ey };
    });
  }, [center.x, center.y, outerRadius]);

  const handleNodeClick = (id: string) => {
    const node = GALLERY_ATOM_CATEGORIES.find((n) => n.id === id);
    if (!node) return;

    // Toggle orbit
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.atomWrap}>
      <div className={styles.atomCanvas} ref={ref}>
        {/* SVG underlay for orbits & connectors */}
        <svg
          className={styles.atomSvg}
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
        >
          {/* Main circular orbit */}
          {showOuterOrbit && (
            <>
              <circle
                cx={center.x}
                cy={center.y}
                r={outerRadius}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
              />

              {/* Lines from nucleus to each electron */}
              {nodesWithPos.map((n) => (
                <line
                  key={`line-${n.id}`}
                  x1={center.x}
                  y1={center.y}
                  x2={n.ex}
                  y2={n.ey}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                />
              ))}
            </>
          )}
        </svg>

        {/* Nucleus */}
        <motion.img
          src="/gallery/nilgiri-tahr.jpg"
          alt="Center Image"
          className={styles.nucleusImage}
          onClick={() => {
            onSelect("all");
            setExpandedId(null);
            setShowOuterOrbit((s) => !s);
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
        {showOuterOrbit &&
          nodesWithPos.map((n, idx) => {
            const bg = ELECTRON_BG;
            const sizePx = Math.max(56, box.w * 0.07);
            return (
              <motion.button
                key={n.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.08 }}
                className={`${styles.electron} ${
                  expandedId === n.id ? styles.electronActive : ""
                }`}
                data-id={n.id}
                onClick={() => handleNodeClick(n.id)}
                aria-label={n.label}
                title={n.label}
                style={{
                  left: `${n.ex - 30}px`,
                  top: `${n.ey - 30}px`,
                  transform: "translate(-50%, -50%)",
                  width: `${Math.max(78, box.w * 0.07)}px`,
                  height: `${Math.max(78, box.w * 0.07)}px`,
                  backgroundImage: `url(${n.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <span
                  className={styles.electronLabel}
                  style={{ fontSize: `${fontSizes.mainCategory}px` }}
                >
                  {n.label}
                </span>
              </motion.button>
            );
          })}
        {/* Subcategory electrons */}
        {showOuterOrbit &&
          nodesWithPos.map((n) => {
            if (expandedId !== n.id || !n.subCategories.length) return null;

            const { cx, cy } = getChildOrbitCenter(n);
            const orbitStyle = DEFAULT_ORBIT_STYLE;
            const breakpoint = getBreakpoint();
            const clusterConfig = SUBCATEGORY_CLUSTER_OFFSET[n.id];

            const clusterOffset = clusterConfig?.[breakpoint] ??
              clusterConfig?.extraLarge ?? { x: 0, y: 0 };

            const finalCx = cx + clusterOffset.x;
            const finalCy = cy + clusterOffset.y;

            return (
              <div key={`sub-orbit-${n.id}`}>
                {n.subCategories.map((sub, i) => {
                  const BASE_OFFSET_X = -70;
                  const BASE_OFFSET_Y = -80;
                  const { x, y } = orbitStyle.childLayout(
                    i,
                    n.subCategories.length,

                    childRadius - 30,
                  );

                  return (
                    <motion.button
                      key={`${n.id}-${sub.id}`}
                      className={styles.childElectron}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        x: x + BASE_OFFSET_X,
                        y: y + BASE_OFFSET_Y,
                      }}
                      transition={{
                        delay: 0.1 + i * 0.08,
                        type: "spring",
                        stiffness: 80,
                      }}
                      style={{
                        left: finalCx,
                        top: finalCy,
                        backgroundImage: `url(${sub.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        zIndex: 100 + i,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();

                        router.push(sub.route);

                        requestAnimationFrame(() => {
                          setExpandedId(null);
                          setShowOuterOrbit(false);
                        });
                      }}
                      aria-label={sub.label}
                      title={sub.label}
                    >
                      <span
                        className={styles.childLabel}
                        style={{ fontSize: `${fontSizes.subCategory}px` }}
                      >
                        {sub.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
