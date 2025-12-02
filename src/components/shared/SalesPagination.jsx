import React from "react";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

function SalesPagination({ pagination }) {
  const {
    startIdx,
    pageSize,
    sortedData,
    handleNextPage,
    handlePrevPage,
    currentPage,
    totalPages,
  } = pagination;
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {startIdx + 1} to{" "}
        {Math.min(startIdx + pageSize, sortedData.length)} of{" "}
        {sortedData.length} results
      </p>
      <div className="flex gap-2">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          variant="outline"
          size="sm"
          className="gap-1 bg-transparent"
        >
          <ChevronsLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="flex items-center px-2 text-sm">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          Next
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default SalesPagination;
