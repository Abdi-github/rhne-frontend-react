import type { TranslatedField } from '@/shared/types/common.types';

export interface Service {
  _id: string;
  name: TranslatedField;
  slug: string;
  category: string | null;
  image_url: string;
  description: TranslatedField | null;
  prestations: TranslatedField[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceContact {
  _id: string;
  service_id: string;
  site_id: string | null;
  site_name: string;
  email: string;
  phone: string;
  hours: TranslatedField | null;
}

export interface ServiceLink {
  _id: string;
  service_id: string;
  title: TranslatedField;
  url: string;
}
