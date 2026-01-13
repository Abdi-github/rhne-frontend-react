import { useState } from 'react';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { useGetNewbornsQuery } from '../newborns.api';
import { NewbornGrid } from '../components/NewbornGrid';

export default function NewbornsPage() {
  const { t } = useTranslation('newborns');
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNewbornsQuery({ page, limit: 24 });

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  if (isLoading) return <LoadingSpinner />;

  const newborns = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <NewbornGrid newborns={newborns} />
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </>
  );
}
