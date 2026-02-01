import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import 'dayjs/locale/de';
import 'dayjs/locale/it';

export function formatDate(date: string, locale = 'fr'): string {
  return dayjs(date).locale(locale).format('D MMMM YYYY');
}

export function formatDateShort(date: string, locale = 'fr'): string {
  return dayjs(date).locale(locale).format('DD.MM.YYYY');
}

export function formatDay(date: string): string {
  return dayjs(date).format('DD');
}

export function formatMonth(date: string, locale = 'fr'): string {
  return dayjs(date).locale(locale).format('MMM').toUpperCase();
}

export function formatYear(date: string): string {
  return dayjs(date).format('YYYY');
}
