"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { AllRecordsQuery } from "@/gql/graphql";
import { ColumnDef } from "@tanstack/react-table";
import ActionsDropdownMenu from "./actions-dropdown-menu/actions-dropdown-menu";

export const columns: ColumnDef<AllRecordsQuery["records"][0]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_recordId",
    header: "Record ID",
    meta: "Record ID",
    // cell: ({ row }) => <div>{row.getValue("_recordId")}</div>,
  },
  {
    accessorKey: "question",
    header: "Question",
    meta: "Question",
    cell: ({ row }) => (
      <div className="whitespace-pre-wrap w-[400px]">
        {row.getValue("question")}
      </div>
    ),
  },
  {
    accessorKey: "answer",
    header: "Answer",
    meta: "Answer",
    cell: ({ row }) => (
      <div className="whitespace-pre-wrap w-[400px]">
        {row.getValue("answer")}
      </div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    meta: "Created By",
    // cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    meta: "Created At",
    // cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    meta: "Assignee",
    // cell: ({ row }) => <div>{row.getValue("assignee")}</div>,
  },
  //   {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Email
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  //   },
  //   {
  //     accessorKey: "amount",
  //     header: () => <div className="text-right">Amount</div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("amount"));

  //       // Format the amount as a dollar amount
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const record = row.original;

      return <ActionsDropdownMenu record={record} />;
    },
  },
];
