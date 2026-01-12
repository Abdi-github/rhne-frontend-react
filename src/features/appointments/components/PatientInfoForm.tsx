import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface PatientFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  reason: string;
}

interface PatientInfoFormProps {
  form: PatientFormData;
  onChange: (field: keyof PatientFormData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  appointmentType?: string;
}

type FormErrors = Partial<Record<keyof PatientFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+().-]{7,20}$/;

export function PatientInfoForm({
  form,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  appointmentType,
}: PatientInfoFormProps) {
  const { t } = useTranslation('appointments');
  const [errors, setErrors] = useState<FormErrors>({});
  const [ageError, setAgeError] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.first_name.trim()) newErrors.first_name = t('validation.required');
    if (!form.last_name.trim()) newErrors.last_name = t('validation.required');

    if (!form.email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = t('validation.invalid_email');
    }

    if (!form.phone.trim()) {
      newErrors.phone = t('validation.required');
    } else if (!PHONE_REGEX.test(form.phone)) {
      newErrors.phone = t('validation.invalid_phone');
    }

    if (!form.date_of_birth) {
      newErrors.date_of_birth = t('validation.required');
    } else {
      const dob = dayjs(form.date_of_birth);
      if (dob.isAfter(dayjs())) {
        newErrors.date_of_birth = t('validation.future_date');
      }
    }

    if (!form.reason.trim()) {
      newErrors.reason = t('validation.required');
    } else if (form.reason.trim().length < 10) {
      newErrors.reason = t('validation.reason_too_short');
    }

    // Age restriction for child appointments
    if (appointmentType === 'child' && form.date_of_birth) {
      const age = dayjs().diff(dayjs(form.date_of_birth), 'year');
      if (age >= 16) {
        setAgeError(t('validation.child_age_restriction'));
        setErrors(newErrors);
        return false;
      }
    }

    // Age restriction for adult appointments
    if (appointmentType === 'adult' && form.date_of_birth) {
      const age = dayjs().diff(dayjs(form.date_of_birth), 'year');
      if (age < 16) {
        setAgeError(t('validation.adult_age_restriction'));
        setErrors(newErrors);
        return false;
      }
    }

    setAgeError('');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  const handleFieldChange = (field: keyof PatientFormData, value: string) => {
    onChange(field, value);
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (ageError && field === 'date_of_birth') {
      setAgeError('');
    }
  };

  const maxDob = dayjs().format('YYYY-MM-DD');

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {ageError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {ageError}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('form.first_name')}
            value={form.first_name}
            onChange={(e) => handleFieldChange('first_name', e.target.value)}
            fullWidth
            required
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('form.last_name')}
            value={form.last_name}
            onChange={(e) => handleFieldChange('last_name', e.target.value)}
            fullWidth
            required
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('form.email')}
            type="email"
            value={form.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            placeholder="nom@exemple.ch"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('form.phone')}
            value={form.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="+41 XX XXX XX XX"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('form.date_of_birth')}
            type="date"
            value={form.date_of_birth}
            onChange={(e) => handleFieldChange('date_of_birth', e.target.value)}
            fullWidth
            required
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { max: maxDob },
            }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label={t('form.reason')}
            value={form.reason}
            onChange={(e) => handleFieldChange('reason', e.target.value)}
            fullWidth
            required
            multiline
            rows={3}
            error={!!errors.reason}
            helperText={errors.reason || t('validation.reason_hint')}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button onClick={onBack}>{t('common:back')}</Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {t('common:next')}
        </Button>
      </Box>
    </Box>
  );
}
