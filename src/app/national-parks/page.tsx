import Image from "next/image";
import styles from "./national-parks.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>National Parks</h1>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImage}>
          <Image
            src="/banners/Banner_2.jpg"
            alt="Nilgiri Tahr"
            fill
            className={styles.image}
            priority
          />
        </div>

        {/* Content Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>National Parks (3)</h2>
          <p className={styles.cardDescription}>
            National Parks provide <strong>core habitats</strong> where human
            activity is strictly regulated, making them essential for breeding
            and long-term survival of Nilgiri Tahrs.
          </p>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>1. Grass Hills National Park</h3>
            <p className={styles.cardText}>
              A unique high-altitude ecosystem in the Anamalai Hills, dominated
              by montane grasslands that form prime Nilgiri Tahr grazing areas.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>2. Mukurthi National Park</h3>
            <p className={styles.cardText}>
              Located in the Nilgiris, Mukurthi is one of the most important
              strongholds for the species, containing pristine shola-grassland
              mosaics. It also serves as a focal point for research and
              eco-tourism initiatives.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>
              3. Kariyan Shola National Park
            </h3>
            <p className={styles.cardText}>
              Though smaller in area, this park protects vital patches of shola
              forests and associated fauna, contributing to the ecological
              integrity of the region.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
