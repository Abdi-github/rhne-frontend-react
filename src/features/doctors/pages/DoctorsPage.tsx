import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetDoctorsQuery } from '../doctors.api';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { DoctorGrid } from '../components/DoctorGrid';

export default function DoctorsPage() {
  const { t } = useTranslation('doctors');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useGetDoctorsQuery({ search: debouncedSearch || undefined, limit: 200 });

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  if (isLoading) return <LoadingSpinner />;

  const doctors = data?.data ?? [];

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TextField
          fullWidth
          placeholder={t('search_placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />
        <DoctorGrid doctors={doctors} />
      </Container>
    </>
  );
}
