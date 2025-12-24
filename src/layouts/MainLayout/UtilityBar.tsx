import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '@/shared/components/LocaleLink';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

export function UtilityBar() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1,
        }}
      >
        {/* Logo / Brand */}
        <LocaleLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
              fontWeight: 700,
              fontSize: '1.4rem',
              letterSpacing: 1,
            }}
          >
            RHNe
          </Typography>
        </LocaleLink>

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            component={LocaleLink}
            to="/urgences"
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#EB313F',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              borderRadius: '4px',
              px: 2,
              '&:hover': { bgcolor: '#d02935' },
            }}
          >
            {t('nav.urgences')}
          </Button>
          <Button
            component={LocaleLink}
            to="/prise-de-rendez-vous"
            variant="contained"
            size="small"
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.dark',
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'none',
              borderRadius: '4px',
              px: 2,
              '&:hover': { bgcolor: '#80d0ce' },
            }}
          >
            {t('nav.appointment')}
          </Button>
          <LanguageSwitcher color="white" />
        </Box>
      </Container>
    </Box>
  );
}
