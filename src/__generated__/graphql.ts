/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateJobApplicationInput = {
  companyId?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  salaryAmount?: InputMaybe<Scalars['Float']>;
  salaryBase?: InputMaybe<SalaryBase>;
  stage?: InputMaybe<JobApplicationStage>;
  title: Scalars['String'];
};

export type JobApplication = {
  __typename?: 'JobApplication';
  company?: Maybe<Company>;
  id: Scalars['ID'];
  salaryAmount?: Maybe<Scalars['Float']>;
  salaryBase?: Maybe<SalaryBase>;
  stage?: Maybe<JobApplicationStage>;
  title: Scalars['String'];
  userId: Scalars['String'];
};

export enum JobApplicationStage {
  Applied = 'APPLIED',
  Challenge = 'CHALLENGE',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  FirstMeetingDone = 'FIRST_MEETING_DONE',
  FirstMeetingScheduled = 'FIRST_MEETING_SCHEDULED',
  Lead = 'LEAD',
  Offer = 'OFFER',
  Rejected = 'REJECTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  createJobApplication: JobApplication;
  removeCompany: Company;
  removeJobApplication: JobApplication;
  updateCompany: Company;
  updateJobApplication: JobApplication;
};


export type MutationCreateCompanyArgs = {
  createCompanyInput: CreateCompanyInput;
};


export type MutationCreateJobApplicationArgs = {
  createJobApplicationInput: CreateJobApplicationInput;
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['String'];
};


export type MutationRemoveJobApplicationArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCompanyArgs = {
  updateCompanyInput: UpdateCompanyInput;
};


export type MutationUpdateJobApplicationArgs = {
  updateJobApplicationInput: UpdateJobApplicationInput;
};

export type Query = {
  __typename?: 'Query';
  companies: Array<Company>;
  company: Company;
  jobApplication: JobApplication;
  jobApplications: Array<JobApplication>;
};


export type QueryCompanyArgs = {
  id: Scalars['String'];
};


export type QueryJobApplicationArgs = {
  id: Scalars['String'];
};

export enum SalaryBase {
  Annually = 'ANNUALLY',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type UpdateCompanyInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateJobApplicationInput = {
  companyId?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  salaryAmount?: InputMaybe<Scalars['Float']>;
  salaryBase?: InputMaybe<SalaryBase>;
  stage?: InputMaybe<JobApplicationStage>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateJobApplicationMutationVariables = Exact<{
  input: CreateJobApplicationInput;
}>;


export type CreateJobApplicationMutation = { __typename?: 'Mutation', createJobApplication: { __typename?: 'JobApplication', id: string, title: string } };

export type UpdateJobApplicationMutationVariables = Exact<{
  input: UpdateJobApplicationInput;
}>;


export type UpdateJobApplicationMutation = { __typename?: 'Mutation', updateJobApplication: { __typename?: 'JobApplication', id: string, title: string } };

export type JobApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type JobApplicationsQuery = { __typename?: 'Query', jobApplications: Array<{ __typename?: 'JobApplication', id: string, title: string, stage?: JobApplicationStage | null, salaryAmount?: number | null, salaryBase?: SalaryBase | null, company?: { __typename?: 'Company', name: string } | null }> };


export const CreateJobApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobApplicationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobApplicationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateJobApplicationMutation, CreateJobApplicationMutationVariables>;
export const UpdateJobApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJobApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobApplicationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJobApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateJobApplicationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateJobApplicationMutation, UpdateJobApplicationMutationVariables>;
export const JobApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"stage"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"salaryAmount"}},{"kind":"Field","name":{"kind":"Name","value":"salaryBase"}}]}}]}}]} as unknown as DocumentNode<JobApplicationsQuery, JobApplicationsQueryVariables>;