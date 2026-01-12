import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface BookingConfirmationProps {
  referenceNumber: string;
  appointmentTypeName?: string;
  selectedDate?: string;
  selectedSlot?: string;
  patientName?: string;
  onBookAnother?: () => void;
}

export function BookingConfirmation({
  referenceNumber,
  appointmentTypeName,
  selectedDate,
  selectedSlot,
  patientName,
  onBookAnother,
}: BookingConfirmationProps) {
  const { t } = useTranslation('appointments');

  const handlePrint = () => {
    window.print();
  };

  return (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <Box>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 1 }} />
      </Box>

      <Alert severity="success" sx={{ justifyContent: 'center' }}>
        {t('booking_confirmed')}
      </Alert>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {t('reference_number')}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 2, letterSpacing: 2 }}>
            {referenceNumber}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {appointmentTypeName && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">{t('summary.type')}:</Typography>
              <Typography variant="body2" fontWeight={600}>{appointmentTypeName}</Typography>
            </Box>
          )}
          {selectedDate && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">{t('summary.date')}:</Typography>
              <Typography variant="body2" fontWeight={600}>{dayjs(selectedDate).format('DD.MM.YYYY')}</Typography>
            </Box>
          )}
          {selectedSlot && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">{t('summary.time')}:</Typography>
              <Typography variant="body2" fontWeight={600}>{selectedSlot}</Typography>
            </Box>
          )}
          {patientName && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">{t('summary.patient')}:</Typography>
              <Typography variant="body2" fontWeight={600}>{patientName}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Alert severity="info" icon={false}>
        {t('confirmation_email_sent')}
      </Alert>

      <Alert severity="warning" icon={false}>
        {t('confirmation.keep_reference')}
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          {t('confirmation.print')}
        </Button>
        {onBookAnother && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onBookAnother}
          >
            {t('confirmation.book_another')}
          </Button>
        )}
      </Box>
    </Stack>
  );
}
