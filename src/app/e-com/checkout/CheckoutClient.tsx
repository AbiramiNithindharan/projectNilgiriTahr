"use client";

import { useCart } from "@/context/CartContext";
import styles from "./checkout.module.css";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Order Submitted:", form);
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Puducherry",
  ];

  return (
    <div className={styles.checkoutPage}>
      <h1 className={styles.heading}>Secure Checkout</h1>

      <div className={styles.container}>
        {/* ---- Order Summary (Top on Mobile) ---- */}
        <div className={styles.summary}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          <div className={styles.itemsList}>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.item}>
                <img src={item.image_url} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderTotals}>
            <div className={styles.line}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className={styles.line}>
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>
            <div className={styles.total}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* ---- Contact Form (Wider Section) ---- */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <p className={styles.secureNote}>
            We'll use this email to send you details and updates about your
            order
          </p>
          <input
            className={styles.input}
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email address"
          />

          <h2 className={styles.sectionTitle}>Shipping Address</h2>
          <div className={styles.row}>
            <input
              className={styles.input}
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="First Name"
            />

            <input
              className={styles.input}
              required
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Last Name"
            />
          </div>

          <textarea
            className={styles.textarea}
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Address"
          />

          <div className={styles.row}>
            <input
              className={styles.input}
              required
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="City"
            />

            <select
              className={styles.input}
              required
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <input
              className={styles.input}
              required
              type="text"
              maxLength={6}
              value={form.pincode}
              placeholder="Pincode"
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            />

            <input
              className={styles.input}
              required
              type="tel"
              maxLength={10}
              value={form.phone}
              placeholder="Phone Number"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <h2 className={styles.sectionTitle}>Payment Method</h2>
          <div className={styles.paymentBox}>
            <div className={styles.secureNote}>
              Secure Online Payment via RazorPay.
            </div>
            <div className={styles.secureNote}>
              Pay via Internet Banking, Credit Or Debit Card, UPI etc.,
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirm & Proceed Securely
          </button>
        </form>
      </div>
    </div>
  );
}
