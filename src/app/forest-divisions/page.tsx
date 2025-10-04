import Image from "next/image";
import styles from "./forest-divisions.module.css";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Forest Divisions</h1>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImage}>
          <Image
            src="/gallery/forest-divisions.JPG"
            alt="Nilgiri Tahr"
            fill
            className={styles.image}
            priority
          />
        </div>

        {/* Content Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Forest Divisions (14)</h2>
          <p className={styles.cardDescription}>
            The Nilgiri Tahr landscape is divided into{" "}
            <strong>14 forest divisions</strong>, split between tiger reserve
            and non-tiger reserve areas. These divisions act as primary
            operational units, directly responsible for on-ground implementation
            of conservation plans, research activities, eco-tourism management,
            and community outreach.
          </p>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>Tiger Reserve Divisions (7)</h3>
            <ul className={styles.list}>
              <li>Mudumalai</li>
              <li>Srivilliputhur</li>
              <li>Megamalai</li>
              <li>Anamalai</li>
              <li>Mundanthurai</li>
              <li>Kalakad</li>
              <li>Ambasamudram</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>
              Non-Tiger Reserve Divisions (7)
            </h3>
            <ul className={styles.list}>
              <li>Coimbatore</li>
              <li>Pollachi</li>
              <li>Tiruppur</li>
              <li>Gudalur</li>
              <li>Nilgiris</li>
              <li>Kodaikanal</li>
              <li>Kanyakumari</li>
            </ul>
          </div>

          <p className={styles.cardFooter}>
            Each division develops localized action plans for habitat
            restoration, Nilgiri Tahr monitoring, and enforcement activities
            such as anti-poaching patrols and fire control.
          </p>
        </div>
      </div>
    </div>
  );
}
