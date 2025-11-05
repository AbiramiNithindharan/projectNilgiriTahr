"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import styles from "./DataTable.module.css";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  printMode?: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  printMode = false,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  // Reset pagination if data changes
  useEffect(() => {
    table.setPageIndex(0);
  }, [data]);

  const rowsToRender = printMode
    ? table.getSortedRowModel().rows
    : table.getRowModel().rows;

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={styles.sortableHeader}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {rowsToRender.length > 0 ? (
              rowsToRender.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination Controls */}
        {!printMode && (
          <div className={styles.pagination}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={styles.prevbutton}
            >
              ← Prev
            </button>
            <span className={styles.pageInfo}>
              Page <strong>{table.getState().pagination.pageIndex + 1}</strong>{" "}
              of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={styles.nextbutton}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
