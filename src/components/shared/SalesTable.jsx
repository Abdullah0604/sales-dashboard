"use client";

import { useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SalesTableRow from "./SalesTableRow";
import SalesPagination from "./SalesPagination";

// Mock data generator
function generateMockTableData(filters) {
  const items = [];
  const startDate = new Date(filters.startDate);
  const endDate = new Date(filters.endDate);

  for (let i = 0; i < 150; i++) {
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    const price = Math.round(Math.random() * 5000 + 100);
    const minPrice = filters.minPrice ? Number.parseInt(filters.minPrice) : 0;

    items.push({
      id: `sale-${i}`,
      date: randomDate.toISOString().split("T")[0],
      price,
      email: `customer${i}@example.com`,
      phone: `+1 ${Math.random().toString().slice(2, 5)} ${Math.random()
        .toString()
        .slice(2, 5)} ${Math.random().toString().slice(2, 6)}`,
      status: ["completed", "pending", "failed"][Math.floor(Math.random() * 3)],
    });
  }

  // Apply filters
  return items
    .filter(
      (item) =>
        !filters.minPrice || item.price >= Number.parseInt(filters.minPrice)
    )
    .filter(
      (item) =>
        !filters.email ||
        item.email.toLowerCase().includes(filters.email.toLowerCase())
    )
    .filter((item) => !filters.phone || item.phone.includes(filters.phone));
}

export function SalesTable({
  filters,
  sortConfig,
  onSort,
  paginationToken,
  onPaginationChange,
  currentPage,
  onPageChange,
}) {
  const allData = useMemo(() => generateMockTableData(filters), [filters]);
  // Sort data
  const sortedData = useMemo(() => {
    const data = [...allData];
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = sortConfig.key === "date" ? new Date(a.date) : a.price;
        const bVal = sortConfig.key === "date" ? new Date(b.date) : b.price;
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }
    return data;
  }, [allData, sortConfig]);

  // Paginate data
  const pageSize = 50;
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIdx = currentPage * pageSize;
  const paginatedData = sortedData.slice(startIdx, startIdx + pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <div className="h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">
                <button
                  onClick={() => onSort("date")}
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  Date
                  <SortIcon column="date" />
                </button>
              </TableHead>
              <TableHead className="w-24">
                <button
                  onClick={() => onSort("price")}
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  Price
                  <SortIcon column="price" />
                </button>
              </TableHead>
              <TableHead className="min-w-48">Email</TableHead>
              <TableHead className="min-w-40">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <SalesTableRow key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <SalesPagination
        pagination={{
          startIdx,
          pageSize,
          sortedData,
          handleNextPage,
          handlePrevPage,
          currentPage,
          totalPages,
        }}
      />
    </div>
  );
}
