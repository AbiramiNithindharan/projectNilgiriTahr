"use client";

import { motion } from "framer-motion";

export default function WhoWeAreCards() {
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut", // use a valid string easing from Framer Motion
      } as const,
    },
  };

  return (
    <section
      style={{
        padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem) 0",
        background: "#fffcf8",
      }}
    >
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Our Team Heading */}
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "700",
            color: "#573f29",
            margin: "0 0 1rem 0",
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(135deg, #432e1b, #503c16, #b7a052)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our Team
        </h2>
        <p
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            color: "#6b7280",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "400",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Meet the dedicated professionals committed to protecting and
          conserving the endangered Nilgiri Tahr
        </p>
      </motion.div>
    </section>
  );
}
