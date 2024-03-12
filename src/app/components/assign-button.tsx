"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { graphql } from "@/gql";
import { AllRecordsQuery } from "@/gql/graphql";
import { fieldRequiredMessage, emailRegex, emailMessage } from "@/utils/regex";
import { useMutation } from "@apollo/client";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AssignButtonProps {
  selectedRows: Row<AllRecordsQuery["records"][0]>[];
}

interface AssignForm {
  assigneeEmail: string;
}

const ASSIGN_RECORDS_MUT = graphql(`
  mutation assignRecords($assignRecordInput: AssignRecordInput!) {
    assignRecords(assignRecordInput: $assignRecordInput) {
      _recordId
      assignee
      updatedAt
      updatedBy
    }
  }
`);

export default function AssignButton({ selectedRows }: AssignButtonProps) {
  const [open, setOpen] = useState(false);

  const selectedCount = selectedRows.length;
  const recordsText = selectedCount === 1 ? "Record" : "Records";

  const [assignRecordsMut, { loading }] = useMutation(ASSIGN_RECORDS_MUT);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignForm>();

  const onSubmit = handleSubmit((formData) => {
    assignRecordsMut({
      variables: {
        assignRecordInput: {
          recordIds: selectedRows.map((row) => row.getValue("_recordId")),
          assignee: formData.assigneeEmail,
        },
      },
      onCompleted: () => {
        toast(`Successfully assigned ${selectedCount} records.`);

        setOpen(false);

        // reset fields after 500ms to stop flash
        setTimeout(() => {
          reset();
        }, 500);
      },
      onError: () => {},
    });
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={selectedCount === 0}>
          Assign {selectedCount > 0 ? `(${selectedCount})` : ""}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Assign {recordsText}</DialogTitle>
          <DialogDescription>
            Enter email and click &apos;Assign {selectedCount} {recordsText}
            &apos;.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Label htmlFor="assigneeEmail">Assignee Email *</Label>
            <Input
              id="assigneeEmail"
              placeholder="Enter an email"
              {...register("assigneeEmail", {
                required: fieldRequiredMessage,
                pattern: { value: emailRegex, message: emailMessage },
              })}
              error={errors.assigneeEmail?.message}
            />
          </div>

          <DialogFooter>
            <Button type="submit" loading={loading}>
              Assign {selectedCount} {recordsText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
