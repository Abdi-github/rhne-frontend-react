import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse } from '@/shared/types/api.types';
import type { EmergencyHotline } from './urgences.types';

export const urgencesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmergencyHotlines: builder.query<ApiResponse<EmergencyHotline[]>, void>({
      query: () => '/emergency-hotlines',
      providesTags: ['EmergencyHotlines'],
    }),
  }),
});

export const { useGetEmergencyHotlinesQuery } = urgencesApi;
