"use client";

import { graphql } from "@/gql";
import { columns } from "./components/records-data-table/columns/columns";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import RecordsDataTable from "./components/records-data-table/records-data-table";

const ALL_RECORDS_QUERY = graphql(`
  query AllRecords($searchTerm: String) {
    records(searchTerm: $searchTerm) {
      _recordId
      _companyId
      companyName
      question
      answer
      createdBy
      createdAt
      updatedBy
      updatedAt
      assignee
      properties
      questionDescription
    }
  }
`);

export default function HomePage() {
  const { data: allRecordsQuery, refetch: refetchAllRecords } =
    useSuspenseQuery(ALL_RECORDS_QUERY, {
      context: { fetchOptions: { cache: "no-store" } },
    });

  return (
    <div className="mx-auto px-10">
      {allRecordsQuery.records && (
        <RecordsDataTable
          columns={columns}
          data={allRecordsQuery.records}
          refetchAllRecords={refetchAllRecords}
        />
      )}
    </div>
  );
}
