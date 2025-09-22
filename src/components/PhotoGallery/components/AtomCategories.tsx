// ---- AtomCategories.tsx (inline in the same file for simplicity) ----
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mountain,
  Image as ImageIcon,
  Camera,
  Leaf,
  PawPrint,
  Megaphone,
} from "lucide-react";
import styles from "../PhotoGallery.module.css";

type AtomChild = {
  id: string;
  label: string;
  icon: ReactNode;
};

type AtomNode = {
  id: string;
  label: string;
  icon: ReactNode;
  children?: AtomChild[];
};

type AtomCategoriesProps = {
  onSelect: (id: string) => void;
};

const ATOM_NODES: AtomNode[] = [
  {
    id: "nilgiri-tahr",
    label: "Nilgiri Tahr",
    icon: <Mountain size={20} />,
  },
  {
    id: "landscape",
    label: "Landscape",
    icon: <Mountain size={20} />,
  },
  {
    id: "habitat-overview",
    label: "Habitat Overview",
    icon: <Camera size={20} />,
    children: [
      {
        id: "associate-flora",
        label: "Associate Flora",
        icon: <ImageIcon size={18} />,
      },
    ],
  },

  {
    id: "exhibition",
    label: "Conservation Exhibition",
    icon: <Megaphone size={20} />,
  },
];

export function AtomCategories({ onSelect }: AtomCategoriesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 640, h: 640 });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showOuterOrbit, setShowOuterOrbit] = useState(false);

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
    () => ({ x: box.w / 2, y: box.h / 2 }),
    [box.w, box.h]
  );

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  // Outer orbit radius (kept inside padding)
  const outerRadius = Math.min(box.w, box.h) * 0.32;
  const childOffsetBase = Math.min(box.w, box.h) * 0.46; // ✅ farther than before
  const childRadius = Math.min(box.w, box.h) * 0.22;
  const childNodeGap = 16;
  const safePad = 8;
  const childOffset = Math.min(box.w, box.h) * 0.26; // push child-orbit away from main orbit

  const getChildOrbitCenter = (n: {
    angle: number;
    ex: number;
    ey: number;
  }) => {
    const dx = Math.cos(n.angle);
    const dy = Math.sin(n.angle);

    // raw center pushed outward from electron
    const rawCx = n.ex + dx * childOffsetBase;
    const rawCy = n.ey + dy * childOffsetBase;

    // clamp so the entire child circle stays inside the SVG viewport
    const cx = clamp(
      rawCx,
      childRadius + safePad,
      box.w - childRadius - safePad
    );
    const cy = clamp(
      rawCy,
      childRadius + safePad,
      box.h - childRadius - safePad
    );

    return { cx, cy };
  };

  // Place “electrons” exactly on the orbit
  const nodesWithPos = useMemo(() => {
    const N = ATOM_NODES.length;
    return ATOM_NODES.map((node, i) => {
      const angle = (i / N) * Math.PI * 2; // even spacing
      const ex = center.x + outerRadius * Math.cos(angle);
      const ey = center.y + outerRadius * Math.sin(angle);
      return { ...node, angle, ex, ey };
    });
  }, [center.x, center.y, outerRadius]);

  // When clicking an electron
  const handleNodeClick = (id: string) => {
    onSelect(id); // keep your filtering in sync
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

          {/* Expanded child orbit (if any) */}
          {nodesWithPos.map((n) => {
            if (expandedId !== n.id || !n.children?.length) return null;

            const { cx, cy } = getChildOrbitCenter(n);

            return (
              <g key={`child-orbit-${n.id}`}>
                {/* ✅ SOLID full circle, no dash, and fully visible due to clamping*/}
                <circle
                  cx={cx - 195}
                  cy={cy}
                  r={childRadius}
                  fill="none"
                  stroke="rgba(82,183,136,0.75)"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>
        {/* Nucleus */}
        <motion.img
          src="/gallery/nilgiri-tahr.jpg" // 🔥 replace with your image path
          alt="Center Image"
          className={styles.nucleusImage} // create a CSS class to style (size, circle, etc.)
          onClick={() => {
            onSelect("all");
            setExpandedId(null);
            setShowOuterOrbit(!showOuterOrbit); // ✅ reveal outer orbit when clicked
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
        {/* Electrons (exactly ON the orbit) */}
        {showOuterOrbit &&
          nodesWithPos.map((n, idx) => (
            <motion.button
              key={n.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              className={`${styles.electron} ${
                expandedId === n.id ? styles.electronActive : ""
              }`}
              data-id={n.id}
              style={{
                left: n.ex - 70,
                top: n.ey - 70,
                // Rotate label so it sits outside the orbit
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
              onClick={() => handleNodeClick(n.id)}
              aria-label={n.label}
              title={n.label}
            >
              {n.icon}
              <span
                className={styles.electronLabel}
                style={{
                  // push label radially outward from center
                  transform: `translate(${Math.cos(n.angle) * 92}px, ${
                    Math.sin(n.angle) * 59
                  }px)`,
                }}
              >
                {n.label}
              </span>
            </motion.button>
          ))}

        {/* Child electrons on their own orbit */}
        {showOuterOrbit &&
          nodesWithPos.map((n) => {
            if (expandedId !== n.id || !n.children?.length) return null;

            const { cx, cy } = getChildOrbitCenter(n);
            const C = n.children.length;

            return n.children.map((ch, i) => {
              const a = (i / C) * Math.PI * 2;
              const x = cx + (childRadius + childNodeGap) * Math.cos(a); // ✅ slight outward push
              const y = cy + (childRadius + childNodeGap) * Math.sin(a);

              return (
                <motion.button
                  key={ch.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className={styles.childElectron}
                  data-parent={n.id}
                  style={{ left: x - 570, top: y - 30 }}
                  onClick={() => onSelect(ch.id)}
                  aria-label={ch.label}
                  title={ch.label}
                >
                  {ch.icon}
                  <span className={styles.childLabel}>{ch.label}</span>
                </motion.button>
              );
            });
          })}
      </div>
    </div>
  );
}
