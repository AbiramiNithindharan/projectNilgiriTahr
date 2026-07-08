"use client";
import { useCart } from "@/context/CartContext";
import styles from "./cart.module.css";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, clearCart, removeFromCart } = useCart();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery;

  // 🔹 Confirm remove single item
  const handleRemoveItem = (id: string, size: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item from your cart?",
    );
    if (confirmDelete) removeFromCart(id, size);
  };

  // 🔹 Confirm clear entire cart
  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your entire cart?",
    );
    if (confirmClear) clearCart();
  };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartContainer}>
          {/* ✅ LEFT - Product List */}
          <div className={styles.cartItems}>
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}`} className={styles.item}>
                <Link
                  className={styles.clickable}
                  href={`/e-com/store/${item.id}`}
                >
                  <img src={item.image_url} alt={item.name} />
                </Link>
                <div className={styles.details}>
                  <Link
                    className={styles.clickable}
                    href={`/e-com/store/${item.id}`}
                  >
                    <h3>{item.name}</h3>
                  </Link>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>Qty: {item.quantity || 1}</p>
                  <p>Total: ₹{item.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id, item.size)}
                  className={styles.removeBtn}
                >
                  ✖
                </button>
              </div>
            ))}
            <button onClick={handleClearCart} className={styles.clearBtn}>
              🗑️ Clear Cart
            </button>
          </div>

          {/* ✅ RIGHT - Totals */}
          <div className={styles.summary}>
            <h2>Cart Totals</h2>
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
            <Link href={"/e-com/checkout"}>
              <button className={styles.checkoutBtn}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
