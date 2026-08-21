import styles from "./LoadingDots.module.css";

type LoadingDotsProps = {
  /** `green` for dots on a card, `light` for dots on the gradient buttons */
  tone?: "green" | "light";
  size?: "sm" | "md" | "lg";
  /** Announced to screen readers — bare dots announce nothing */
  label?: string;
};

export default function LoadingDots({
  tone = "green",
  size = "md",
  label = "Loading",
}: LoadingDotsProps) {
  return (
    <span
      className={`${styles.dots} ${styles[tone]} ${styles[size]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.srOnly}>{label}</span>
    </span>
  );
}
