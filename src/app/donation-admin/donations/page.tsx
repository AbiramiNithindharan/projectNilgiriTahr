"use client";

import { useEffect, useState } from "react";
import styles from "./donations.module.css";
import { motion } from "framer-motion";
import { DataTable } from "./Datatable";
import { columns, Donation } from "./columns";

export default function DonationsDashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [printMode, setPrintMode] = useState(false);
  const [search, setSearch] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleString("en-IN"));
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations", {
          method: "GET",
          headers: { "Cache-Control": "no-store" },
          credentials: "include",
        });

        if (res.status === 401) {
          window.location.href = "/donation-admin/login";
          return;
        }

        const resData = await res.json();
        const dataArray = Array.isArray(resData)
          ? resData
          : resData?.donations || resData?.data || [];

        const formatted: Donation[] = dataArray.map((d: any, i: number) => ({
          id: d._id ?? String(i),
          name: d.name ?? "",
          email: d.email ?? "",
          amount: Number(d.amount ?? 0),
          status: d.status ?? "Pending",
          created_at: d.created_at ?? new Date().toISOString(),
        }));

        setDonations(formatted);
        setFilteredDonations(formatted);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    let filtered = [...donations];
    const q = search.toLowerCase();

    if (q)
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(q) || d.email.toLowerCase().includes(q)
      );

    if (minAmount)
      filtered = filtered.filter((d) => d.amount >= Number(minAmount));
    if (maxAmount)
      filtered = filtered.filter((d) => d.amount <= Number(maxAmount));

    if (fromDate)
      filtered = filtered.filter(
        (d) => new Date(d.created_at) >= new Date(fromDate)
      );
    if (toDate)
      filtered = filtered.filter(
        (d) => new Date(d.created_at) <= new Date(toDate)
      );

    setFilteredDonations(filtered);
  }, [search, minAmount, maxAmount, fromDate, toDate, donations]);

  const handlePrint = () => {
    // ✅ Block print on small screens (mobile)
    if (window.innerWidth < 768) {
      alert("Printing is only supported on desktop browsers.");
      return;
    }
    setPrintMode(true);

    setTimeout(() => {
      document.body.classList.add("printing");
      const timestamp = document.getElementById("print-timestamp");
      if (timestamp) {
        timestamp.textContent = `Printed on: ${new Date().toLocaleString("en-IN")}`;
        timestamp.style.display = "block";
      }

      window.print();

      // Restore after print
      setTimeout(() => {
        if (timestamp) timestamp.style.display = "none";
        document.body.classList.remove("printing");
        setPrintMode(false); // back to normal
      }, 500);
    }, 300);
  };

  const uniqueDonors = new Set(
    filteredDonations
      .map((d) => d.email?.trim().toLowerCase() || d.name?.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={`${styles.printableArea}`}>
          <h2>Donation Dashboard</h2>
        </div>
        <div className={styles.headerButtons}>
          <div className={styles.card}>
            <h4>Total Donors: </h4>
            <p>{uniqueDonors}</p>
          </div>
          <div className={styles.card}>
            <h4>Total Amount Donated: </h4>
            <p>
              ₹
              {filteredDonations
                .reduce((acc, d) => acc + (d.amount || 0), 0)
                .toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <div className="print-controls">
          <button onClick={handlePrint} className={styles.printBtn}>
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="donations-print-area">
        <p id="print-timestamp" style={{ display: "none" }}></p>
        <h2 id="print-heading" style={{ display: "none" }}>
          Donation Dashboard
        </h2>

        <div className={styles.tableWrapper}>
          {loading ? (
            <p className={styles.loading}>Loading donations...</p>
          ) : filteredDonations.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredDonations}
              printMode={printMode}
            />
          ) : (
            <p className={styles.noData}>No donations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
