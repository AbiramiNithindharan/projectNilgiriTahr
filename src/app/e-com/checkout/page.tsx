"use client";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  async function handlePayment() {
    const res = await fetch("/api/razorpay-order", { method: "POST" });
    const data = await res.json();
    // Use Razorpay checkout here
  }

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      <button onClick={handlePayment} className={styles.payBtn}>
        Proceed to Pay
      </button>
    </div>
  );
}
