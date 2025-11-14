import { supabaseAdmin } from "@/lib/supabaseServer";
import dynamic from "next/dynamic";
import styles from "./store.module.css";
const ShopBanner = dynamic(() => import("./components/ShopBanner/ShopBanner"));
const ProductCard = dynamic(
  () => import("./components/ProductCard/ProductCard")
);

export default async function StorePage() {
  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products:", error.message);
    return (
      <p className={styles.error}>
        Unable to load products. Please try again later.
      </p>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className={styles.emptyState}>
        <img
          src="/empty-box.svg"
          alt="No products"
          className={styles.emptyImage}
        />
        <p className={styles.emptyText}>
          No T-shirts available at the moment. Please check back soon.
        </p>
      </section>
    );
  }

  return (
    <>
      <ShopBanner />
      <section id="storeContainer" className={styles.storeContainer}>
        <div className={styles.storeHeader}>
          <h2 className={styles.heading}>Discover Your Style</h2>
          <hr className={styles.divider} />
        </div>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
