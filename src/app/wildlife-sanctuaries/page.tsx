import Image from "next/image";
import styles from "./wildlife-sanctuaries.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Wildlife Sanctuaries</h1>
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
          <h2 className={styles.cardTitle}>Wildlife Sanctuaries (6)</h2>
          <p className={styles.cardDescription}>
            Wildlife sanctuaries act as <strong>buffer areas</strong> around
            core habitats, providing connectivity and space for species to move
            between protected regions. The six key sanctuaries supporting
            Nilgiri Tahr populations are:
          </p>

          <ul className={styles.list}>
            <li>
              <strong>Kodaikanal Wildlife Sanctuary</strong> – Safeguards upper
              hill grasslands.
            </li>
            <li>
              <strong>Nellai Wildlife Sanctuary</strong> – Recently confirmed as
              Tahr habitat during the 2025 synchronized survey.
            </li>
            <li>
              <strong>Kanyakumari Wildlife Sanctuary</strong> – Southern limit
              of Nilgiri Tahr range.
            </li>
            <li>
              <strong>Mundanthurai Wildlife Sanctuary</strong> – A part of KMTR
              landscape.
            </li>
            <li>
              <strong>Grizzled Squirrel Wildlife Sanctuary</strong> – Provides
              ecological corridors to adjacent tiger reserves.
            </li>
            <li>
              <strong>Indira Gandhi Wildlife Sanctuary</strong> – Supports both
              forest and grassland ecosystems for multiple species.
            </li>
          </ul>

          <p className={styles.cardFooter}>
            These sanctuaries are critical for dispersal and maintaining genetic
            diversity within the Nilgiri Tahr population.
          </p>
        </div>
      </div>
    </div>
  );
}
