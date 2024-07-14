// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAssessmentDetails } from '../../components/AssessmentView/types';
import { AssessmentsState } from '../../helpers/types';
import { RootState } from '../store';

const BASE_URL = 'https://fantasytradingleague.com/api/talaura/';

// Define a service using a base URL and expected endpoints
export const assessmentApi = createApi({
  reducerPath: 'assessmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).admin.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      headers.set('Access-Control-Allow-Origin', '*');

      return headers;
    },
  }),
  tagTypes: ['Assessments'],

  // endpoints: (builder) => ({
  //   getAll: builder.query<any, string>({
  //     query: () => `organization/assessment/getAssessments`,
  //     providesTags: ["Assessments"],
  //   }),
  //   getAssessmentByName: builder.query<any, string>({
  //     query: (name) => `organization/assessment/getAssessmentDetail/${name}`,
  //   }),
  //   getAssessmentByID: builder.query<any, string>({
  // tagTypes: ['Assessments'],

  endpoints: (builder) => ({
    getAll: builder.query<any, string>({
      query: () => `organization/assessment/getAssessments`,
      providesTags: ['Assessments'],
    }),
    getAssessmentByName: builder.query<AssessmentsState, string>({
      query: (name) => `organization/assessment/getAssessmentDetail/${name}`,
    }),
    getAssessmentByID: builder.query<IAssessmentDetails, string>({
      query: (id) => `organization/assessment/getAssessmentDetail/${id}`,
    }),
    createAssessment: builder.mutation({
      query: (data) => ({
        url: `organization/assessment/create`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ["Assessments"],
      //   method: 'POST',
      //   body: data,
      // }),
      invalidatesTags: ['Assessments'],
    }),
    getQuestions: builder.query({
      query: (profile) => `organization/getQuestion/${profile}`,
    }),
    saveSkillsToAssessment: builder.mutation({
      query: (data) => ({
        url: `organization/assessment/addSkills`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assessments'],
    }),
    saveModulesToAssessment: builder.mutation({
      query: (data) => ({
        url: `organization/assessment/addModule`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assessments'],
    }),
    saveQuestionsToAssessment: builder.mutation({
      query: (data) => ({
        url: `organization/assessment/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assessments'],
    }),
    duplicateAssessment: builder.mutation({
      query: (data: { _id: string; name: string }) => ({
        url: `organization/assessment/duplicate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assessments'],
    }),
    renameAssessment: builder.mutation({
      query: (data: { _id: string; name: string }) => ({
        url: `organization/assessment/rename`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assessments'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllQuery,
  useGetAssessmentByNameQuery,
  useCreateAssessmentMutation,
  useGetQuestionsQuery,
  useSaveSkillsToAssessmentMutation,
  useGetAssessmentByIDQuery,
  useSaveModulesToAssessmentMutation,
  useSaveQuestionsToAssessmentMutation,
  useDuplicateAssessmentMutation,
  useRenameAssessmentMutation,
} = assessmentApi;
