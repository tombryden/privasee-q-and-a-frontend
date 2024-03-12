"use client";

import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import AddQuestionDialog from "./add-question-dialog";

const ALL_RECORDS_QUERY = graphql(`
  query AllRecords {
    records {
      _recordId
      question
      answer
      createdBy
      createdAt
      assignee
    }
  }
`);

const MainTable = () => {
  const { data: allRecordsQuery } = useSuspenseQuery(ALL_RECORDS_QUERY, {
    context: { fetchOptions: { cache: "no-store" } },
  });

  return (
    <div>
      {!allRecordsQuery?.records && (
        <p className="text-red-500">An Error Occured...</p>
      )}

      {allRecordsQuery?.records && (
        <div>
          {/* <Button className="mb-10">Add Question</Button> */}
          <AddQuestionDialog />

          <div className="max-h-[80vh] overflow-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead className="w-[500px]">Question</TableHead>
                  <TableHead className="w-[500px]">Answer</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Assignee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allRecordsQuery.records.map((record) => (
                  <TableRow key={record._recordId}>
                    <TableCell className="font-medium">
                      {record._recordId}
                    </TableCell>
                    <TableCell>{record.question}</TableCell>
                    <TableCell>{record.answer}</TableCell>
                    <TableCell>{record.createdBy}</TableCell>
                    <TableCell>{record.createdAt}</TableCell>
                    <TableCell>{record.assignee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainTable;
