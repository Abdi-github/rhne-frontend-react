import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse, ApiResponse } from '@/shared/types/api.types';
import type { PatientInfo } from './patient-info.types';

export const patientInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatientInfoPages: builder.query<PaginatedResponse<PatientInfo>, void>({
      query: () => '/patient-info',
      providesTags: ['PatientInfo'],
    }),
    getPatientInfoBySlug: builder.query<ApiResponse<PatientInfo>, string>({
      query: (slug) => `/patient-info/${slug}`,
      providesTags: ['PatientInfo'],
    }),
  }),
});

export const { useGetPatientInfoPagesQuery, useGetPatientInfoBySlugQuery } = patientInfoApi;
