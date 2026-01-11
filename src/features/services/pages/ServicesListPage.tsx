import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import { useGetServicesQuery } from '../services.api';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { ServiceAlphabeticalList } from '../components/ServiceAlphabeticalList';

export default function ServicesListPage() {
  const { t } = useTranslation('services');
  const { locale, localeNavigate } = useLocalePath();
  const { data, isLoading } = useGetServicesQuery({ limit: 200 });

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  if (isLoading) return <LoadingSpinner />;

  const services = data?.data ?? [];

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {services.length === 0 ? (
          <EmptyState message={t('common:no_data')} />
        ) : (
          <ServiceAlphabeticalList
            services={services}
            locale={locale}
            onServiceClick={(slug) => localeNavigate(`/prestations/${slug}`)}
          />
        )}
      </Container>
    </>
  );
}
