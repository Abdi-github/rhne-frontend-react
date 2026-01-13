import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse, PaginationParams, ApiResponse } from '@/shared/types/api.types';
import type { Event } from './events.types';

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<PaginatedResponse<Event>, PaginationParams>({
      query: (params) => ({ url: '/events', params }),
      providesTags: ['Events'],
    }),
    getEventBySlug: builder.query<ApiResponse<Event>, string>({
      query: (slug) => `/events/${slug}`,
      providesTags: ['Events'],
    }),
  }),
});

export const { useGetEventsQuery, useGetEventBySlugQuery } = eventsApi;
