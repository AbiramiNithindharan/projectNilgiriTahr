"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Twitter,
  Instagram,
  ExternalLink,
} from "lucide-react";
import styles from "./Footer.module.css";

type ImportantLink = { label: string; href: string; external?: boolean };

export default function Footer({
  companyName = "Project Nilgiri Thar.",
  address = "Office of Project Director, Project Nilgiri Tahr, Bharathi Park Road, Forest Campus Coimbatore, Tamil Nadu 641043.",
  email = "projectnilgiritahr@gmail.com",
  phone = "pd.pnt@tn.gov.in",
  importantLinks = [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/who-we-are" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Where We Work", href: "/protective-areas-admin-units" },
  ] as ImportantLink[],
  social = {
    twitter: "https://x.com/ProjectTahr?s=08",
    instagram:
      "https://www.instagram.com/project_nilgiri_tahr/?igsh=ZDFjc2N3d3Z3b295#",
  },
}: {
  companyName?: string;
  address?: string;
  email?: string;
  phone?: string;
  importantLinks?: ImportantLink[];
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}) {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d15665.025783948167!2d76.949385!3d11.019376!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDAxJzA5LjgiTiA3NsKwNTYnNTcuOCJF!5e0!3m2!1sen!2sin!4v1759381293441!5m2!1sen!2sin";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };
  return (
    <motion.section
      className={styles.section}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Address / Contact */}
            <div>
              <h3
                className={styles.company}
                style={{
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {companyName}
              </h3>
              <address className={styles.address}>
                <div className={styles.row}>
                  <MapPin className={styles.iconLarge} />
                  <a
                    href={mapEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {address}
                  </a>
                </div>
                <div className={styles.contactLinks}>
                  <h3
                    className={styles.company}
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Email
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className={styles.row}
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Mail className={styles.iconSmall} /> {email}
                  </a>
                  <a
                    href={`tel:${phone}`}
                    className={styles.row}
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Mail className={styles.iconSmall} /> {phone}
                  </a>
                </div>
              </address>
            </div>

            {/* Map */}
            <div>
              <h4
                className={styles.heading}
                style={{
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Find us on map
              </h4>
              <div className={styles.mapEmbedWrapper}>
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          {/* Socials */}
          <div
            className={styles.socialLink}
            style={{
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <h4
              className={styles.heading}
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Connect with us
            </h4>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
              className={styles.subtext}
            >
              Follow our socials for updates and news.
            </p>
            <div className={styles.socials}>
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className={styles.icon} />
                </a>
              )}

              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className={styles.icon} />
                </a>
              )}
            </div>
          </div>

          <div className={styles.bottomBar}>
            <div className={styles.copyright}>
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </motion.section>
  );
}
