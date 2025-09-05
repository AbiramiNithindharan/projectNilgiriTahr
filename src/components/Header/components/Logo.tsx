import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
  src: string;
  alt: string;
  size: "small" | "large" | "medium";
  delay?: number;
  isVisible?: boolean;
}

export default function Logo({
  src,
  alt,
  size,
  delay = 0,
  isVisible = true,
}: LogoProps) {
  const dimensions =
    size === "small" ? "clamp(40px, 6vw, 50px)" : "clamp(100px, 18vw, 90px)";
  /*   if (size === "small") {
    let dimensions = "clamp(40px, 6vw, 50px)";
    return dimensions;
  } else if (size === "large") {
    let dimensions = "clamp(100px, 18vw, 90px)";
    return dimensions;
  } else if (size === "medium") {
    let dimensions = "clamp(20px, 4vw, 40px)";
    return dimensions;
  } */

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={isVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
      transition={{ delay, duration: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: dimensions,
        height: dimensions,
        position: "relative",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.background = "rgba(27, 67, 50, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </motion.div>
  );
}
