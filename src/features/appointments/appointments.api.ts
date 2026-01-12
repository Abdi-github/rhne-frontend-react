import { baseApi } from '@/shared/api/baseApi';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';
import type { AppointmentType, AppointmentSlot, Booking, BookingPayload } from './appointments.types';

export const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentTypes: builder.query<PaginatedResponse<AppointmentType>, void>({
      query: () => '/appointments',
      providesTags: ['Appointments'],
    }),
    getAppointmentSlots: builder.query<
      ApiResponse<AppointmentSlot[]>,
      { appointment_type: string; date: string; site_id?: string }
    >({
      query: (params) => ({ url: '/appointment-bookings/slots', params }),
      providesTags: ['AppointmentBookings'],
    }),
    createBooking: builder.mutation<ApiResponse<Booking>, BookingPayload>({
      query: (body) => ({ url: '/appointment-bookings', method: 'POST', body }),
      invalidatesTags: ['AppointmentBookings'],
    }),
    getBookingByReference: builder.query<ApiResponse<Booking>, string>({
      query: (ref) => `/appointment-bookings/${ref}`,
      providesTags: ['AppointmentBookings'],
    }),
    cancelBooking: builder.mutation<ApiResponse<Booking>, { reference: string; reason?: string }>({
      query: ({ reference, reason }) => ({
        url: `/appointment-bookings/${reference}/cancel`,
        method: 'PUT',
        body: { reason: reason || '' },
      }),
      invalidatesTags: ['AppointmentBookings'],
    }),
  }),
});

export const {
  useGetAppointmentTypesQuery,
  useGetAppointmentSlotsQuery,
  useCreateBookingMutation,
  useGetBookingByReferenceQuery,
  useLazyGetBookingByReferenceQuery,
  useCancelBookingMutation,
} = appointmentsApi;
