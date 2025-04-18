import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  page: number; // current page (zero-based) from server
  size: number; // rows per page from server
  totalPages: number; // total # of pages from server
  onPaginationChange: (page: number, size: number) => void;
}

export function DataTablePagination<TData>({
  page,
  size,
  totalPages,
  onPaginationChange,
}: Readonly<DataTablePaginationProps<TData>>) {
  // Safely determine if we can go next/previous
  const canGoPrevious = page > 0;
  const canGoNext = page + 1 < totalPages;

  return (
    <div className="flex items-center justify-end px-0 py-4">
      <div className="w-full flex items-center justify-between space-x-6 lg:space-x-8">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={String(size)}
            onValueChange={(value) => {
              // whenever we change page size, reset page to 0 or keep the same page.
              onPaginationChange(0, Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={String(size)} />
            </SelectTrigger>
            {/* Example sizes – adapt to your needs */}
            <SelectContent
              side="top"
              className="bg-background-secondary-default"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* "Page X of Y" display */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page + 1} of {totalPages}
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center space-x-2">
          {/* First page */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPaginationChange(0, size)}
            disabled={!canGoPrevious}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange(page - 1, size)}
            disabled={!canGoPrevious}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>

          {/* Next page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange(page + 1, size)}
            disabled={!canGoNext}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPaginationChange(totalPages - 1, size)}
            disabled={!canGoNext}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
