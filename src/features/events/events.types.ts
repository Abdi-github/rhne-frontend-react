import type { TranslatedField } from '@/shared/types/common.types';

export interface Event {
  _id: string;
  title: TranslatedField;
  slug: string;
  url: string;
  date: string;
  time: TranslatedField | null;
  location: TranslatedField | null;
  category: TranslatedField | null;
  description: TranslatedField | null;
  detail_url: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}
