import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../auth.api';
import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '@/shared/state/authSlice';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { LocaleLink } from '@/shared/components/LocaleLink';

export function LoginForm() {
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();
  const { localeNavigate } = useLocalePath();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({
        user: result.data.user,
        access_token: result.data.tokens.access_token,
        refresh_token: result.data.tokens.refresh_token,
      }));
      localeNavigate('/');
    } catch {
      setError(t('login_error'));
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        {t('login_title')}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label={t('email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth required
          sx={{ mb: 2 }}
        />
        <TextField
          label={t('password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth required
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading}>
          {t('login_button')}
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <LocaleLink to="/auth/forgot-password">
          <Typography variant="body2" color="primary">{t('forgot_password')}</Typography>
        </LocaleLink>
      </Box>
    </>
  );
}
