import { ColumnDef } from "@tanstack/react-table";

export interface Donation {
  id: string;
  name: string;
  email: string;
  amount: number;
  date: string;
  paymentStatus: string;
}

export const columns: ColumnDef<Donation>[] = [
  { accessorKey: "name", header: "Donor Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: "Amount (₹)",
    cell: ({ getValue }) => `₹ ${getValue()}`,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ getValue }) =>
      new Date(getValue() as string).toLocaleDateString("en-IN"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const color =
        status === "paid"
          ? "#16a34a"
          : status === "failed"
            ? "#dc2626"
            : "#f59e0b";
      return <span style={{ color, fontWeight: 600 }}>{status}</span>;
    },
  },
];
