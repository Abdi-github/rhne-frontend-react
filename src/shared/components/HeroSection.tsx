import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from '@/shared/types/common.types';

interface HeroSectionProps {
  title: string;
  imageUrl?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function HeroSection({ title, imageUrl, breadcrumbs }: HeroSectionProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 200, md: 300 },
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.3)' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', pb: 3 }}>
        {breadcrumbs && <Breadcrumb items={breadcrumbs} light />}
        <Typography
          variant="h1"
          sx={{
            color: 'white',
            fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
            fontWeight: 600,
            fontSize: { xs: '1.8rem', md: '3rem' },
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
}
