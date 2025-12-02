import React from "react";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

function SalesPagination({ pageCount, handleNextPage, handlePrevPage }) {
  // console.log(salesData);
  // console.log("page count: ", pageCount);

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        onClick={handlePrevPage}
        disabled={!pageCount}
        variant={!pageCount ? "ghost" : "outline"}
        size="sm"
        className={`
    gap-1
    bg-transparent
   
  `}
      >
        <ChevronsLeft className="h-4 w-4" />
        Previous
      </Button>

      <Button
        onClick={handleNextPage}
        variant="outline"
        size="sm"
        className="gap-1"
      >
        Next
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default SalesPagination;
