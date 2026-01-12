import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetPatientInfoBySlugQuery } from '../patient-info.api';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { PatientInfoSectionAccordion } from '../components/PatientInfoSectionAccordion';

export default function PatientInfoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('patient-info');
  const { locale } = useLocalePath();
  const { data, isLoading } = useGetPatientInfoBySlugQuery(slug!);

  if (isLoading) return <LoadingSpinner />;
  if (!data?.data) return null;

  const page = data.data;
  const title = localizeField(page.title, locale);
  const content = page.content ? localizeField(page.content, locale) : null;

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title'), href: '/espace-patient' },
    { label: title },
  ];

  return (
    <>
      <SEOHead title={title} />
      <HeroSection title={title} breadcrumbs={breadcrumbs} imageUrl={page.image_url || undefined} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {content && (
          <Typography sx={{ mb: 3, whiteSpace: 'pre-line' }}>{content}</Typography>
        )}
        {page.sections.map((section) => (
          <PatientInfoSectionAccordion key={section.id} section={section} />
        ))}
      </Container>
    </>
  );
}
