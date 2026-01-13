import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '@/shared/components/LocaleLink';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { Event } from '../events.types';
import dayjs from 'dayjs';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation('events');
  const { locale } = useLocalePath();

  const title = localizeField(event.title, locale);
  const location = event.location ? localizeField(event.location, locale) : null;
  const category = event.category ? localizeField(event.category, locale) : null;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {category && (
          <Typography variant="overline" color="primary">{category}</Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            📅 {dayjs(event.date).format('DD.MM.YYYY')}
          </Typography>
          {location && (
            <Typography variant="body2" color="text.secondary">
              📍 {location}
            </Typography>
          )}
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          component={LocaleLink}
          to={`/agenda/${event.slug}`}
          variant="outlined"
          size="small"
        >
          {t('view_details')}
        </Button>
      </Box>
    </Card>
  );
}
