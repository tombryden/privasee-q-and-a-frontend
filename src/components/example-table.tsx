import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
/**
 *           <TableHead className="w-[100px]">Record ID</TableHead>
          <TableHead>Company ID</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead className="max-w-[100px]">Question</TableHead>
          <TableHead className="max-w-[100px]">Answer</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated By</TableHead>
          <TableHead>Updated At</TableHead>
 */

const records = [
  {
    recordId: "recZKU8MDpi4rvA0d",
    companyId: "63297",
    companyName: "Test Company Limited",
    question:
      "Do you collect any Special Category Data and if so, how do you use it?",
    answer:
      "As a Controller, Test Company doesn't process any Special Category Data.",
    createdBy: "tombryden1@gmail.com",
    createdAt: "11/3/2024 9:02pm",
    assignee: "alex@privasee.io",
  },
  {
    recordId: "recZKU8MDpi4rvA0d",
    companyId: "63297",
    companyName: "Test Company Limited",
    question:
      "Do you collect any Special Category Data and if so, how do you use it?",
    answer:
      "As a Controller, Test Company doesn't process any Special Category Data.",
    createdBy: "tombryden1@gmail.com",
    createdAt: "11/3/2024 9:02pm",
    assignee: "alex@privasee.io",
  },
  {
    recordId: "recZKU8MDpi4rvA0d",
    companyId: "63297",
    companyName: "Test Company Limited",
    question:
      "Do you collect any Special Category Data and if so, how do you use it?",
    answer:
      "As a Controller, Test Company doesn't process any Special Category Data.",
    createdBy: "tombryden1@gmail.com",
    createdAt: "11/3/2024 9:02pm",
    assignee: "alex@privasee.io",
  },
  {
    recordId: "recZKU8MDpi4rvA0d",
    companyId: "63297",
    companyName: "Test Company Limited",
    question:
      "Do you collect any Special Category Data and if so, how do you use it?",
    answer:
      "As a Controller, Test Company doesn't process any Special Category Data.",
    createdBy: "tombryden1@gmail.com",
    createdAt: "11/3/2024 9:02pm",
    assignee: "alex@privasee.io",
  },
  {
    recordId: "recZKU8MDpi4rvA0d",
    companyId: "63297",
    companyName: "Test Company Limited",
    question:
      "Do you collect any Special Category Data and if so, how do you use it?",
    answer:
      "As a Controller, Test Company doesn't process any Special Category Data.",
    createdBy: "tombryden1@gmail.com",
    createdAt: "11/3/2024 9:02pm",
    assignee: "alex@privasee.io",
  },
];

export default function ExampleTable() {
  return (
    <Table className="min-w-full">
      <TableCaption>Here are your current questions & answers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Record ID</TableHead>
          {/* <TableHead>Company ID</TableHead> */}
          {/* <TableHead>Company Name</TableHead> */}
          <TableHead className="w-[500px]">Question</TableHead>
          <TableHead className="w-[500px]">Answer</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Assignee</TableHead>
          {/* <TableHead>Updated By</TableHead> */}
          {/* <TableHead>Updated At</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.recordId}>
            <TableCell className="font-medium">{record.recordId}</TableCell>
            {/* <TableCell>{record.companyId}</TableCell> */}
            {/* <TableCell>{record.companyName}</TableCell> */}
            <TableCell>{record.question}</TableCell>
            <TableCell>{record.answer}</TableCell>
            <TableCell>{record.createdBy}</TableCell>
            <TableCell>{record.createdAt}</TableCell>
            <TableCell>{record.assignee}</TableCell>
            {/* <TableCell>{record.updatedAt}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
