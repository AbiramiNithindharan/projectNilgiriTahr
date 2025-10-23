"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export default function NewsClient({
  news,
  slug,
}: {
  news: any;
  slug: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        marginTop: "140px",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 3rem)",
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "900px", marginInline: "auto" }}>
        {/* SubTitle */}
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "#1b4332",
            lineHeight: "1.2",
          }}
        >
          {`${news.title} - ${news.category?.title}`}
        </motion.h3>

        {/* Date + Category */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ color: "#555", marginBottom: "1.5rem" }}
        >
          {new Date(news.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          — {news.category?.title}
        </motion.p>

        {/* Hero Image */}
        {news.mainImage?.asset?.url && (
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              width: "100%",
              height: "450px",
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "2rem",
            }}
          >
            <Image
              src={news.mainImage.asset.url}
              alt={news.mainImage.alt || news.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        )}

        {/* Excerpt */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {news.excerpt && (
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "2rem",
              }}
            >
              {news.excerpt}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Body Content */}
          {news.body && (
            <PortableText
              value={news.body}
              components={{
                block: {
                  h2: ({ children }) => <h2>{children}</h2>,
                  h3: ({ children }) => <h3>{children}</h3>,
                  normal: ({ children }) => <p>{children}</p>,
                },
                list: {
                  bullet: ({ children }) => <ul>{children}</ul>,
                  number: ({ children }) => <ol>{children}</ol>,
                },
                listItem: {
                  bullet: ({ children }) => <li>{children}</li>,
                  number: ({ children }) => <li>{children}</li>,
                },
                marks: {
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          )}
        </motion.div>
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href={`/news-categories/${slug}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              style={{
                background: "transparent",
                border: "2px solid #000000",
                color: "#000000",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#000000";
              }}
            >
              Back to Recent News
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
