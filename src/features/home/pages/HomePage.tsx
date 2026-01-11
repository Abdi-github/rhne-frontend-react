import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/shared/components/SEOHead';
import { HeroBanner } from '../components/HeroBanner';
import { SearchPanel } from '../components/SearchPanel';
import { BodySearchSection } from '../components/BodySearchSection';
import { QuickAccessBar } from '../components/QuickAccessBar';

export default function HomePage() {
  const { t } = useTranslation('home');

  const quickAccessItems = [
    { icon: 'bi-telephone', label: t('quick_access.contact'), href: '/contact' },
    { icon: 'bi-geo-alt', label: t('quick_access.access'), href: '/acces' },
    { icon: 'bi-emoji-smile', label: t('quick_access.newborns'), href: '/bebes-en-ligne' },
    { icon: 'bi-calendar-event', label: t('quick_access.agenda'), href: '/agenda' },
  ];

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroBanner title={t('hero_title')} />
      <SearchPanel
        title={t('search_title')}
        professionalLabel={t('search_professional')}
        serviceLabel={t('search_service')}
        infoLabel={t('search_info')}
      />
      <BodySearchSection />
      <QuickAccessBar items={quickAccessItems} />
    </>
  );
}
