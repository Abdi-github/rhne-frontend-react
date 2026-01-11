import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { ContactInfoCard } from '../components/ContactInfoCard';

interface ContactCardData {
  titleKey: string;
  phone?: string;
  descriptionKey?: string;
}

const CONTACT_CARDS: ContactCardData[] = [
  { titleKey: 'central', phone: '032 713 30 00' },
  { titleKey: 'urgences', phone: '144' },
  { titleKey: 'appointments_contact', phone: '032 713 30 00' },
  { titleKey: 'patient_relations', descriptionKey: 'patient_relations_desc' },
  { titleKey: 'hr', descriptionKey: 'hr_desc' },
  { titleKey: 'media', descriptionKey: 'media_desc' },
  { titleKey: 'general', descriptionKey: 'general_desc' },
  { titleKey: 'direction', descriptionKey: 'direction_desc' },
];

export default function ContactPage() {
  const { t } = useTranslation('contact');

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {CONTACT_CARDS.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.titleKey}>
              <ContactInfoCard
                titleKey={card.titleKey}
                phone={card.phone}
                descriptionKey={card.descriptionKey}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
