import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { PageTabs } from '@/shared/components/PageTabs';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetServiceBySlugQuery } from '../services.api';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { localizeField } from '@/shared/utils/localizeField';
import { ServiceDetailContent } from '../components/ServiceDetailContent';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('services');
  const { locale } = useLocalePath();
  const { data, isLoading } = useGetServiceBySlugQuery(slug!);
  const [activeTab, setActiveTab] = useState('presentation');

  const service = data?.data;

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title'), href: '/prestations' },
    { label: service ? localizeField(service.name, locale) : '...' },
  ];

  const tabs = [
    { id: 'presentation', label: t('detail.tab_presentation') },
    { id: 'prestations', label: t('detail.tab_prestations') },
    { id: 'contacts', label: t('detail.tab_contacts') },
    { id: 'links', label: t('detail.tab_links') },
    { id: 'doctors', label: t('detail.tab_doctors') },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <SEOHead title={service ? localizeField(service.name, locale) : t('hero_title')} />
      <HeroSection
        title={service ? localizeField(service.name, locale) : t('hero_title')}
        imageUrl={service?.image_url}
        breadcrumbs={breadcrumbs}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        {service && <ServiceDetailContent service={service} activeTab={activeTab} />}
      </Container>
    </>
  );
}
