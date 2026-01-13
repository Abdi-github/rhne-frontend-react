import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetEventBySlugQuery } from '../events.api';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { EventDetailInfo } from '../components/EventDetailInfo';

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('events');
  const { locale } = useLocalePath();
  const { data, isLoading } = useGetEventBySlugQuery(slug!);

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title'), href: '/agenda' },
    { label: data?.data ? localizeField(data.data.title, locale) : '...' },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (!data?.data) return null;

  const event = data.data;
  const title = localizeField(event.title, locale);

  return (
    <>
      <SEOHead title={title} />
      <HeroSection title={title} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <EventDetailInfo event={event} />
      </Container>
    </>
  );
}
