"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { AllRecordsQuery } from "@/gql/graphql";
import { ColumnDef } from "@tanstack/react-table";
import ActionsDropdownMenu from "./actions-dropdown-menu/actions-dropdown-menu";
import { formatDateTime } from "@/utils/date";
import { Combobox } from "../../../../components/ui/combobox";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

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
    accessorKey: "_companyId",
    header: "Company ID",
    meta: "Company ID",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
    meta: "Company Name",
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
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    meta: "Created At",
    cell: ({ row }) => <div>{formatDateTime(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    meta: "Updated By",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    meta: "Updated At",
    cell: ({ row }) => <div>{formatDateTime(row.getValue("updatedAt"))}</div>,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("updatedAt")).getTime();
      const dateB = new Date(rowB.getValue("updatedAt")).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: "assignee",
    filterFn: (row, columnId, filterVal) =>
      filterVal.includes(row.getValue(columnId)),
    header: ({ table }) => {
      const distinctAssignees = table
        .getCoreRowModel()
        .rows.filter((row) => row.getValue("assignee") !== null)
        .map((row) => row.getValue("assignee") as string)
        .filter(
          (assignee, index, thisArray) => thisArray.indexOf(assignee) === index
        );

      const comboValues = distinctAssignees.map((assignee) => ({
        value: assignee.toLowerCase(),
        label: assignee,
      }));

      return (
        <Combobox
          searchingFor="assignees"
          comboValues={comboValues}
          selectAction={
            (selectedValues) =>
              table.setColumnFilters([
                {
                  id: "assignee",
                  value: selectedValues.length > 0 ? selectedValues : undefined,
                },
              ]) // custom filter function
          }
        />
      );
    },
    meta: "Assignee",
  },
  {
    accessorKey: "properties",
    header: "Properties",
    meta: "Properties",
  },
  {
    accessorKey: "questionDescription",
    header: "Question Description",
    meta: "Question Description",
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
