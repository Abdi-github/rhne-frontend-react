import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordMutation } from '../auth.api';
import { LocaleLink } from '@/shared/components/LocaleLink';

export function ForgotPasswordForm() {
  const { t } = useTranslation('auth');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await forgotPassword({ email }).unwrap();
      setSent(true);
    } catch {
      setError(t('forgot_error'));
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        {t('forgot_title')}
      </Typography>
      {sent ? (
        <Alert severity="success">{t('forgot_success')}</Alert>
      ) : (
        <>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={t('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth required
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading}>
              {t('forgot_button')}
            </Button>
          </Box>
        </>
      )}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <LocaleLink to="/auth/login">
          <Typography variant="body2" color="primary">{t('back_to_login')}</Typography>
        </LocaleLink>
      </Box>
    </>
  );
}
