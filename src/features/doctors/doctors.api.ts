import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse, PaginationParams } from '@/shared/types/api.types';
import type { Doctor } from './doctors.types';

export const doctorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<PaginatedResponse<Doctor>, PaginationParams>({
      query: (params) => ({ url: '/doctors', params }),
      providesTags: ['Doctors'],
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorsApi;
