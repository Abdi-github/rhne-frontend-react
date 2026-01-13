import Grid from '@mui/material/Grid2';
import { EmptyState } from '@/shared/components/EmptyState';
import { useTranslation } from 'react-i18next';
import { NewbornCard } from './NewbornCard';
import type { Newborn } from '../newborns.types';

interface NewbornGridProps {
  newborns: Newborn[];
}

export function NewbornGrid({ newborns }: NewbornGridProps) {
  const { t } = useTranslation('newborns');

  if (newborns.length === 0) {
    return <EmptyState message={t('no_newborns')} />;
  }

  return (
    <Grid container spacing={3}>
      {newborns.map((baby) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={baby._id}>
          <NewbornCard newborn={baby} />
        </Grid>
      ))}
    </Grid>
  );
}
