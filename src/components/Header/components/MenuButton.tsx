import { motion } from "framer-motion";

interface MenuButtonProps {
  onClick: () => void;
  variant: "default" | "compact";
}

export default function MenuButton({ onClick, variant }: MenuButtonProps) {
  const isCompact = variant === "compact";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: isCompact ? "0.4rem" : "clamp(0.6rem, 1.5vw, 0.8rem)",
        display: "flex",
        flexDirection: "column",
        gap: isCompact ? "2px" : "clamp(3px, 0.7vw, 5px)",
        transition: "all 0.3s ease",
        width: isCompact ? "32px" : "clamp(40px, 7vw, 50px)",
        height: isCompact ? "32px" : "clamp(40px, 7vw, 50px)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: isCompact ? "6px" : "8px",
        marginLeft: isCompact ? "auto" : "0",
        flexShrink: 0,
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
      <span
        style={{
          width: isCompact ? "20px" : "clamp(20px, 4vw, 28px)",
          height: isCompact ? "2px" : "3px",
          background: "#f8fcfaff",
          borderRadius: isCompact ? "1px" : "2px",
          transition: "all 0.3s ease",
        }}
      />
      <span
        style={{
          width: isCompact ? "20px" : "clamp(20px, 4vw, 28px)",
          height: isCompact ? "2px" : "3px",
          background: "#f8fcfaff",
          borderRadius: isCompact ? "1px" : "2px",
          transition: "all 0.3s ease",
        }}
      />
      <span
        style={{
          width: isCompact ? "20px" : "clamp(20px, 4vw, 28px)",
          height: isCompact ? "2px" : "3px",
          background: "#f8fcfaff",
          borderRadius: isCompact ? "1px" : "2px",
          transition: "all 0.3s ease",
        }}
      />
    </motion.button>
  );
}
