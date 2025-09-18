import Image from "next/image";
import styles from "./biosphere-reserves.module.css";
import { administrativeAreas } from "@/data/administrativeAreas";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Biosphere Reserves</h1>
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
          <h2 className={styles.cardTitle}>Biosphere Reserves (2)</h2>
          <p className={styles.cardDescription}>
            Biosphere reserves represent the{" "}
            <strong>highest level of landscape conservation</strong>,
            integrating core protected zones with sustainable use areas for
            people and nature to coexist. Two biosphere reserves protect Nilgiri
            Tahr habitats:
          </p>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>
              1. Nilgiri Biosphere Reserve (NBR)
            </h3>
            <p className={styles.cardText}>
              Encompasses northern populations, including Mudumalai, Mukurthi,
              and adjoining forests in Kerala and Karnataka. It is a{" "}
              <strong>UNESCO-recognized site</strong> and one of India’s
              earliest biosphere reserves.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subHeading}>
              2. Agasthyamalai Biosphere Reserve (ABR)
            </h3>
            <p className={styles.cardText}>
              Protects southernmost populations near Kanyakumari and Tirunelveli
              districts. ABR’s unique landscapes blend montane grasslands with
              tropical forests, benefiting multiple threatened species including
              Nilgiri Tahr.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
