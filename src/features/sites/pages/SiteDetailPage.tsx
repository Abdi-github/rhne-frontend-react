import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetSiteBySlugQuery } from '../sites.api';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { SiteContactCard } from '../components/SiteContactCard';
import { SiteDescriptionSection } from '../components/SiteDescriptionSection';

export default function SiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('sites');
  const { locale } = useLocalePath();
  const { data, isLoading } = useGetSiteBySlugQuery(slug!);

  const site = data?.data;

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title'), href: '/acces' },
    { label: site?.name ?? '...' },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <SEOHead title={site?.name ?? t('hero_title')} />
      <HeroSection title={site?.name ?? ''} imageUrl={site?.image_url} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {site && (
          <>
            <SiteContactCard site={site} />
            {site.description && (
              <SiteDescriptionSection
                description={site.description}
                locale={locale}
                title={t('detail.tab_description')}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}
