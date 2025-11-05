"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface Donation {
  id: string;
  name: string;
  email: string;
  amount: number;
  created_at: string;
  status: string;
}

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "name",
    header: "Donor Name",
    cell: (info) => info.getValue(),
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: "Amount (₹)",
    cell: (info) => `₹${info.getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const value = info.getValue() as string;
      const color =
        value === "paid" ? "green" : value === "Pending" ? "orange" : "red";
      return <span style={{ color, fontWeight: 600 }}>{value}</span>;
    },
  },
];
