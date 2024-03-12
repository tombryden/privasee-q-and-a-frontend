"use client";

import { Button } from "@/components/ui/button";
import { AllRecordsQuery } from "@/gql/graphql";
import { Row } from "@tanstack/react-table";

interface AssignButtonProps {
  selectedRows: Row<AllRecordsQuery["records"][0]>[];
}

export default function AssignButton({ selectedRows }: AssignButtonProps) {
  const selectedCount = selectedRows.length;
  return (
    <Button disabled={selectedCount === 0}>
      Assign {selectedCount > 0 ? `(${selectedCount})` : ""}
    </Button>
  );
}
