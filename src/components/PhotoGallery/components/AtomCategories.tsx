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
    id: "associate-fauna",
    label: "Associate Fauna",
    icon: <Mountain size={20} />,
  },
  {
    id: "nilgiri-tahr",
    label: "Nilgiri Tahr",
    icon: <Mountain size={20} />,
    /*  children: [
      {
        id: "portrait",
        label: "portrait",
        icon: <ImageIcon size={18} />,
      },
      {
        id: "landscape",
        label: "landscape",
        icon: <ImageIcon size={18} />,
      },
      {
        id: "group",
        label: "Nilgiri tahr group",
        icon: <ImageIcon size={18} />,
      },
    ], */
  },
  {
    id: "our-work",
    label: "Our Work",
    icon: <Camera size={20} />,
  },

  {
    id: "radio-collaring",
    label: "Radio Collaring",
    icon: <Megaphone size={20} />,
    /*  children: [
      {
        id: "assciate-flora",
        label: "Associate Flora",
        icon: <ImageIcon size={18} />,
      },
      {
        id: "assoca",
        label: "Associate Flora",
        icon: <ImageIcon size={18} />,
      },
      {
        id: "assiate-fla",
        label: "Associate Flora",
        icon: <ImageIcon size={18} />,
      },
    ], */
  },
];

interface OrbitStyle {
  orbitColor: string;
  childColor: string;
  electronColor?: string; // used for main electron (node) color
  childSize: number;
  orbitOffset: (
    cx: number,
    cy: number,
    angle: number,
    radius: number
  ) => { cx: number; cy: number };
  childAngleOffset?: number;
  childLayout: (
    i: number,
    total: number,
    orbitCx: number,
    orbitCy: number,
    childRadius: number
  ) => { x: number; y: number };
}

const DEFAULT_ORBIT_STYLE: OrbitStyle = {
  orbitColor: "rgba(200,200,200,0.6)",
  childColor: "rgba(200,200,200,0.9)",
  electronColor: "rgba(200,200,200,1)",
  childSize: 38,
  orbitOffset: (cx, cy) => ({ cx, cy }),
  childLayout: (i, total, cx, cy, r) => {
    const angle = (i / total) * Math.PI * 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  },
};

const ORBIT_STYLES: Record<string, OrbitStyle> = {
  "associate-fauna": {
    orbitColor: "rgba(54, 162, 235, 0.8)",
    childColor: "rgba(54, 162, 235, 0.9)",
    electronColor: "rgba(54,162,235,1)",
    childSize: 48,
    // Orbit circle sits to the right
    orbitOffset: (cx, cy, angle, radius) => ({ cx: cx + radius * 1.2, cy }),
    childLayout: (i, total, cx, cy, r) => {
      const angle = -Math.PI / 6 + (i / (total - 1 || 1)) * (Math.PI / 3);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      // manual tweaks per child index
      if (i === 0) return { x: x - 200, y: y - 50 }; // shift right
      if (i === 1) return { x: x - 80, y: y - 40 }; // shift up
      if (i === 2) return { x: x - 100, y: y - 20 }; // shift down
      return { x, y };
    },
  },
  "nilgiri-tahr": {
    orbitColor: "rgba(255, 206, 86, 0.8)",
    childColor: "rgba(255, 206, 86, 0.9)",
    electronColor: "rgba(255, 206, 86, 0.9)",
    childSize: 42,
    orbitOffset: (cx, cy, angle, radius) => ({ cx, cy: cy + radius * 1.2 }),
    childLayout: (i, total, cx, cy, r) => {
      // Fan upwards in an arc
      const angle = -Math.PI / 3 + (i / (total - 1 || 1)) * (Math.PI / 1.5);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      // manual tweaks per child index
      if (i === 0) return { x: x - 250, y: y + 130 }; // shift right
      if (i === 1) return { x: x - 80, y: y - 40 }; // shift up
      if (i === 2) return { x: x - 180, y: y - 80 }; // shift down
      return { x, y };
    },
  },

  "radio-collaring": {
    orbitColor: "rgba(255, 99, 132, 0.8)",
    childColor: "rgba(255, 99, 132, 0.9)",
    electronColor: "rgba(255, 99, 132, 0.9)",
    childSize: 44,

    orbitOffset: (cx, cy, angle, radius) => ({ cx, cy: cy - radius * 2 }),
    childLayout: (i, total, cx, cy, r) => {
      // Fan upwards in an arc
      const angle = -Math.PI / 3 + (i / (total - 1 || 1)) * (Math.PI / 1.5);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      // manual tweaks per child index
      if (i === 0) return { x: x - 250, y: y + 130 }; // shift right
      if (i === 1) return { x: x - 190, y: y - 150 }; // shift up
      if (i === 2) return { x: x + 5, y: y - 180 }; // shift down
      return { x, y };
    },
  },
  "our-work": {
    orbitColor: "rgba(82, 183, 136, 0.8)",
    childColor: "rgba(82, 183, 136, 0.9)",
    electronColor: "rgba(82, 183, 136, 0.9)",
    childSize: 40,
    orbitOffset: (cx, cy, angle, radius) => ({
      cx: cx - radius * 1.2,
      cy,
    }),
    childLayout: (i, total, cx, cy, r) => {
      // Fan upwards in an arc
      const angle = -Math.PI / 3 + (i / (total - 1 || 1)) * (Math.PI / 1.5);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      // manual tweaks per child index
      if (i === 0) return { x: x - 250, y: y + 130 }; // shift right
      if (i === 1) return { x: x - 190, y: y - 150 }; // shift up
      if (i === 2) return { x: x - 180, y: y - 80 }; // shift down
      return { x, y };
    },
  },
};
const DIRECT_NODE_LINKS: Record<string, string> = {
  "associate-fauna": "/photo-gallery?category=AssociateFauna",
  "nilgiri-tahr": "/photo-gallery?category=NilgiriTahr",
  "radio-collaring": "/photo-gallery?category=RadioCollared",
  "our-work": "/photo-gallery?category=OurWork",
};

