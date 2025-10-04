import { motion } from "framer-motion";

interface ProjectTitleProps {
  title: string;
  isScrolled: boolean;
}

export default function ProjectTitle({ title, isScrolled }: ProjectTitleProps) {
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
      {isScrolled ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(12px, 2vw, 16px)",
              fontWeight: "700",
              margin: "0",
              color: "#52b788",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.1",
              whiteSpace: "nowrap",
            }}
          >
            Project Nilgiri Tahr
          </h1>
          <h2
            style={{
              fontSize: "clamp(10px, 1.8vw, 14px)",
              fontWeight: "600",
              margin: "0",
              color: "#52b788",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "1.1",
              whiteSpace: "nowrap",
            }}
          >
            நீலகிரி வரையாடு திட்டம்
          </h2>
        </div>
      ) : (
        <h1
          style={{
            fontSize: "clamp(14px, 2.5vw, 20px)",
            fontWeight: "700",
            margin: "0",
            color: "#f9fefcff",
            fontFamily: "Poppins, sans-serif",
            lineHeight: "1.2",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
      )}
    </motion.div>
  );
}
