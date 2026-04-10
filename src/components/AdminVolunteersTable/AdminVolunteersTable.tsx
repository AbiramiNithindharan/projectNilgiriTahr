"use client";

import { useEffect, useState } from "react";
import styles from "./AdminVolunteersTable.module.css";
import { User, Phone, Mail, Heart } from "lucide-react";

export default function AdminVolunteersTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch("/api/donation-admin/volunteers", {
        credentials: "include",
      });
      const result = await res.json();
      setData(result);
    } catch {
      console.error("Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <Heart size={20} /> Volunteers
      </h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Interest</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <User size={14} /> {item.name}
                </td>
                <td>
                  <Mail size={14} /> {item.email}
                </td>
                <td>
                  <Phone size={14} /> {item.phone}
                </td>
                <td>{item.interest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
