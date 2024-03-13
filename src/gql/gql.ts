/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createRecord2($createRecordInput: CreateRecordInput!) {\n    createRecord(createRecordInput: $createRecordInput) {\n      _recordId\n    }\n  }\n": types.CreateRecord2Document,
    "\n  mutation assignRecords($assignRecordInput: AssignRecordInput!) {\n    assignRecords(assignRecordInput: $assignRecordInput) {\n      _recordId\n      assignee\n      updatedAt\n      updatedBy\n    }\n  }\n": types.AssignRecordsDocument,
    "\n  mutation updateRecord($updateRecordInput: UpdateRecordInput!) {\n    updateRecord(updateRecordInput: $updateRecordInput) {\n      _recordId\n      question\n      answer\n      updatedAt\n      updatedBy\n      properties\n      questionDescription\n    }\n  }\n": types.UpdateRecordDocument,
    "\n  query AllRecords($searchTerm: String) {\n    records(searchTerm: $searchTerm) {\n      _recordId\n      _companyId\n      companyName\n      question\n      answer\n      createdBy\n      createdAt\n      updatedBy\n      updatedAt\n      assignee\n      properties\n      questionDescription\n    }\n  }\n": types.AllRecordsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createRecord2($createRecordInput: CreateRecordInput!) {\n    createRecord(createRecordInput: $createRecordInput) {\n      _recordId\n    }\n  }\n"): (typeof documents)["\n  mutation createRecord2($createRecordInput: CreateRecordInput!) {\n    createRecord(createRecordInput: $createRecordInput) {\n      _recordId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation assignRecords($assignRecordInput: AssignRecordInput!) {\n    assignRecords(assignRecordInput: $assignRecordInput) {\n      _recordId\n      assignee\n      updatedAt\n      updatedBy\n    }\n  }\n"): (typeof documents)["\n  mutation assignRecords($assignRecordInput: AssignRecordInput!) {\n    assignRecords(assignRecordInput: $assignRecordInput) {\n      _recordId\n      assignee\n      updatedAt\n      updatedBy\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateRecord($updateRecordInput: UpdateRecordInput!) {\n    updateRecord(updateRecordInput: $updateRecordInput) {\n      _recordId\n      question\n      answer\n      updatedAt\n      updatedBy\n      properties\n      questionDescription\n    }\n  }\n"): (typeof documents)["\n  mutation updateRecord($updateRecordInput: UpdateRecordInput!) {\n    updateRecord(updateRecordInput: $updateRecordInput) {\n      _recordId\n      question\n      answer\n      updatedAt\n      updatedBy\n      properties\n      questionDescription\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllRecords($searchTerm: String) {\n    records(searchTerm: $searchTerm) {\n      _recordId\n      _companyId\n      companyName\n      question\n      answer\n      createdBy\n      createdAt\n      updatedBy\n      updatedAt\n      assignee\n      properties\n      questionDescription\n    }\n  }\n"): (typeof documents)["\n  query AllRecords($searchTerm: String) {\n    records(searchTerm: $searchTerm) {\n      _recordId\n      _companyId\n      companyName\n      question\n      answer\n      createdBy\n      createdAt\n      updatedBy\n      updatedAt\n      assignee\n      properties\n      questionDescription\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;