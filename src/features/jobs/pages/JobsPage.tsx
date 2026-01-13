import { useState } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import { useGetJobsQuery } from '../jobs.api';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { JobListItem } from '../components/JobListItem';

export default function JobsPage() {
  const { t } = useTranslation('jobs');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useGetJobsQuery({ limit: 100, search: debouncedSearch || undefined });

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  if (isLoading) return <LoadingSpinner />;

  const jobs = data?.data ?? [];

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
        {jobs.length === 0 ? (
          <EmptyState message={t('no_jobs')} />
        ) : (
          <List disablePadding>
            {jobs.map((job) => (
              <JobListItem key={job._id} job={job} showCategory />
            ))}
          </List>
        )}
      </Container>
    </>
  );
}
