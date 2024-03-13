/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type AssignRecordInput = {
  assignee: Scalars['String']['input'];
  recordIds: Array<Scalars['ID']['input']>;
};

export type CreateRecordInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  assignee?: InputMaybe<Scalars['String']['input']>;
  createdBy: Scalars['String']['input'];
  properties?: InputMaybe<Scalars['String']['input']>;
  question: Scalars['String']['input'];
  questionDescription?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Bulk assign records to an email */
  assignRecords: Array<Record>;
  /** Create a new question/answer record */
  createRecord: Record;
  /** Update records with new information */
  updateRecord: Record;
};


export type MutationAssignRecordsArgs = {
  assignRecordInput: AssignRecordInput;
};


export type MutationCreateRecordArgs = {
  createRecordInput: CreateRecordInput;
};


export type MutationUpdateRecordArgs = {
  updateRecordInput: UpdateRecordInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get one question/answer record */
  record: Record;
  /** List all questions and answers */
  records: Array<Record>;
};


export type QueryRecordArgs = {
  recordId: Scalars['ID']['input'];
};


export type QueryRecordsArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a row in the Question / Answers Airtable sheet */
export type Record = {
  __typename?: 'Record';
  _companyId: Scalars['ID']['output'];
  _recordId: Scalars['ID']['output'];
  answer?: Maybe<Scalars['String']['output']>;
  assignee?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Scalars['String']['output'];
  properties?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  questionDescription?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Scalars['String']['output'];
};

export type UpdateRecordInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  questionDescription?: InputMaybe<Scalars['String']['input']>;
  recordId: Scalars['ID']['input'];
};

export type CreateRecord2MutationVariables = Exact<{
  createRecordInput: CreateRecordInput;
}>;


export type CreateRecord2Mutation = { __typename?: 'Mutation', createRecord: { __typename?: 'Record', _recordId: string } };

export type AssignRecordsMutationVariables = Exact<{
  assignRecordInput: AssignRecordInput;
}>;


export type AssignRecordsMutation = { __typename?: 'Mutation', assignRecords: Array<{ __typename?: 'Record', _recordId: string, assignee?: string | null, updatedAt: any, updatedBy: string }> };

export type UpdateRecordMutationVariables = Exact<{
  updateRecordInput: UpdateRecordInput;
}>;


export type UpdateRecordMutation = { __typename?: 'Mutation', updateRecord: { __typename?: 'Record', _recordId: string, question: string, answer?: string | null, updatedAt: any, updatedBy: string, properties?: string | null, questionDescription?: string | null } };

export type AllRecordsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
}>;


export type AllRecordsQuery = { __typename?: 'Query', records: Array<{ __typename?: 'Record', _recordId: string, _companyId: string, companyName: string, question: string, answer?: string | null, createdBy: string, createdAt: any, updatedBy: string, updatedAt: any, assignee?: string | null, properties?: string | null, questionDescription?: string | null }> };


export const CreateRecord2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRecord2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRecordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRecordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRecordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_recordId"}}]}}]}}]} as unknown as DocumentNode<CreateRecord2Mutation, CreateRecord2MutationVariables>;
export const AssignRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"assignRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignRecordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assignRecordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignRecordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_recordId"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}}]}}]}}]} as unknown as DocumentNode<AssignRecordsMutation, AssignRecordsMutationVariables>;
export const UpdateRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateRecordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateRecordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateRecordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_recordId"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}},{"kind":"Field","name":{"kind":"Name","value":"questionDescription"}}]}}]}}]} as unknown as DocumentNode<UpdateRecordMutation, UpdateRecordMutationVariables>;
export const AllRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"records"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_recordId"}},{"kind":"Field","name":{"kind":"Name","value":"_companyId"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"}},{"kind":"Field","name":{"kind":"Name","value":"properties"}},{"kind":"Field","name":{"kind":"Name","value":"questionDescription"}}]}}]}}]} as unknown as DocumentNode<AllRecordsQuery, AllRecordsQueryVariables>;