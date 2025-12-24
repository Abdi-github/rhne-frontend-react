import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '@/shared/components/LocaleLink';
import { SocialShareBar } from '@/shared/components/SocialShareBar';

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#272833',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Social icons */}
          <SocialShareBar color="rgba(255,255,255,0.7)" />

          {/* Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <MuiLink
              href="https://rhneinfo.ch/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                '&:hover': { color: 'white' },
              }}
            >
              {t('footer.blog')}
            </MuiLink>
            <MuiLink
              component={LocaleLink}
              to="/"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                '&:hover': { color: 'white' },
              }}
            >
              {t('footer.sitemap')}
            </MuiLink>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 2 }} />

        <Typography
          variant="body2"
          sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}
        >
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </Typography>
      </Container>
    </Box>
  );
}
