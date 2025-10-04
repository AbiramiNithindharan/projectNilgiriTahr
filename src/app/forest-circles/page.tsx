import Image from "next/image";
import styles from "./forest-circles.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Forest Circles</h1>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImage}>
          <Image
            src="/gallery/forest-circles.JPG"
            alt="Nilgiri Tahr"
            fill
            className={styles.image}
            priority
          />
        </div>

        {/* Content Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Forest Circles (5)</h2>
          <p className={styles.cardDescription}>
            Forest circles represent the highest level of administrative
            management in the state forest structure. Each circle oversees
            multiple forest divisions, ensuring coordination of conservation
            activities such as synchronized surveys, anti-poaching measures, and
            ecological restoration projects.
          </p>

          <h3 className={styles.subHeading}>
            Key Forest Circles Managing Nilgiri Tahr Habitats:
          </h3>
          <ul className={styles.list}>
            <li>
              <strong>Mudumalai Tiger Reserve Circle (MTR)</strong> – Protects
              northern Tahr populations in the Nilgiris region.
            </li>
            <li>
              <strong>Anamalai Tiger Reserve Circle (ATR)</strong> – Connects
              fragmented high-altitude grasslands across Coimbatore and Pollachi
              areas.
            </li>
            <li>
              <strong>
                Srivilliputhur Megamalai Tiger Reserve Circle (SMTR)
              </strong>{" "}
              – Oversees critical southern landscapes including Megamalai and
              Grizzled Squirrel habitats.
            </li>
            <li>
              <strong>Dindigul Circle</strong> – Encompasses Kodaikanal and
              associated hill ranges.
            </li>
            <li>
              <strong>Kalakkad Mundanthurai Tiger Reserve Circle (KMTR)</strong>{" "}
              – Focuses on the southernmost Tahr populations near Agasthyamalai.
            </li>
          </ul>

          <p className={styles.cardFooter}>
            These circles provide policy direction and coordinate resources
            across divisions, linking field operations with state-level
            planning.
          </p>
        </div>
      </div>
    </div>
  );
}
