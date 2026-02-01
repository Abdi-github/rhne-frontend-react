import type { TranslatedField } from '../types/common.types';
import type { AppLocale } from '../types/common.types';

export function localizeField(
  field: TranslatedField | null | undefined,
  locale: AppLocale,
  fallback = '',
): string {
  if (!field) return fallback;
  return field[locale] || field.fr || fallback;
}
