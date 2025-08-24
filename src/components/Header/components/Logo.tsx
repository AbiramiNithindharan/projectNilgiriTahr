import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
  src: string;
  alt: string;
  size: "small" | "large";
  delay?: number;
  isVisible?: boolean;
}

export default function Logo({ 
  src, 
  alt, 
  size, 
  delay = 0, 
  isVisible = true 
}: LogoProps) {
  const dimensions = size === "small" 
    ? "clamp(40px, 6vw, 50px)"
    : "clamp(100px, 18vw, 90px)";

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
