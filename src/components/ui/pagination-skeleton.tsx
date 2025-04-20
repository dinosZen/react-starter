import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Skeleton } from "@/components/ui/skeleton";

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-end px-0">
      <div className="w-full flex items-center justify-between space-x-6 lg:space-x-8">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select>
            <SelectTrigger className="h-8 w-[70px] bg-background-primary-default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top" className="bg-background-primary-default">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {/* Page 0 of 0 */}
          <Skeleton className="h-6 w-full bg-background-primary-default" />
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center space-x-2">
          {/* First page */}
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <Skeleton className="h-full w-full bg-background-primary-default" />
          </Button>

          {/* Previous page */}
          <Button variant="outline" className="h-8 w-8 p-0">
            <Skeleton className="h-full w-full bg-background-primary-default" />
          </Button>

          {/* Next page */}
          <Button variant="outline" className="h-8 w-8 p-0">
            <Skeleton className="h-full w-full bg-background-primary-default" />
          </Button>

          {/* Last page */}
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <Skeleton className="h-full w-full bg-background-primary-default" />
          </Button>
        </div>
      </div>
    </div>
  );
}
