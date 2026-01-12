import type { TranslatedField } from '@/shared/types/common.types';

export interface EmergencyHotline {
  _id: string;
  name: TranslatedField;
  slug: string;
  phone: string;
  description: TranslatedField | null;
  when_to_call: TranslatedField | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}
