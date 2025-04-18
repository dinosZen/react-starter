import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface ApiPaginationData {
  page: number; // zero-based page index from server
  size: number; // rows per page
  total: number; // total number of pages
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationData: ApiPaginationData;
  isLoading?: boolean;
  onPaginationChange: (page: number, size: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationData,
  isLoading = false,
  onPaginationChange,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination: {
        pageIndex: paginationData.page, // zero-based from server
        pageSize: paginationData.size,
      },
    },
    pageCount: paginationData.total,
    manualPagination: true,
    // meta: {
    //   updateData: (rowIndex, columnId, value) => {
    //     const row = data[rowIndex];
    //     if (!row) return;
    //   },
    // },
  });

  const renderSkeletonRows = (rowCount: number) => {
    return (
      <>
        {Array.from({ length: rowCount }).map((_, i) => (
          <TableRow key={i}>
            {columns.map((_, j) => (
              <TableCell key={j} className="py-4">
                <Skeleton className="h-5 my-3 w-[70%]" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <ScrollArea className="lg:h-[49vh] 2xl:h-[60vh]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-sidebar">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          minWidth: header.column.columnDef.size,
                          maxWidth: header.column.columnDef.size,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {(() => {
                if (isLoading) {
                  return renderSkeletonRows(10);
                }
                if (table.getRowModel().rows?.length) {
                  return table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="py-4"
                          style={{
                            minWidth: cell.column.columnDef.size,
                            maxWidth: cell.column.columnDef.size,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ));
                }
                return (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                );
              })()}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
          <ScrollBar className="!bg-transparent" orientation="vertical" />
        </ScrollArea>
      </div>
      {(() => {
        if (isLoading) {
          return renderSkeletonRows(10);
        }
        return (
          <DataTablePagination
            table={table}
            page={paginationData.page}
            size={paginationData.size}
            totalPages={paginationData.total}
            onPaginationChange={onPaginationChange}
          />
        );
      })()}
    </div>
  );
}
