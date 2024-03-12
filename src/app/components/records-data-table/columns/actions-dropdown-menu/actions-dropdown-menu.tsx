import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditMenuItem from "./edit-menu-item";
import { AllRecordsQuery } from "@/gql/graphql";

export default function ActionsDropdownMenu({
  record, // prop drilled, but context overkill for one drill
}: {
  record: AllRecordsQuery["records"][0];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(record._recordId)}
        >
          Copy record ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <EditMenuItem record={record} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
