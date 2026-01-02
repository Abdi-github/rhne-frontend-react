import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/shared/components/SEOHead';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const { t } = useTranslation('auth');

  return (
    <>
      <SEOHead title={t('forgot_title')} />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
