import styles from "./order_success.module.css";

export default function SuccessPage() {
  return (
    <div className={styles.container}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
    </div>
  );
}
