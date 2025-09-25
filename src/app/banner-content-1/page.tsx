import Image from "next/image";
import styles from "./banner-content-1.module.css";

export default function NilgiriTahrInfoPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>Nilgiri Tahr</h1>
          <p className={styles.subtitle}>
            The Endangered Mountain ungulates of western ghats.
          </p>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImage}>
          <Image
            src="/banners/DJI_0036.jpg"
            alt="Nilgiri Tahr"
            fill
            className={styles.image}
            priority
          />
        </div>

        {/* Content Card */}
        <div className={styles.card}>
          <p>
            The state animal of Tamil Nadu, the{" "}
            <strong>
              Nilgiri Tahr (<i>Nilgiritragus hylocrius</i>)
            </strong>
            , inhabits the verdant sub-alpine grasslands of the Western Ghats,
            spanning Tamil Nadu and Kerala. It was declared state animal of
            Tamil Nadu in the year 1988.
          </p>

          <p>
            Classified as endangered, these rare mountain-dwelling ungulates are
            exclusive to the Southern Western Ghats, and receive the{" "}
            <strong>highest level of legal protection under Schedule-I</strong>{" "}
            of the Wildlife Protection Act, 1972. Culturally and ecologically
            significant, Nilgiri Tahrs are even referred in the{" "}
            <em>ancient Sangam literature</em>.
          </p>

          <p>
            These mammals are social by nature, typically forming herds
            consisting of adult females, their young, and occasionally males –
            especially during the mating (rutting) season. Outside of this
            period, males often form separate bachelor groups or lead solitary
            lives, while females tend to stay in cohesive groups.
          </p>
        </div>
      </div>
    </div>
  );
}
