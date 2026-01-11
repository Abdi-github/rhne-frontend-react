import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse, ApiResponse } from '@/shared/types/api.types';
import type { Site } from './sites.types';

export const sitesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.query<PaginatedResponse<Site>, void>({
      query: () => '/sites',
      providesTags: ['Sites'],
    }),
    getSiteBySlug: builder.query<ApiResponse<Site>, string>({
      query: (slug) => `/sites/${slug}`,
      providesTags: (_, __, slug) => [{ type: 'Sites', id: slug }],
    }),
  }),
});

export const { useGetSitesQuery, useGetSiteBySlugQuery } = sitesApi;
