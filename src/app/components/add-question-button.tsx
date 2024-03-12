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
import { Textarea } from "@/components/ui/textarea";
import { graphql } from "@/gql";
import { AllRecordsDocument } from "@/gql/graphql";
import { emailMessage, emailRegex, fieldRequiredMessage } from "@/utils/regex";
import { useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddQuestionForm {
  question: string;
  questionDescription: string;
  answer: string;
  createdBy: string;
  assignee: string;
}

const CREATE_RECORD_MUT = graphql(`
  mutation createRecord2($createRecordInput: CreateRecordInput!) {
    createRecord(createRecordInput: $createRecordInput) {
      _recordId
    }
  }
`);

export default function AddQuestionButton() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddQuestionForm>();

  const [createRecordMut, { loading }] = useMutation(CREATE_RECORD_MUT);

  const onSubmit = handleSubmit((formData) => {
    const { question, questionDescription, answer, createdBy, assignee } =
      formData;

    createRecordMut({
      variables: {
        createRecordInput: {
          question,
          questionDescription: questionDescription || undefined,
          answer: answer || undefined, // allow null values to hit backend
          createdBy,
          assignee: assignee || undefined,
        },
      },
      awaitRefetchQueries: true,
      refetchQueries: [AllRecordsDocument],
      onCompleted: () => {
        toast("Successfully added a new question.");

        // this could be optimised to add record to cache instead of refetching, but ok for this exercise
        setOpen(false);

        // reset fields 500 ms after closing so no flicker on fields
        setTimeout(() => {
          reset();
        }, 500);
      },
      // handle error as validation error may occur - errorLink handles validation here
      onError: () => {},
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Question <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
          <DialogDescription>
            Enter information and click &apos;Save Changes&apos; once done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="my-4 space-y-4">
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
              <Label htmlFor="createdBy">Created By *</Label>
              <Input
                id="createdBy"
                placeholder="Created by email"
                {...register("createdBy", {
                  required: fieldRequiredMessage,
                  pattern: { value: emailRegex, message: emailMessage },
                })}
                error={errors.createdBy?.message}
              />
            </div>

            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                placeholder="Assignee email"
                {...register("assignee", {
                  pattern: { value: emailRegex, message: emailMessage },
                })}
                error={errors.assignee?.message}
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
