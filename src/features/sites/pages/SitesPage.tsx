import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetSitesQuery } from '../sites.api';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { SiteCard } from '../components/SiteCard';

export default function SitesPage() {
  const { t } = useTranslation('sites');
  const { locale, localeNavigate } = useLocalePath();
  const { data, isLoading } = useGetSitesQuery();

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
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          {t('portrait_title')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          {t('portrait_description')}
        </Typography>

        <Grid container spacing={3}>
          {data?.data?.map((site) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={site._id}>
              <SiteCard
                site={site}
                locale={locale}
                onClick={() => localeNavigate(`/acces/${site.slug}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
