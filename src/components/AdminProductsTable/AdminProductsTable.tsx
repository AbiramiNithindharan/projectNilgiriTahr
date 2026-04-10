"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import styles from "./AdminProductsTable.module.css";
import { useRouter } from "next/navigation";
function getCSRFToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_token="))
    ?.split("=")[1];
}

export default function AdminProductsTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/donation-admin/products", {
        credentials: "include",
      });

      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //  DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`/api/donation-admin/products/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "x-csrf-token": getCSRFToken() || "",
        },
      });

      if (!res.ok) throw new Error();

      toast.success("Product Deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>Products</h1>

        <button
          className={styles.addBtn}
          onClick={() => router.push("/donation-admin/e-com/AddProducts")}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th className={styles.center}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image_url} className={styles.image} />
                </td>

                <td className={styles.title}>{p.title}</td>

                <td className={styles.price}>₹{p.price}</td>

                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() =>
                      router.push(`/donation-admin/e-com/EditProducts/${p.id}`)
                    }
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
