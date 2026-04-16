"use client";

import { useEffect, useState } from "react";
import styles from "./AdminVolunteersTable.module.css";
import { User, Phone, Mail, Heart } from "lucide-react";

export default function AdminVolunteersTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  useEffect(() => {
    fetchVolunteers();
  }, [page]);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch(`/api/volunteer-submit?page=${page}=&limit=10`, {
        credentials: "include",
      });
      const result = await res.json();
      setData(result.data || []);
      setTotal(result.total || 0);
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
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
                  {/* Status Column */}
                  <td>
                    <span
                      className={
                        item.is_replied
                          ? styles.repliedBadge
                          : styles.pendingBadge
                      }
                    >
                      {item.is_replied ? "Replied" : "Pending"}
                    </span>
                  </td>
                  {/* Actions Cloumn */}
                  <td className={styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => setSelectedMessage(item)}
                    >
                      View
                    </button>
                    <a
                      className={styles.replyBtn}
                      target="_blank"
                      href={`https://mail.google.com/mail/?view=cm&to=${item.email}&su=Reply from Project Nilgiri Tahr&body=Hello,%0D%0A`}
                    >
                      Reply
                    </a>
                    {/* MARK AS REPLIED */}
                    <button
                      className={styles.markBtn}
                      disabled={item.is_replied}
                      onClick={async () => {
                        await fetch("/api/contact-submit", {
                          method: "PATCH",
                          body: JSON.stringify({ id: item.id }),
                        });

                        setData((prev) =>
                          prev.map((i) =>
                            i.id === item.id ? { ...i, is_replied: true } : i,
                          ),
                        );
                      }}
                    >
                      {item.is_replied ? "Replied" : "Mark"}
                    </button>

                    {/* delete */}
                    <button
                      className={styles.deleteBtn}
                      onClick={async () => {
                        await fetch("/api/contact-submit", {
                          method: "DELETE",
                          body: JSON.stringify({ id: item.id }),
                        });

                        setData((prev) => prev.filter((i) => i.id !== item.id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Volunteers found</td>
              </tr>
            )}
          </tbody>
        </table>
        {selectedMessage && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Message from {selectedMessage.name}</h3>

              <p>
                <strong>Email:</strong> {selectedMessage.email}
              </p>
              <p className={styles.fullMessage}>{selectedMessage.message}</p>

              <button onClick={() => setSelectedMessage(null)}>Close</button>
            </div>
          </div>
        )}
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => p + 1)}
            disabled={page * 10 >= total}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
