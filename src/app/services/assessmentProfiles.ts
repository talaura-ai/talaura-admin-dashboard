// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const BASE_URL = 'https://fantasytradingleague.com/api/talaura/';

// Define a service using a base URL and expected endpoints
export const assessmentProfilesApi = createApi({
  reducerPath: 'assessmentProfilesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).admin.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Access-Control-Allow-Origin', '*');

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAssessmentProfiles: builder.query({
      query: () => `organization/getProfile`,
    }),
    getAssessmentProfilesByID: builder.query<any, string>({
      query: (id) => `organization/getProfile/getAssessmentProfilesDetail/${id}`,
    }),
    createAssessmentProfiles: builder.mutation({
      query: (data) => ({
        url: `organization/assessmentProfiles/create/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateAssessmentProfilesMutation,
  useGetAssessmentProfilesByIDQuery,
  useGetAssessmentProfilesQuery,
} = assessmentProfilesApi;
