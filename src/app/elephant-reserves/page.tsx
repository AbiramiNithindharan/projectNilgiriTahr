import Image from "next/image";
import styles from "./elephant-reserves.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Elephant Reserves</h1>
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
          <h2 className={styles.cardTitle}>Elephant Reserves (5)</h2>
          <p className={styles.cardDescription}>
            Elephant reserves play a <strong>dual role</strong> by protecting
            elephants while also safeguarding habitats shared with Nilgiri Tahr.
            These reserves maintain ecological balance by conserving corridors
            and minimizing human-wildlife conflicts.
          </p>

          <h3 className={styles.subHeading}>
            Elephant Reserves in the Nilgiri Tahr Landscape:
          </h3>
          <ul className={styles.list}>
            <li>Nilgiri Elephant Reserve</li>
            <li>Coimbatore Elephant Reserve</li>
            <li>Anamalai Elephant Reserve</li>
            <li>Srivilliputhur Elephant Reserve</li>
            <li>Agasthyamalai Elephant Reserve</li>
          </ul>

          <p className={styles.cardFooter}>
            These reserves enhance landscape-level conservation and ensure that
            management plans benefit both elephants and Tahrs by addressing
            common threats like deforestation, poaching, and habitat
            fragmentation.
          </p>
        </div>
      </div>
    </div>
  );
}
