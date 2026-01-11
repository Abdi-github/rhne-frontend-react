import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse, ApiResponse, PaginationParams } from '@/shared/types/api.types';
import type { Service } from './services.types';

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<PaginatedResponse<Service>, PaginationParams>({
      query: (params) => ({ url: '/services', params }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: 'Services' as const, id: _id })), { type: 'Services', id: 'LIST' }]
          : [{ type: 'Services', id: 'LIST' }],
    }),
    getServiceBySlug: builder.query<ApiResponse<Service>, string>({
      query: (slug) => `/services/${slug}`,
      providesTags: (_, __, slug) => [{ type: 'Services', id: slug }],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceBySlugQuery } = servicesApi;
