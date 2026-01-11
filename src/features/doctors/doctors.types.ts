import type { TranslatedField } from '@/shared/types/common.types';

export interface Doctor {
  _id: string;
  name: string;
  title: string | null;
  service_id: string;
  service_name: string;
  image_url: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}
