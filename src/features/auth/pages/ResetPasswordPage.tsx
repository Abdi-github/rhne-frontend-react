import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/shared/components/SEOHead';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export default function ResetPasswordPage() {
  const { t } = useTranslation('auth');

  return (
    <>
      <SEOHead title={t('reset_title')} />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
