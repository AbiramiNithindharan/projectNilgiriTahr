"use client";

import { useEffect, useState } from "react";
import styles from "./AdminContactsTable.module.css";
import { Mail, User, Calendar } from "lucide-react";

export default function AdminContactsTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/donation-admin/contacts", {
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
        <Mail size={20} /> Contact Messages
      </h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <User size={14} /> {item.name}
                </td>
                <td>{item.email}</td>
                <td className={styles.message}>{item.message}</td>
                <td>
                  <Calendar size={14} />{" "}
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
