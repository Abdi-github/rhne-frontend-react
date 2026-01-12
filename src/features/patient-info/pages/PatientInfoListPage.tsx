import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import { useGetPatientInfoPagesQuery } from '../patient-info.api';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { PatientInfoListItem } from '../components/PatientInfoListItem';

export default function PatientInfoListPage() {
  const { t } = useTranslation('patient-info');
  const { localeNavigate } = useLocalePath();
  const { data, isLoading } = useGetPatientInfoPagesQuery();

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  if (isLoading) return <LoadingSpinner />;

  const pages = data?.data ?? [];

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {pages.length === 0 ? (
          <EmptyState message={t('no_info')} />
        ) : (
          <List disablePadding>
            {pages.map((page) => (
              <PatientInfoListItem
                key={page._id}
                page={page}
                onClick={(slug) => localeNavigate(`/espace-patient/${slug}`)}
              />
            ))}
          </List>
        )}
      </Container>
    </>
  );
}
