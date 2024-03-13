"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { AllRecordsQuery, Exact, InputMaybe } from "@/gql/graphql";
import AssignButton from "../assign-button";
import AddQuestionButton from "../add-question-button";
import { cn } from "@/lib/utils";
import { ApolloQueryResult } from "@apollo/client";
import { Spinner } from "@/components/ui/spinner";

interface DataTableProps {
  data: AllRecordsQuery["records"];
  columns: ColumnDef<AllRecordsQuery["records"][0]>[];
  refetchAllRecords: (
    variables?:
      | Partial<
          Exact<{
            searchTerm?: InputMaybe<string> | undefined;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<AllRecordsQuery>>;
}

export default function RecordsDataTable({
  data,
  columns,
  refetchAllRecords,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updatedAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    _companyId: false,
    createdBy: false,
    createdAt: false,
    companyName: false,
    updatedBy: false,
    questionDescription: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // #region - could be moved to its own component, but for now.. leave here
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const doneInitialLoad = useRef(0);

  // search after 1s stopping typing
  useEffect(() => {
    doneInitialLoad.current += 1;

    // stop search from occuring on initial load as we already prefetched data
    // NOTE: THIS WOULD NEED CHANGING IN PROD DUE TO STRICTMODE ON LOCALHOST
    if (doneInitialLoad.current <= 2) return;

    setSearchLoading(true);

    const timeout = setTimeout(() => {
      refetchAllRecords({
        searchTerm: search,
      }).then(() => setSearchLoading(false));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search, refetchAllRecords]);
  // #endregion

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-4">
          <Input
            placeholder="Filter questions..."
            value={
              // (table.getColumn("question")?.getFilterValue() as string) || ""
              search
            }
            onChange={(event) =>
              // table.getColumn("question")?.setFilterValue(event.target.value) // hacky - custom filter function to check if also matches answers column
              setSearch(event.target.value)
            }
            className="max-w-sm"
          />

          {searchLoading && <Spinner />}
        </div>
        <div className="ml-auto space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(e) => e.preventDefault()} // don't auto close on select
                    >
                      {column.columnDef.meta as string}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <AssignButton selectedRows={table.getSelectedRowModel().rows} />

          <AddQuestionButton />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.column.id === "question" ||
                          header.column.id === "questionDescription" ||
                          header.column.id === "answer"
                          ? "w-[400px]"
                          : undefined,
                        header.column.id === "_recordId"
                          ? "w-[200px]"
                          : undefined
                      )}
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
