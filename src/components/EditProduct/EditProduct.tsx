"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditProduct.module.css";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

function getCSRFToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_token="))
    ?.split("=")[1];
}

export default function EditProduct({ productId }: { productId: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/donation-admin/products/${productId}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to load product");
        return;
      }

      setTitle(data.product.title);
      setPrice(data.product.price);
      setDescription(data.product.description || "");
      setImageUrl(data.product.image_url);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleUpdate = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);

      if (newImage) {
        formData.append("image", newImage);
      }

      const res = await fetch(`/api/donation-admin/products/${productId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "x-csrf-token": getCSRFToken() || "",
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success("Product updated successfully 🎉");
      router.push("/donation-admin/e-com/products");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={18} />
        </button>

        <h1>Edit Product</h1>

        <button
          onClick={handleUpdate}
          className={styles.saveBtn}
          disabled={saving}
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className={styles.grid}>
        {/* LEFT FORM */}
        <div className={styles.form}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>Replace Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files?.[0] || null)}
          />
        </div>

        {/* RIGHT PREVIEW */}
        <div className={styles.preview}>
          <h3>Preview</h3>

          <div className={styles.card}>
            <img
              src={newImage ? URL.createObjectURL(newImage) : imageUrl}
              className={styles.image}
            />

            <h4>{title || "Product Title"}</h4>
            <p className={styles.price}>{price ? `₹${price}` : "Price"}</p>

            <p className={styles.desc}>
              {description || "Description preview..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
