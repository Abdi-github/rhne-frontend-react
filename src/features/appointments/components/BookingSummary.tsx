import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface BookingSummaryProps {
  appointmentTypeName: string;
  selectedDate: string;
  selectedSlot: string;
  form: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    reason: string;
  };
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export function BookingSummary({
  appointmentTypeName,
  selectedDate,
  selectedSlot,
  form,
  onBack,
  onConfirm,
  isSubmitting,
}: BookingSummaryProps) {
  const { t } = useTranslation('appointments');

  return (
    <Stack spacing={3}>
      <Alert severity="info">{t('summary.review_message')}</Alert>

      {/* Appointment Details */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('summary.appointment_details')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                {t('summary.type')}:
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {appointmentTypeName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('summary.date')}:
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {dayjs(selectedDate).format('DD.MM.YYYY')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('summary.time')}:
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {selectedSlot}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Patient Information */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('summary.patient_details')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('form.first_name')} / {t('form.last_name')}:
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {form.first_name} {form.last_name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('form.email')}:
              </Typography>
              <Typography variant="body1">{form.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('form.phone')}:
              </Typography>
              <Typography variant="body1">{form.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                {t('form.date_of_birth')}:
              </Typography>
              <Typography variant="body1">
                {dayjs(form.date_of_birth).format('DD.MM.YYYY')}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Reason */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('form.reason')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1">{form.reason}</Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={onBack} disabled={isSubmitting}>
          {t('common:back')}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onConfirm}
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
        >
          {isSubmitting ? t('summary.submitting') : t('book_now')}
        </Button>
      </Box>
    </Stack>
  );
}
