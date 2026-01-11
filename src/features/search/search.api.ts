import { baseApi } from '@/shared/api/baseApi';
import type { SearchResponse } from './search.types';

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query<SearchResponse, { q: string; resources?: string; limit?: number }>({
      query: (params) => ({ url: '/search', params }),
      providesTags: ['Search'],
    }),
  }),
});

export const { useGlobalSearchQuery } = searchApi;
