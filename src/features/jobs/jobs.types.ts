import type { TranslatedField } from '@/shared/types/common.types';

export interface Job {
  _id: string;
  title: TranslatedField;
  job_id: string;
  url: string;
  category: string;
  percentage: string;
  description: TranslatedField | null;
  requirements: TranslatedField[];
  site: string | null;
  department: string | null;
  published_date: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}
