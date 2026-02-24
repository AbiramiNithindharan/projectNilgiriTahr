import Image from "next/image";
import styles from "./ranges.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Ranges</h1>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImage}>
          <Image
            src="/gallery/ranges.JPG"
            alt="Nilgiri Tahr"
            fill
            className={styles.image}
            priority
          />
        </div>

        {/* Content Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Forest Ranges (43)</h2>
          <p className={styles.cardDescription}>
            Ranges form the <strong>field-level backbone</strong> of the
            conservation network, bridging management and ground realities.
            There are <strong>43 ranges</strong> within the Nilgiri Tahr
            landscape, each managed by a Range Officer who supervises beat
            guards, field staff, and frontline workers.
          </p>

          <h3 className={styles.subHeading}>Functions of Ranges:</h3>
          <ul className={styles.list}>
            <li>Conducting synchronized Nilgiri Tahr population surveys.</li>
            <li>
              Implementing invasive species control programs (e.g., removal of
              wattle and eucalyptus).
            </li>
            <li>Coordinating grassland restoration activities.</li>
            <li>
              Monitoring human-wildlife interactions and mitigating conflicts.
            </li>
            <li>Community engagement and eco-tourism initiatives.</li>
          </ul>

          <p className={styles.cardFooter}>
            By decentralizing responsibilities, ranges ensure timely responses
            to conservation challenges, especially in remote high-altitude
            habitats.
          </p>
        </div>
      </div>
    </div>
  );
}
