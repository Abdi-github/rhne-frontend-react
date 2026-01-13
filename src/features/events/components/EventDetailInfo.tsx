import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { Event } from '../events.types';
import dayjs from 'dayjs';

interface EventDetailInfoProps {
  event: Event;
}

export function EventDetailInfo({ event }: EventDetailInfoProps) {
  const { t } = useTranslation('events');
  const { locale } = useLocalePath();

  const description = event.description ? localizeField(event.description, locale) : null;
  const location = event.location ? localizeField(event.location, locale) : null;
  const time = event.time ? localizeField(event.time, locale) : null;

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
            <Box>
              <Typography variant="overline" color="text.secondary">{t('date')}</Typography>
              <Typography>{dayjs(event.date).format('DD.MM.YYYY')}</Typography>
            </Box>
            {time && (
              <Box>
                <Typography variant="overline" color="text.secondary">{t('time')}</Typography>
                <Typography>{time}</Typography>
              </Box>
            )}
            {location && (
              <Box>
                <Typography variant="overline" color="text.secondary">{t('location')}</Typography>
                <Typography>{location}</Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
      {description && (
        <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
      )}
    </>
  );
}
