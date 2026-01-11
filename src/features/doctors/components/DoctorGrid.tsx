import Grid from '@mui/material/Grid2';
import { EmptyState } from '@/shared/components/EmptyState';
import { useTranslation } from 'react-i18next';
import { DoctorCard } from './DoctorCard';
import type { Doctor } from '../doctors.types';

interface DoctorGridProps {
  doctors: Doctor[];
}

export function DoctorGrid({ doctors }: DoctorGridProps) {
  const { t } = useTranslation('doctors');

  if (doctors.length === 0) {
    return <EmptyState message={t('no_doctors')} />;
  }

  return (
    <Grid container spacing={3}>
      {doctors.map((doc) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={doc._id}>
          <DoctorCard doctor={doc} />
        </Grid>
      ))}
    </Grid>
  );
}
