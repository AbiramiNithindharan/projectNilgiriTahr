"use client";

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
  address = "Office of Project Director, Project Nilgiri Tahr, Bharathi Park Road, Forest Campus Coimbatore, Tmail Nadu 641043.",
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
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Address / Contact */}
          <div>
            <h3 className={styles.company}>{companyName}</h3>
            <address className={styles.address}>
              <div className={styles.row}>
                <MapPin className={styles.iconLarge} />
                <a href={mapEmbedUrl} target="_blank" rel="noopener noreferrer">
                  {address}
                </a>
              </div>
              <div className={styles.contactLinks}>
                <h3 className={styles.company}>Email</h3>
                <a href={`mailto:${email}`} className={styles.row}>
                  <Mail className={styles.iconSmall} /> {email}
                </a>
                <a href={`tel:${phone}`} className={styles.row}>
                  <Mail className={styles.iconSmall} /> {phone}
                </a>
              </div>
            </address>
          </div>

          {/* Important Links */}
          <div>
            <h4 className={styles.heading}>Important Links</h4>
            <ul className={styles.links}>
              {importantLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} <ExternalLink className={styles.iconXSmall} />
                    </a>
                  ) : (
                    <Link href={l.href}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className={styles.heading}>Find us on map</h4>
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

          {/* Socials */}
          <div>
            <h4 className={styles.heading}>Connect with us</h4>
            <p className={styles.subtext}>
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
            <div className={styles.copyright}>
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomText}>
            Made with care • Accessible • GDPR-aware
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
