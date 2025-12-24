import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/app/hooks';
import { setLanguage } from '@/shared/state/uiSlice';
import type { AppLocale } from '@/shared/types/common.types';

const SUPPORTED_LOCALES: AppLocale[] = ['fr', 'en', 'de', 'it'];

export function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!locale || !SUPPORTED_LOCALES.includes(locale as AppLocale)) {
      navigate('/fr', { replace: true });
      return;
    }
    const validLocale = locale as AppLocale;
    if (i18n.language !== validLocale) {
      i18n.changeLanguage(validLocale);
    }
    dispatch(setLanguage(validLocale));
  }, [locale, i18n, dispatch, navigate]);

  if (!locale || !SUPPORTED_LOCALES.includes(locale as AppLocale)) {
    return null;
  }

  return <Outlet />;
}
