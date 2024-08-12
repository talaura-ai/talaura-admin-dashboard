import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAddCandidateApiPayload,
  ICandidateData,
  ICandidateReportData,
} from '../../components/AssessmentView/types';
import { IExtendCandidateAssessmentPayload } from '../../helpers/types';
import { RootState } from '../store';

const BASE_URL = 'https://fantasytradingleague.com/api/talaura/';

// Define a service using a base URL and expected endpoints
export const candidatesApi = createApi({
  reducerPath: 'candidatesApi',
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
  tagTypes: ['Candidates', 'Assessments'],

  endpoints: (builder) => ({
    getAllCandidates: builder.query<
      ICandidateData,
      { id: string; pageSize?: number; status?: string; pageNum?: number; currentTab?: string }
    >({
      query: (args) => {
        const { id, pageSize = 6, status, pageNum = 0, currentTab } = args;

        let url = '';
        switch (currentTab) {
          case 'Pending':
            url = `organization/candidate/fetchCandidate?assessmentId=${id}`;
            break;
          case 'Expired':
            url = `organization/candidate/fetchExpiredCandidate?assessmentId=${id}`;
            break;
          case 'Completed':
            url = `organization/candidate/fetchCandidateCompleted?assessmentId=${id}`;
            break;
        }
        if (pageSize) {
          url += `&pageSize=${pageSize}`;
        }
        if (status) {
          url += `&status=${status}`;
        }
        if (pageNum) {
          url += `&page=${pageNum}`;
        }
        return url;
      },
      providesTags: ['Candidates'],
    }),

    getCandidateReports: builder.mutation<ICandidateReportData, string>({
      query: (candidateId: string) => ({
        url: `organization/candidate/fetchReport`,
        method: 'POST',
        body: { candidateId },
      }),
    }),
    resetModules: builder.mutation<ICandidateReportData, string[]>({
      query: (candidateIds: string[]) => ({
        url: `organization/candidate/resetModules`,
        method: 'POST',
        body: { candidates: candidateIds },
      }),
    }),

    extendCandidateAssessmentDuration: builder.mutation<
      ICandidateReportData,
      IExtendCandidateAssessmentPayload
    >({
      query: ({ candidateId, endsOn, startsAt }: IExtendCandidateAssessmentPayload) => ({
        url: `organization/candidate/extendTiming`,
        method: 'POST',
        body: { candidateId, endsOn, startsAt },
      }),
    }),

    notifyCandidate: builder.mutation<ICandidateReportData, string>({
      query: (candidateId: string) => ({
        url: `organization/candidate/notifyCandidate`,
        method: 'POST',
        body: { candidateId },
      }),
    }),

    inviteCandidate: builder.mutation<
      {
        status: boolean;
        existingCandidate: {
          name: string;
          email: string;
        }[];
        assessmentId: string;
      },
      unknown
    >({
      query: (data: IAddCandidateApiPayload) => ({
        url: 'organization/candidate/addCandidate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Candidates', 'Assessments'],
    }),
    updateCandidatesStatus: builder.mutation<
      unknown,
      {
        status: string;
        candidates: string[];
      }
    >({
      query: (data: { status: string; candidates: string[] }) => ({
        url: 'organization/candidate/updateStatus',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Candidates'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCandidatesQuery,
  useLazyGetAllCandidatesQuery,
  useInviteCandidateMutation,
  useGetCandidateReportsMutation,
  useNotifyCandidateMutation,
  useExtendCandidateAssessmentDurationMutation,
  useUpdateCandidatesStatusMutation,
  useResetModulesMutation,
} = candidatesApi;
