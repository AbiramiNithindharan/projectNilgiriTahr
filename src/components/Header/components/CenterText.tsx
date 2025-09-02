import { motion } from "framer-motion";

interface CenterTextProps {
  isVisible: boolean;
}

export default function CenterText({ isVisible }: CenterTextProps) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      style={{
        textAlign: "center",
        color: "#333",
        flex: 1,
        margin: "0 clamp(0.5rem, 2vw, 2rem)",
        minWidth: 0,
      }}
    >
      <h2
        style={{
          fontSize: "clamp(10px, 2vw, 20px)",
          fontWeight: "600",
          letterSpacing: "clamp(0.2px, 0.05vw, 0.8px)",
          margin: "0",
          opacity: "0.9",
          textTransform: "uppercase",
          color: "#ebfaf4ff",
          fontFamily: "Poppins, sans-serif",
          lineHeight: "1.1",
        }}
      >
        Government of Tamil Nadu
      </h2>
      <p
        style={{
          fontSize: "clamp(9px, 1.8vw, 18px)",
          margin: "clamp(1px, 0.3vw, 4px) 0 0 0",
          opacity: "0.85",
          fontWeight: "500",
          letterSpacing: "clamp(0.1px, 0.03vw, 0.3px)",
          color: "#eef2ebff",
          fontFamily: "Poppins, sans-serif",
          lineHeight: "1.1",
        }}
      >
        Tamil Nadu Forest Department
      </p>
      <h1
        style={{
          fontSize: "clamp(11px, 2.5vw, 24px)",
          fontWeight: "800",
          margin: "0",
          background:
            "linear-gradient(135deg, #eff7f4ff, #f2f7f5ff, #f8f9f8ff, #f2f6f4ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "clamp(0.05px, 0.03vw, 0.3px)",
          lineHeight: "1.1",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Project Nilgiri Tahr / நீலகிரி வரையாடு திட்டம்
      </h1>
    </motion.div>
  );
}
