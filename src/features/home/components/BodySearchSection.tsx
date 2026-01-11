import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '@/shared/components/LocaleLink';

export function BodySearchSection() {
  const { t } = useTranslation('home');

  return (
    <Box sx={{ py: 0 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          minHeight: { xs: 'auto', md: 280 },
        }}
      >
        {/* Par partie du corps */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            py: { xs: 5, md: 6 },
            px: 3,
            bgcolor: 'primary.main',
            backgroundImage: 'url(/images/body-search.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0, 154, 150, 0.85)',
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              position: 'relative',
              color: 'white',
              fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '1.3rem', md: '1.6rem' },
            }}
          >
            {t('body_search_title')}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              position: 'relative',
              color: 'white',
              borderColor: 'white',
              borderRadius: 25,
              px: 4,
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: 1,
              '&:hover': {
                bgcolor: 'white',
                color: 'primary.main',
                borderColor: 'white',
              },
            }}
          >
            {t('body_search_cta', 'COMMENCER')}
          </Button>
        </Box>

        {/* Une consultation */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            py: { xs: 5, md: 6 },
            px: 3,
            bgcolor: 'primary.light',
            backgroundImage: 'url(/images/consultation.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0, 154, 150, 0.7)',
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              position: 'relative',
              color: 'white',
              fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '1.3rem', md: '1.6rem' },
            }}
          >
            {t('consultation_cta')}
          </Typography>
          <Button
            component={LocaleLink}
            to="/prise-de-rendez-vous"
            variant="outlined"
            size="large"
            sx={{
              position: 'relative',
              color: 'white',
              borderColor: 'white',
              borderRadius: 25,
              px: 4,
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: 1,
              textDecoration: 'none',
              '&:hover': {
                bgcolor: 'white',
                color: 'primary.main',
                borderColor: 'white',
              },
            }}
          >
            {t('consultation_button', 'PRENDRE RDV')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
