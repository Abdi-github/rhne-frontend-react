import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import { useGetJobsQuery } from '../jobs.api';
import { JobListItem } from '../components/JobListItem';

export default function JobCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation('jobs');
  const { data, isLoading } = useGetJobsQuery({ limit: 100, category });

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title'), href: '/espace-emploi' },
    { label: category ?? '' },
  ];

  if (isLoading) return <LoadingSpinner />;

  const jobs = data?.data ?? [];

  return (
    <>
      <SEOHead title={`${t('hero_title')} - ${category}`} />
      <HeroSection title={category ?? ''} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {jobs.length === 0 ? (
          <EmptyState message={t('no_jobs')} />
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('count', { count: jobs.length })}
            </Typography>
            <List disablePadding>
              {jobs.map((job) => (
                <JobListItem key={job._id} job={job} />
              ))}
            </List>
          </>
        )}
      </Container>
    </>
  );
}
