import type { TranslatedField } from '@/shared/types/common.types';

export interface AppointmentType {
  _id: string;
  title: TranslatedField;
  slug: string;
  appointment_type: 'adult' | 'child' | 'doctor';
  description: TranslatedField | null;
  age_restriction: TranslatedField | null;
  schedule: TranslatedField | null;
  locations: TranslatedField | null;
  booking_url: string;
  info_text: TranslatedField | null;
  conditions: TranslatedField[];
  phone_number: string;
  display_order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentSlot {
  start: string;
  end: string;
  label: string;
  available: boolean;
}

export interface BookingPayload {
  appointment_id: string;
  site_id?: string;
  preferred_date: string;
  preferred_time_slot: string;
  reason: string;
  symptoms?: string[];
  patient_info: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
  };
}

export interface Booking {
  _id: string;
  booking_reference: string;
  appointment_type: string;
  patient_info: {
    first_name: string;
    last_name: string;
    email: string;
  };
  site_name: string;
  preferred_date: string;
  preferred_time_slot: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  createdAt: string;
}
