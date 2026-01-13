import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse, PaginationParams } from '@/shared/types/api.types';
import type { Newborn } from './newborns.types';

export const newbornsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewborns: builder.query<PaginatedResponse<Newborn>, PaginationParams>({
      query: (params) => ({ url: '/newborns', params }),
      providesTags: ['Newborns'],
    }),
  }),
});

export const { useGetNewbornsQuery } = newbornsApi;
