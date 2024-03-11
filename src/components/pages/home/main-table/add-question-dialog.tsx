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
import { Plus } from "lucide-react";

export default function AddQuestionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-10">
          <Plus className="mr-2 w-5 h-5" />
          Add Question
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
          <DialogDescription>
            Enter information and click &apos;Save Changes&apos; once done.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-4">
          <div>
            <Label htmlFor="question">Question *</Label>
            <Input id="question" placeholder="Enter a question" />
          </div>
          <div>
            <Label htmlFor="answer">Answer</Label>
            <Input id="answer" placeholder="Enter an answer" />
          </div>

          <div>
            <Label htmlFor="createdBy">Created By *</Label>
            <Input id="createdBy" placeholder="Created by email" />
          </div>

          <div>
            <Label htmlFor="assignee">Assignee *</Label>
            <Input id="assignee" placeholder="Assignee email" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
