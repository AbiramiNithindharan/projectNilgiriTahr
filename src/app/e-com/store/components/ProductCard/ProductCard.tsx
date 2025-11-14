"use client";

import Link from "next/link";
import styles from "./ProductCard.module.css";

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/e-com/store/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image_url || "/placeholder.png"}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>₹{product.price}</p>
      </div>
    </Link>
  );
}
