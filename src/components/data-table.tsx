import {
  IconBolt,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconLayoutColumns,
  IconMapPin,
  IconSettings,
  IconWind,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef, ColumnFiltersState, FilterFn, SortingState, VisibilityState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AHUData } from "@/data/ahu-data";

// Define a simple filter function for the table
const fuzzyFilter: FilterFn<AHUData> = (row, columnId, value) => {
  const search = value.toLowerCase();
  const cellValue = row.getValue(columnId);
  return String(cellValue).toLowerCase().includes(search);
};

export const schema = {
  id: "string",
  name: "string",
  location: "string",
  numberOfFans: "number",
  averageFanSpeed: "number",
  totalEnergyToday: "number",
  status: "string",
} as const;

const columns: ColumnDef<AHUData>[] = [
  {
    accessorKey: "name",
    header: "AHU Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IconSettings className="size-4 text-muted-foreground" />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IconMapPin className="size-4 text-muted-foreground" />
        <span>{row.original.location}</span>
      </div>
    ),
  },
  {
    accessorKey: "numberOfFans",
    header: "Number of Fans",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <IconWind className="size-4 text-muted-foreground" />
        <span>{row.original.numberOfFans}</span>
      </div>
    ),
  },
  {
    accessorKey: "averageFanSpeed",
    header: "Avg Fan Speed Today",
    cell: ({ row }) => (
      <div className="text-center">
        <span className="font-mono">{row.original.averageFanSpeed.toFixed(0)} RPM</span>
      </div>
    ),
  },
  {
    accessorKey: "totalEnergyToday",
    header: "Energy Consumption Today",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <IconBolt className="size-4 text-muted-foreground" />
        <span className="font-mono">{row.original.totalEnergyToday.toFixed(1)} kWh</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge variant={row.original.status === "online" ? "default" : "secondary"} className="px-2">
          {row.original.status === "online" ? (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 mr-1" />
          ) : null}
          {row.original.status === "online" ? "Online" : "Offline"}
        </Badge>
      </div>
    ),
  },
];

export function DataTable({ data: initialData }: { data: AHUData[] }) {
  const [data] = React.useState(() => initialData);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  const handleRowClick = (ahuId: string) => {
    navigate({ to: `/ahu/${ahuId}` });
  };

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">AHU Units</h2>
          <Badge variant="outline" className="text-sm">
            {data.length} units
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add AHU</span>
          </Button> */}
        </div>
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isLeftAligned = header.column.id === "name" || header.column.id === "location";
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={isLeftAligned ? "text-left" : "text-center"}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(row.original.id)}>
                    {row.getVisibleCells().map((cell) => {
                      const isLeftAligned = cell.column.id === "name" || cell.column.id === "location";
                      return (
                        <TableCell key={cell.id} className={isLeftAligned ? "text-left" : "text-center"}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No AHU units found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end px-4">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}>
                <SelectTrigger size="sm" className="w-20" id={`rows-per-page-${React.useId()}`}>
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
