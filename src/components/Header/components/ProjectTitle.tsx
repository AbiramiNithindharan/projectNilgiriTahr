import { motion } from "framer-motion";

interface ProjectTitleProps {
  title: string;
}

export default function ProjectTitle({ title }: ProjectTitleProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "1rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(14px, 2.5vw, 20px)",
          fontWeight: "700",
          margin: "0",
          color: "#1b4332",
          fontFamily: "Poppins, sans-serif",
          lineHeight: "1.2",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </h1>
    </motion.div>
  );
}
