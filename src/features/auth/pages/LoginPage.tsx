import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  const { t } = useTranslation('auth');

  return (
    <>
      <SEOHead title={t('login_title')} />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
