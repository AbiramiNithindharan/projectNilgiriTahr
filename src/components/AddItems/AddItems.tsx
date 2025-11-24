"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./AddItems.module.css";
import { supabaseClient } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function AddItems() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productCode, setProductCode] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [sizes, setSizes] = useState([
    { size: "S", stock: "" },
    { size: "M", stock: "" },
    { size: "L", stock: "" },
    { size: "XL", stock: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dropRef = useRef<HTMLDivElement | null>(null);
  /* ------------------------- GENERATE PRODUCT CODE ------------------------- */

  const generateProductCode = () => {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    const numbers = Math.floor(1000 + Math.random() * 9000); // 4 digits
    return `${letter}${numbers}`;
  };

  useEffect(() => {
    setProductCode(generateProductCode());
  }, []);

  /* ------------------------- IMAGE HANDLING ------------------------- */

  const handleFile = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Only image files are allowed");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setErrorMsg("");
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    dropRef.current!.classList.add(styles.dragActive);
  };

  const onDragLeave = () => {
    dropRef.current!.classList.remove(styles.dragActive);
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    dropRef.current!.classList.remove(styles.dragActive);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onSelectFile = (e: any) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  /* ------------------------- VALIDATION ------------------------- */

  const validateForm = () => {
    if (!title.trim()) return "Title is required";
    if (!description.trim()) return "Description is required";
    if (!price) return "Price is required";
    if (!image) return "Product image is required";
    return null;
  };

  /* ------------------------- IMAGE UPLOAD ------------------------- */

  const uploadImage = async () => {
    if (!image) return null;

    const filePath = `${Date.now()}-${image.name}`;

    const { data, error } = await supabaseClient.storage
      .from("products")
      .upload(filePath, image, {
        contentType: image.type,
        upsert: false,
      });

    console.log("UPLOAD ERROR:", error);
    console.log("UPLOAD DATA:", data);

    if (error) return null;

    return supabaseClient.storage.from("products").getPublicUrl(filePath).data
      .publicUrl;
  };

  /* ------------------------- SUBMIT ------------------------- */

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError, { icon: "⚠️" });
      return;
    }

    setErrorMsg("");
    setLoading(true);

    const imageUrl = await uploadImage();
    if (!imageUrl) {
      toast.error("Image upload failed ❌");
      setLoading(false);
      return;
    }

    const { data: product, error: productError } = await supabaseClient
      .from("products")
      .insert([
        {
          title,
          price: Number(price),
          description,
          product_code: productCode,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (productError) {
      toast.error("Product creation failed ❌");
      setLoading(false);
      return;
    }

    // Insert variants
    for (const s of sizes) {
      await supabaseClient.from("product_stock").insert([
        {
          product_id: product.id,
          size: s.size,
          stock: Number(s.stock) || 0,
        },
      ]);
    }

    setLoading(false);
    toast.success("Product added successfully 🎉", {
      icon: "🟢",
    });

    // Reset Form
    setTitle("");
    setPrice("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setSizes([
      { size: "S", stock: "" },
      { size: "M", stock: "" },
      { size: "L", stock: "" },
      { size: "XL", stock: "" },
    ]);

    setProductCode(generateProductCode());
  };

  return (
    <motion.div
      className={styles.pageGrid}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* LEFT SIDE — FORM */}
      <motion.div
        className={styles.container}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        <h1 className={styles.heading}>Add New Product</h1>
        <AnimatePresence>
          {errorMsg && (
            <motion.p
              className={styles.error}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <div className={styles.form}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className={styles.label}>Product Title</label>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className={styles.label}>Description</label>
            <textarea
              value={description}
              className={styles.textarea}
              onChange={(e) => setDescription(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className={styles.label}>Price (₹)</label>
            <input
              type="number"
              className={styles.input}
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className={styles.label}>Product Image</label>
            <motion.div
              className={styles.dropZone}
              ref={dropRef}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <AnimatePresence>
                {!preview ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.placeholderText}
                  >
                    Drag & Drop Image Here or Click to Upload
                  </motion.p>
                ) : (
                  <motion.div
                    key="img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.previewWrapper}
                  >
                    <img src={preview} className={styles.previewImg} />
                    <motion.button
                      className={styles.removeImg}
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Remove
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className={styles.hiddenInput}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={styles.subHeading}>Size & Stock</h3>
            <div className={styles.sizeGrid}>
              {sizes.map((s, i) => (
                <motion.div
                  key={i}
                  className={styles.sizeRow}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <span className={styles.sizeLabel}>{s.size}</span>
                  <input
                    type="number"
                    className={styles.input}
                    min="0"
                    placeholder="Stock"
                    value={s.stock}
                    onChange={(e) => {
                      const updated = [...sizes];
                      updated[i].stock = e.target.value;
                      setSizes(updated);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: loading ? 0.6 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? "Saving..." : "Add Product"}
          </motion.button>
        </div>
      </motion.div>

      {/* RIGHT SIDE — PREVIEW CARD */}

      <motion.div
        className={styles.previewCard}
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        <h1 className={styles.previewHeading}>Product Preview</h1>

        <motion.div
          className={styles.cardBox}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Image */}
          <div className={styles.cardImgWrapper}>
            {preview ? (
              <motion.img
                src={preview}
                className={styles.cardImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : (
              <motion.div
                className={styles.placeholderImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No Image
              </motion.div>
            )}
          </div>

          <div className={styles.cardContent}>
            <p className={styles.previewCode}>Code: {productCode}</p>
            <h3 className={styles.previewTitle}>{title || "Product Title"}</h3>
            <p className={styles.previewPrice}>
              {price ? `₹${price}` : "Price Not Set"}
            </p>

            <p className={styles.previewDesc}>
              {description || "Short description will appear here..."}
            </p>

            <div className={styles.sizePreviewBox}>
              {sizes.map((s, idx) => (
                <motion.span
                  key={idx}
                  className={styles.sizeBadge}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {s.size}: {s.stock || 0}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
