import { useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import type { AppLocale } from '@/shared/types/common.types';

const SUPPORTED_LOCALES: AppLocale[] = ['fr', 'en', 'de', 'it'];

export function useLocalePath() {
  const { locale } = useParams<{ locale: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocale: AppLocale =
    locale && SUPPORTED_LOCALES.includes(locale as AppLocale)
      ? (locale as AppLocale)
      : 'fr';

  const localePath = useCallback(
    (path: string) => `/${currentLocale}${path.startsWith('/') ? path : `/${path}`}`,
    [currentLocale],
  );

  const localeNavigate = useCallback(
    (path: string, options?: { replace?: boolean }) => {
      navigate(localePath(path), options);
    },
    [navigate, localePath],
  );

  const switchLocale = useCallback(
    (newLocale: AppLocale) => {
      const pathWithoutLocale = location.pathname.replace(/^\/[a-z]{2}/, '') || '/';
      navigate(`/${newLocale}${pathWithoutLocale}${location.search}`, { replace: true });
    },
    [navigate, location],
  );

  return { locale: currentLocale, localePath, localeNavigate, switchLocale };
}
