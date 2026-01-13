import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import { useGetEventsQuery } from '../events.api';
import { EventCard } from '../components/EventCard';

export default function EventsListPage() {
  const { t } = useTranslation('events');
  const { data, isLoading } = useGetEventsQuery({ limit: 50 });

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  if (isLoading) return <LoadingSpinner />;

  const events = data?.data ?? [];

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {events.length === 0 ? (
          <EmptyState message={t('no_events')} />
        ) : (
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid size={{ xs: 12, md: 6 }} key={event._id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
