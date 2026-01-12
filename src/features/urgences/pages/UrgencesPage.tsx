import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetEmergencyHotlinesQuery } from '../urgences.api';
import { EmergencyHotlineCard } from '../components/EmergencyHotlineCard';
import { EmergencyInfoSection } from '../components/EmergencyInfoSection';
import { OccupancyStatus } from '../components/OccupancyStatus';

export default function UrgencesPage() {
  const { t } = useTranslation('urgences');
  const { data, isLoading } = useGetEmergencyHotlinesQuery();

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
            fontWeight: 700,
            mb: 4,
            textTransform: 'uppercase',
            color: 'text.primary',
          }}
        >
          {t('page_heading', 'Urgences vitales, services d\'urgence et orientation')}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {data?.data?.map((hotline) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={hotline._id}>
              <EmergencyHotlineCard hotline={hotline} />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <EmergencyInfoSection />
          <OccupancyStatus />
        </Box>
      </Container>
    </>
  );
}
