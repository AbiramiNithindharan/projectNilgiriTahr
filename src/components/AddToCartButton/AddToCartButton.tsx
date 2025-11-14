"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AddToCartButton.module.css";
import { useCart } from "@/context/CartContext";
interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  size?: string;
  quantity?: number;
}

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  onAdd?: () => void;
}

export default function AddToCartButton({
  product,
  disabled,
  onAdd,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (disabled) return;

    addToCart({
      id: product.id,
      name: product.title,
      image_url: product.image_url,
      price: product.price,
      size: product.size,
      quantity: product.quantity ?? 1,
    });

    onAdd?.();

    setAdded(true);
    setShowToast(true);
    setTimeout(() => setAdded(false), 1200);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <motion.button
        onClick={handleAddToCart}
        className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
        disabled={disabled || added}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {added ? "Added!" : "Add to Cart"}
        <span className={styles.ripple}></span>
      </motion.button>

      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            🛒 Added to cart successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
