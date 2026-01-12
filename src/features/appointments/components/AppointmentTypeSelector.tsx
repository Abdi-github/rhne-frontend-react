import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import type { AppointmentType } from '../appointments.types';

interface AppointmentTypeSelectorProps {
  types: AppointmentType[];
  isLoading: boolean;
  selectedType: string;
  onSelect: (typeId: string, appointmentType: string) => void;
  onNext: () => void;
}

export function AppointmentTypeSelector({
  types,
  isLoading,
  selectedType,
  onSelect,
  onNext,
}: AppointmentTypeSelectorProps) {
  const { t } = useTranslation('appointments');
  const { locale } = useLocalePath();

  if (isLoading) return <LoadingSpinner />;

  if (types.length === 0) return <EmptyState message={t('no_types')} />;

  return (
    <Grid container spacing={2}>
      {types.map((type) => (
        <Grid size={{ xs: 12, sm: 6 }} key={type._id}>
          <Card
            variant={selectedType === type._id ? 'outlined' : 'elevation'}
            sx={
              selectedType === type._id
                ? { borderColor: 'primary.main', borderWidth: 2 }
                : {}
            }
          >
            <CardActionArea onClick={() => onSelect(type._id, type.appointment_type)}>
              <CardContent>
                <Typography variant="h6">
                  {localizeField(type.title, locale)}
                </Typography>
                {type.description && (
                  <Typography variant="body2" color="text.secondary">
                    {localizeField(type.description, locale)}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Grid size={12}>
        <Button variant="contained" disabled={!selectedType} onClick={onNext}>
          {t('common:next')}
        </Button>
      </Grid>
    </Grid>
  );
}
