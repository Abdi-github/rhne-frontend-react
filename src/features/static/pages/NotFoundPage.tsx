import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/shared/components/SEOHead';
import { LocaleLink } from '@/shared/components/LocaleLink';

export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEOHead title="404" />
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {t('not_found_title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('not_found_description')}
        </Typography>
        <Button component={LocaleLink} to="/" variant="contained" size="large">
          {t('back_home')}
        </Button>
      </Container>
    </>
  );
}
