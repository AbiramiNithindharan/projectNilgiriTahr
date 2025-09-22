import Image from "next/image";
import styles from "./tiger-reserves.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Tiger Reserves</h1>
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
        {/* Content Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Tiger Reserves (3)</h2>
          <p className={styles.cardDescription}>
            Tiger Reserves provide the{" "}
            <strong>highest degree of protection</strong> under India’s Wildlife
            Protection Act, benefiting Nilgiri Tahr populations through strict
            habitat preservation and funding support. Three major tiger reserves
            overlap with Tahr habitats:
          </p>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>
              1. Kalakkad Mundanthurai Tiger Reserve (KMTR)
            </h3>
            <p className={styles.cardText}>
              Located in the southernmost part of Tamil Nadu, KMTR encompasses a
              wide range of habitats, from tropical evergreen forests to
              high-altitude grasslands. It harbors genetically diverse
              populations of Nilgiri Tahr and provides essential connectivity to
              the Agasthyamalai Biosphere Reserve.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>
              2. Anamalai Tiger Reserve (ATR)
            </h3>
            <p className={styles.cardText}>
              Spread across Coimbatore and Pollachi, ATR is a critical landscape
              where montane grasslands meet tropical forests. Grass Hills within
              ATR are one of the most important strongholds for Nilgiri Tahr
              populations.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>
              3. Srivilliputhur Megamalai Tiger Reserve (SMTR)
            </h3>
            <p className={styles.cardText}>
              This newly designated reserve is vital for linking fragmented
              habitats, particularly in Meghamalai and Grizzled Squirrel
              Wildlife Sanctuary regions. It also provides corridors for other
              endangered species alongside Nilgiri Tahr.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
