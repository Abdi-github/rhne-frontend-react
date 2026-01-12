import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import type { AppointmentSlot } from '../appointments.types';
import dayjs from 'dayjs';

interface SlotPickerProps {
  slots: AppointmentSlot[];
  isLoading: boolean;
  selectedSlot: string;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onSelect: (slotLabel: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function SlotPicker({
  slots,
  isLoading,
  selectedSlot,
  selectedDate,
  onDateChange,
  onSelect,
  onBack,
  onNext,
}: SlotPickerProps) {
  const { t } = useTranslation('appointments');

  const minDate = dayjs().format('YYYY-MM-DD');
  const maxDate = dayjs().add(30, 'day').format('YYYY-MM-DD');

  // Block weekends
  const isWeekend = selectedDate
    ? [0, 6].includes(dayjs(selectedDate).day())
    : false;

  const handleDateChange = (date: string) => {
    onDateChange(date);
  };

  const availableCount = slots.filter((s) => s.available).length;

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <TextField
          label={t('select_date')}
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { min: minDate, max: maxDate },
          }}
        />
      </Box>

      {!selectedDate && (
        <EmptyState message={t('select_date_first')} />
      )}

      {selectedDate && isWeekend && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {t('weekend_closed')}
        </Alert>
      )}

      {selectedDate && !isWeekend && isLoading && <LoadingSpinner />}

      {selectedDate && !isWeekend && !isLoading && slots.length === 0 && (
        <EmptyState message={t('no_slots')} />
      )}

      {selectedDate && !isWeekend && !isLoading && slots.length > 0 && (
        <>
          <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              size="small"
              color="success"
              label={`${availableCount} ${t('slots.available').toLowerCase()}`}
            />
            {slots.length - availableCount > 0 && (
              <Chip
                size="small"
                color="default"
                label={`${slots.length - availableCount} ${t('slots.unavailable').toLowerCase()}`}
              />
            )}
          </Box>

          <Grid container spacing={1}>
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.label;
              const isDisabled = !slot.available;

              return (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={slot.label}>
                  <Card
                    variant={isSelected ? 'outlined' : 'elevation'}
                    sx={{
                      ...(isSelected && {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                      }),
                      ...(isDisabled && {
                        opacity: 0.5,
                        bgcolor: 'action.disabledBackground',
                      }),
                    }}
                  >
                    <CardActionArea
                      disabled={isDisabled}
                      onClick={() => onSelect(slot.label)}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            ...(isDisabled && {
                              textDecoration: 'line-through',
                              color: 'text.disabled',
                            }),
                          }}
                        >
                          {slot.start} – {slot.end}
                        </Typography>
                        {isDisabled && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ display: 'block', mt: 0.25 }}
                          >
                            {t('slots.unavailable')}
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button onClick={onBack}>{t('common:back')}</Button>
        <Button variant="contained" disabled={!selectedSlot || isWeekend} onClick={onNext}>
          {t('common:next')}
        </Button>
      </Box>
    </>
  );
}
