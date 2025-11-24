"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabaseClient } from "@/lib/supabaseClient";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import styles from "./product_id.module.css";
export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("products")
        .select(
          `
  *,
  product_stock ( size, stock )
`
        )
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching product:", error);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className={styles.loading}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Loading product...
        </motion.div>
      </div>
    );

  if (!product) return <p>Product not found.</p>;

  return <ClientProductView product={product} />;
}

/* ---------------- Client Component ---------------- */
function ClientProductView({ product }: { product: any }) {
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const openZoom = () => {
    setZoom(1);
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
  };

  const handleWheelZoom = (e: any) => {
    e.preventDefault();
    const newZoom = zoom + e.deltaY * -0.001;

    if (newZoom >= 1 && newZoom <= 4) {
      setZoom(newZoom);
    }
  };

  const sizeStock: Record<string, number> = {};
  product.product_stock?.forEach((v: any) => {
    sizeStock[v.size] = v.stock;
  });

  const handleSizeSelect = (selectedSize: string) => {
    if (sizeStock[selectedSize] > 0) {
      setSize(selectedSize);
    }
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!size) return;

    const productData = { ...product, size, quantity };

    setTimeout(() => {
      setSize("");
      setQuantity(1);
    }, 300);
  };
  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Product Image */}
        <motion.div
          className={styles.imageWrapper}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.zoomIcon} onClick={openZoom}>
            🔍
          </div>
          <img
            src={product.image_url}
            alt={product.title}
            onClick={openZoom}
            className={styles.zoomableImage}
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className={styles.details}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>₹{product.price}</p>

          {/* Size Selection */}
          <div className={styles.sizeSection}>
            <h3>Select Size:</h3>
            <div className={styles.sizeOptions}>
              {["S", "M", "L", "XL"].map((s) => {
                const outOfStock = sizeStock[s] === 0;

                return (
                  <motion.button
                    key={s}
                    className={`${styles.sizeButton} 
                    ${size === s ? styles.active : ""} 
                    ${outOfStock ? styles.disabledSize : ""}
                  `}
                    onClick={() => handleSizeSelect(s)}
                    whileTap={!outOfStock ? { scale: 0.9 } : {}}
                    disabled={outOfStock}
                  >
                    {s}
                    {outOfStock && <span className={styles.cross}>×</span>}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quantity Control */}
          <div className={styles.quantitySection}>
            <h3>Quantity:</h3>
            <div className={styles.quantityControls}>
              <button disabled={!size || quantity <= 1} onClick={decreaseQty}>
                −
              </button>
              <span>{quantity}</span>
              <button
                disabled={!size || quantity >= sizeStock[size]}
                onClick={increaseQty}
              >
                +
              </button>
            </div>
            {size && quantity >= sizeStock[size] && (
              <p className={styles.stockWarning}>
                Only {sizeStock[size]} left in stock for size {size}.
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <motion.div
            className={styles.cartButtonWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div onClick={handleAddToCart}>
              <AddToCartButton
                product={{ ...product, size: size, quantity }}
                disabled={size === ""}
              />
            </div>
            {!size && (
              <p className={styles.sizeWarning}>Please select a size first.</p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      {isZoomOpen && (
        <div className={styles.zoomModal} onClick={closeZoom}>
          <img
            src={product.image_url}
            alt="Zoomed Image"
            className={styles.zoomedImg}
            style={{ transform: `scale(${zoom})` }}
            onWheel={handleWheelZoom}
          />
          <span className={styles.closeZoom}>✕</span>
        </div>
      )}
      <div className={styles.topButtons}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.backBtn}
          onClick={() => (window.location.href = "/e-com/store")}
        >
          ← Back to Store
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.cartBtn}
          onClick={() => (window.location.href = "/e-com/cart")}
        >
          🛒 Go to Cart
        </motion.button>
      </div>
    </>
  );
}
