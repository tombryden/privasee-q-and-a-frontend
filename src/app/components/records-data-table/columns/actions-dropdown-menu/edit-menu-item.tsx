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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { graphql } from "@/gql";
import { AllRecordsQuery } from "@/gql/graphql";
import {
  fieldRequiredMessage,
  propertiesMessage,
  propertiesRegex,
} from "@/utils/regex";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EDIT_RECORD_MUT = graphql(`
  mutation updateRecord($updateRecordInput: UpdateRecordInput!) {
    updateRecord(updateRecordInput: $updateRecordInput) {
      _recordId
      question
      answer
      updatedAt
      updatedBy
      properties
      questionDescription
    }
  }
`);

interface UpdateForm {
  question: string;
  answer: string;
  properties: string;
  questionDescription: string;
}

export default function EditMenuItem({
  record,
}: {
  record: AllRecordsQuery["records"][0];
}) {
  const [open, setOpen] = useState(false);

  const [editQorAMut, { loading }] = useMutation(EDIT_RECORD_MUT);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateForm>({
    defaultValues: {
      question: record.question,
      answer: record.answer || "",
      questionDescription: record.questionDescription || "",
      properties: record.properties || "",
    },
  });

  const onSubmit = handleSubmit((formData) => {
    editQorAMut({
      variables: {
        updateRecordInput: {
          recordId: record._recordId,
          question: formData.question,
          answer: formData.answer,
          properties: formData.properties,
          questionDescription: formData.questionDescription,
        },
      },
      onCompleted: () => {
        setOpen(false);

        toast(`Successfully updated record ID: ${record._recordId}`);
      },
      onError: () => {},
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* keep this mounted otherwise dropdown unmounts which closes dialog, can be fixed by moving dialog out of dropdown but this is a simple workaround */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Modify
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="md:max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Modify</DialogTitle>
          <DialogDescription>
            Enter modifications and click &apos;Save Changes&apos;.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="space-y-4 mb-4">
            <div>
              <Label htmlFor="question">Question *</Label>
              <Textarea
                id="question"
                placeholder="Enter a question"
                {...register("question", { required: fieldRequiredMessage })}
                error={errors.question?.message}
              />
            </div>

            <div>
              <Label htmlFor="questionDescription">Question Description</Label>
              <Textarea
                id="questionDescription"
                placeholder="Enter a description"
                {...register("questionDescription")}
                error={errors.questionDescription?.message}
              />
            </div>

            <div>
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                placeholder="Enter an answer"
                {...register("answer")}
                error={errors.answer?.message}
              />
            </div>

            <div>
              <Label htmlFor="properties">
                Properties (in format &apos;key:value,key2:value2&apos;)
              </Label>
              <Input
                id="properties"
                placeholder="Enter properties"
                {...register("properties", {
                  pattern: {
                    value: propertiesRegex,
                    message: propertiesMessage,
                  },
                })}
                error={errors.properties?.message}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" loading={loading}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
