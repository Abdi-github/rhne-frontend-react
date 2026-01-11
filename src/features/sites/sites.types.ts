import type { TranslatedField } from '@/shared/types/common.types';

export interface Site {
  _id: string;
  name: string;
  slug: string;
  type: TranslatedField;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  maps_url: string;
  image_url: string;
  description: TranslatedField | null;
  amenities: TranslatedField[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}
