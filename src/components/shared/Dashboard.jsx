"use client";

import { useEffect, useState } from "react";
import { SalesFilters } from "./SalesFilters";
import { Card } from "../ui/card";
import { SalesChart } from "./SalesChart";
import { SalesTable } from "./SalesTable";
import { useAuthToken } from "@/hooks/useAuthToken";
import { Loading } from "./Loading";
import { Error } from "./Error";

export default function Dashboard() {
  const { data: token, isLoading, isError } = useAuthToken();
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    minPrice: "",
    email: "",
    phone: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [paginationToken, setPaginationToken] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  if (isLoading) return <Loading message="Fetching token..." />;
  if (isError) return <Error message="Failed to fetch token!" />;
  console.log("autobizz token: ", token);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Track and analyze your sales performance
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <SalesFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>
      {/* Chart */}
      <div className="mb-8">
        <Card className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Total Sales Over Time
          </h2>
          <SalesChart filters={filters} />
        </Card>
      </div>
      {/* Table */}
      <div>
        <Card className="p-6">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Sales Transactions
          </h2>
          <SalesTable
            filters={filters}
            sortConfig={sortConfig}
            onSort={handleSort}
            paginationToken={paginationToken}
            onPaginationChange={setPaginationToken}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Card>
      </div>
    </div>
  );
}
