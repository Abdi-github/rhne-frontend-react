import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface HeroBannerProps {
  title: string;
}

export function HeroBanner({ title }: HeroBannerProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 350, md: 500 },
        backgroundImage: 'url(/images/hero-home.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            color: 'white',
            fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
            fontWeight: 600,
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
            textTransform: 'uppercase',
            letterSpacing: 2,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
}
