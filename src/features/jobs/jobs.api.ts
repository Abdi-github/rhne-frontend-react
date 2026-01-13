import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse, PaginationParams } from '@/shared/types/api.types';
import type { Job } from './jobs.types';

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<PaginatedResponse<Job>, PaginationParams & { category?: string }>({
      query: (params) => ({ url: '/jobs', params }),
      providesTags: ['Jobs'],
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
