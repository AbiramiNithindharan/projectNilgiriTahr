"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PosterClient.module.css";

export default function PosterClient({ news }: { news: any }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={styles.posterContainer}
    >
      {/* Title */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={styles.posterTitle}
      >
        {news.title}
      </motion.h1>

      {/* Published Date */}
      {news.publishedAt && (
        <p className={styles.posterMeta}>
          {new Date(news.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <div className={styles.singlePosterWrapper}>
        <Image
          src={news.image.asset.url}
          alt={news.image.alt || news.title}
          width={800}
          height={1000}
          className={styles.singlePosterImage}
        />
        {news.caption && <p className={styles.posterCaption}>{news.caption}</p>}

        {news.downloadableFile?.asset?.url && (
          <a
            href={news.downloadableFile.asset.url}
            download={news.downloadableFile.asset.originalFilename}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadButton}
          >
            Download Poster
          </a>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <Image
                src={activeImage}
                alt="Enlarged poster"
                fill
                className={styles.lightboxImage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
