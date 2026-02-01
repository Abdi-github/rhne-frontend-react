export interface TranslatedField {
  fr: string;
  en: string;
  de: string;
  it: string;
}

export type AppLocale = 'fr' | 'en' | 'de' | 'it';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
