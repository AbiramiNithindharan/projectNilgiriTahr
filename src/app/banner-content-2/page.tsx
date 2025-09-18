import Image from "next/image";
import styles from "./banner-content-2.module.css";

export default function NilgiriTahrPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Project Nilgiri Tahr</h1>
          <p className={styles.subtitle}>
            Conserving Tamil Nadu’s State Animal – The Endangered Nilgiri Tahr
          </p>
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
          <p>
            As per the <strong>G.O. (MS).No. 222</strong> environment, climate
            change and forest, Honourable Chief Minister,{" "}
            <span className={styles.bold}>Thiru. M. K. Stalin</span>, on October
            12, 2023 launched <strong>Project Nilgiri Tahr</strong> and Project
            Director office has been opened at Forest Campus, Coimbatore on
            12.10.2023.
          </p>

          <p>
            The <strong>Nilgiri Tahr (Varaiyadu)</strong> is the State animal of
            Tamil Nadu and is an endangered, endemic ungulate. To conserve and
            protect this state animal, a dedicated scientific research team and
            the Project Director’s office have been established in Coimbatore.
          </p>

          <h2 className={styles.subheading}>Project Components</h2>
          <ul className={styles.list}>
            <li>Administrative setup</li>
            <li>Annual synchronized surveys</li>
            <li>Radio collaring of the Nilgiri Tahr</li>
            <li>Restoration of shola grasslands</li>
            <li>Disease diagnostics</li>
            <li>Reintroduction programs</li>
            <li>Implementation of ecotourism</li>
            <li>Conservation education and outreach</li>
          </ul>

          <p>
            To commemorate the birth anniversary of{" "}
            <strong>E.R.C. Davidar</strong>, who pioneered conservation efforts
            for the Nilgiri Tahr, his birth date,{" "}
            <span className={styles.bold}>7th October</span> has been declared
            as <span className={styles.italic}>“Nilgiri Tahr Day”</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
