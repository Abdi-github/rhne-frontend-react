import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LocaleLink } from '@/shared/components/LocaleLink';

interface QuickAccessItem {
  icon: string;
  label: string;
  href: string;
}

interface QuickAccessBarProps {
  items: QuickAccessItem[];
}

export function QuickAccessBar({ items }: QuickAccessBarProps) {
  return (
    <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {items.map((item) => (
            <Box
              key={item.label}
              component={LocaleLink}
              to={item.href}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                color: 'primary.main',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 64, md: 80 },
                  height: { xs: 64, md: 80 },
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    '& i': { color: 'white !important' },
                  },
                }}
              >
                <i
                  className={`bi ${item.icon}`}
                  style={{ fontSize: '1.8rem', color: '#009A96', transition: 'color 0.2s' }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  textAlign: 'center',
                  color: 'primary.main',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
