import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { useLazyGetBookingByReferenceQuery, useCancelBookingMutation } from '../appointments.api';
import { useNotification } from '@/shared/hooks/useNotification';
import dayjs from 'dayjs';

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'error' | 'default' | 'info'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'error',
  completed: 'info',
  no_show: 'default',
};

export function BookingLookup() {
  const { t } = useTranslation('appointments');
  const notification = useNotification();
  const [reference, setReference] = useState('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const [fetchBooking, { data: bookingData, isLoading, error, isFetching }] =
    useLazyGetBookingByReferenceQuery();
  const [cancelBooking, { isLoading: cancelling }] = useCancelBookingMutation();

  const booking = bookingData?.data;

  const handleSearch = () => {
    if (reference.trim()) {
      fetchBooking(reference.trim().toUpperCase());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleCancel = async () => {
    if (!booking) return;
    try {
      await cancelBooking({ reference: booking.booking_reference, reason: cancelReason }).unwrap();
      notification.success(t('booking.cancelled'));
      setCancelDialogOpen(false);
      setCancelReason('');
      // Re-fetch to update status
      fetchBooking(booking.booking_reference);
    } catch {
      notification.error(t('booking_error'));
    }
  };

  const canCancel = booking && !['cancelled', 'completed'].includes(booking.status);

  return (
    <Stack spacing={3}>
      <Typography variant="h6">{t('booking.lookup_title')}</Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          placeholder={t('booking.lookup_placeholder')}
          value={reference}
          onChange={(e) => setReference(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          fullWidth
          size="small"
          slotProps={{
            htmlInput: { style: { textTransform: 'uppercase' } },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={!reference.trim() || isLoading || isFetching}
          startIcon={isLoading || isFetching ? <CircularProgress size={18} /> : <SearchIcon />}
        >
          {t('common:search')}
        </Button>
      </Box>

      {error && (
        <Alert severity="warning">{t('booking.not_found')}</Alert>
      )}

      {booking && (
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {t('booking.reference')}: {booking.booking_reference}
              </Typography>
              <Chip
                label={t(`booking.status_${booking.status}`)}
                color={STATUS_COLORS[booking.status] ?? 'default'}
                size="small"
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                  {t('summary.type')}:
                </Typography>
                <Typography variant="body1">
                  {booking.appointment_type}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                  {t('summary.date')}:
                </Typography>
                <Typography variant="body1">
                  {dayjs(booking.preferred_date).format('DD.MM.YYYY')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                  {t('summary.time')}:
                </Typography>
                <Typography variant="body1">
                  {booking.preferred_time_slot}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                  {t('form.first_name')} / {t('form.last_name')}:
                </Typography>
                <Typography variant="body1">
                  {booking.patient_info.first_name} {booking.patient_info.last_name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                  {t('form.reason')}:
                </Typography>
                <Typography variant="body1">{booking.reason}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                  {t('summary.booked_on')}:
                </Typography>
                <Typography variant="body1">
                  {dayjs(booking.createdAt).format('DD.MM.YYYY HH:mm')}
                </Typography>
              </Box>
            </Stack>

            {canCancel && (
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => setCancelDialogOpen(true)}
                >
                  {t('form.cancel')}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Cancel confirmation dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('booking.cancel_title')}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {t('booking.cancel_confirm')}
          </DialogContentText>
          <TextField
            label={t('booking.cancel_reason')}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)} disabled={cancelling}>
            {t('common:back')}
          </Button>
          <Button
            onClick={handleCancel}
            color="error"
            variant="contained"
            disabled={cancelling}
            startIcon={cancelling ? <CircularProgress size={18} /> : undefined}
          >
            {t('booking.confirm_cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