const CHILD_LINKS: Record<string, string> = {
  portrait: "/photo-gallery/nilgiri-tahr/portrait",
  landscape: "/photo-gallery/nilgiri-tahr/landscape",
  group: "/photo-gallery/nilgiri-tahr/group",
  "assciate-flora": "/photo-gallery/exhibition/associate-flora-a",
  assoca: "/photo-gallery/exhibition/associate-flora-b",
  "assiate-fla": "/photo-gallery/exhibition/associate-flora-c",
};

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

  const outerRadius = Math.min(box.w, box.h) * 0.32;
  const childOffsetBase = Math.min(box.w, box.h) * 0.46;
  const childRadius = Math.min(box.w, box.h) * 0.22;
  const childNodeGap = 16;
  const safePad = 8;
  const childOffset = Math.min(box.w, box.h) * 0.26;

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
    onSelect(id);
    if (DIRECT_NODE_LINKS[id]) {
      window.location.href = DIRECT_NODE_LINKS[id];
      return;
    }

    // toggle expand only for nodes that have children
    const node = ATOM_NODES.find((n) => n.id === id);
    if (node?.children && node.children.length > 0) {
      setExpandedId((prev) => (prev === id ? null : id));
    } else {
      // no children and no direct link — just collapse any open
      setExpandedId(null);
    }
  };

  const handleChildClick = (childId: string) => {
    onSelect(childId);
    if (CHILD_LINKS[childId]) {
      window.location.href = CHILD_LINKS[childId];
    }
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
            const orbitStyle = ORBIT_STYLES[n.id] || DEFAULT_ORBIT_STYLE;
            const { cx: finalCx, cy: finalCy } = orbitStyle.orbitOffset(
              cx,
              cy,
              n.angle,
              childRadius
            );
            return (
              <g key={`child-orbit-${n.id}`}>
                <circle
                  cx={finalCx}
                  cy={finalCy}
                  r={childRadius}
                  fill="none"
                  stroke={orbitStyle.orbitColor}
                  strokeWidth="2"
                />
              </g>
            );
          })}
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
            const orbitStyle = ORBIT_STYLES[n.id] || DEFAULT_ORBIT_STYLE; // FIX: compute style outside JSX to avoid TS errors
            const bg =
              orbitStyle.electronColor || DEFAULT_ORBIT_STYLE.electronColor;
            const sizePx = Math.max(56, box.w * 0.07);
            return (
              <motion.button
                key={n.id}
                style={{
                  left: `${n.ex - 30}px`,
                  top: `${n.ey - 30}px`,
                  transform: "translate(-50%, -50%)",
                  width: `${Math.max(56, box.w * 0.07)}px`,
                  height: `${Math.max(56, box.w * 0.07)}px`,
                  backgroundColor: bg,
                }}
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
              >
                {n.icon}
                <span
                  className={styles.electronLabel}
                  style={{
                    transform: `translate(${
                      Math.cos(n.angle) * (box.w * 0.12)
                    }px, 
                              ${Math.sin(n.angle) * (box.h * 0.09)}px)`,
                    fontSize: `${clamp(box.w * 0.025, 12, 16)}px`,
                  }}
                >
                  {n.label}
                </span>
              </motion.button>
            );
          })}

        {/* Child electrons on their own orbit */}
        {/* Child electrons on their own orbit */}
        {showOuterOrbit &&
          nodesWithPos.map((n) => {
            if (expandedId !== n.id || !n.children?.length) return null;

            const { cx, cy } = getChildOrbitCenter(n);
            const orbitStyle = ORBIT_STYLES[n.id] || {
              orbitOffset: (cx: number, cy: number) => ({ cx, cy }),
              childLayout: (
                i: number,
                total: number,
                cx: number,
                cy: number,
                r: number
              ) => {
                // fallback: circular layout
                const angle = (i / total) * Math.PI * 2;
                return {
                  x: cx + r * Math.cos(angle),
                  y: cy + r * Math.sin(angle),
                };
              },
              childSize: 38,
              childColor: "rgba(200,200,200,0.9)",
            };

            const { cx: finalCx, cy: finalCy } = orbitStyle.orbitOffset(
              cx,
              cy,
              n.angle,
              childRadius
            );
            const C = n.children.length;
            return n.children.map((ch, i) => {
              const { x, y } = orbitStyle.childLayout(
                i,
                C,
                finalCx,
                finalCy,
                childRadius + 60
              );

              return (
                <motion.button
                  key={ch.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: x - finalCx,
                    y: y - finalCy,
                  }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    type: "spring",
                    stiffness: 80,
                  }}
                  className={styles.childElectron}
                  data-parent={n.id}
                  style={{
                    left: `${finalCx}px`,
                    top: `${finalCy}px`,
                    transform: "translate(-50%, -50%)",
                    width: `${orbitStyle.childSize}px`,
                    height: `${orbitStyle.childSize}px`,
                    backgroundColor: orbitStyle.childColor,
                  }}
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
