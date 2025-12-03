"use client";

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
import { useAuthToken } from "@/hooks/useAuthToken";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSalesData } from "@/lib/api/sales";

export function SalesTable({ filters }) {
  const { data: authToken } = useAuthToken();
  const [sortConfig, setSortConfig] = useState({
    sortBy: "date",
    sortOrder: "asc",
  });
  const [paginationToken, setPaginationToken] = useState({
    before: "",
    after: "",
  });
  const [pageCount, setPageCount] = useState(0);
  const [historyStack, setHistoryStack] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sales", authToken, filters, sortConfig, paginationToken],
    queryFn: () =>
      fetchSalesData({
        ...filters,
        sortBy: sortConfig.sortBy,
        sortOrder: sortConfig.sortOrder,
        token: authToken,
        before: paginationToken.before,
        after: paginationToken.after,
      }),
    enabled: !!authToken,
  });
  if (isLoading) return <Loading message="Fetching total sales..." />;
  if (isError) return <Error message="Failed to fetch total sales!" />;

  const handleNextPage = () => {
    const newToken = data.paginationTokens.after;
    if (!newToken) return;

    setHistoryStack((prev) => [...prev, paginationToken]);

    setPaginationToken({
      before: "",
      after: newToken,
    });

    setPageCount((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (historyStack.length === 0) return;

    const prevState = historyStack[historyStack.length - 1];

    setHistoryStack(historyStack.slice(0, -1));

    setPaginationToken(prevState);

    setPageCount((prev) => prev - 1);
  };

  const handleSort = (sortBy) => {
    setSortConfig((prev) => ({
      sortBy,
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };
  const SortIcon = ({ column }) => {
    const isActive = sortConfig.sortBy === column;

    // If this column is not being sorted
    if (!isActive) {
      return <ChevronUp className="h-4 w-4 opacity-30" />; // inactive state
    }

    // If active → show correct direction
    return sortConfig.sortOrder === "asc" ? (
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
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-2 hover:text-foreground text-gray-800"
                >
                  Date
                  <SortIcon column="date" />
                </button>
              </TableHead>

              <TableHead className="w-24">
                <button
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-2 hover:text-foreground text-gray-800"
                >
                  Price
                  <SortIcon column="price" />
                </button>
              </TableHead>
              <TableHead className="text-gray-800">Email</TableHead>
              <TableHead className="text-gray-800">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.salesData.length === 0 ? (
              <TableRow>
                <td
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground text-sm"
                >
                  No sales records found
                </td>
              </TableRow>
            ) : (
              data.salesData.map((item) => (
                <SalesTableRow key={item._id} item={item} />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <SalesPagination
        pageCount={pageCount}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
