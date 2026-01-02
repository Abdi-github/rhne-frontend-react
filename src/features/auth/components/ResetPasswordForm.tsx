import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../auth.api';
import { LocaleLink } from '@/shared/components/LocaleLink';

export function ResetPasswordForm() {
  const { t } = useTranslation('auth');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError(t('passwords_mismatch'));
      return;
    }
    try {
      await resetPassword({ token, password }).unwrap();
      setSuccess(true);
    } catch {
      setError(t('reset_error'));
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        {t('reset_title')}
      </Typography>
      {success ? (
        <>
          <Alert severity="success" sx={{ mb: 2 }}>{t('reset_success')}</Alert>
          <Box sx={{ textAlign: 'center' }}>
            <LocaleLink to="/auth/login">
              <Button variant="contained">{t('back_to_login')}</Button>
            </LocaleLink>
          </Box>
        </>
      ) : (
        <>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={t('new_password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth required
              sx={{ mb: 2 }}
            />
            <TextField
              label={t('confirm_password')}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth required
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading}>
              {t('reset_button')}
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
