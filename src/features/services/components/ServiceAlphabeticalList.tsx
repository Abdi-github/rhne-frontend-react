import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { localizeField } from '@/shared/utils/localizeField';
import type { Service } from '../services.types';
import type { AppLocale } from '@/shared/types/common.types';

interface ServiceAlphabeticalListProps {
  services: Service[];
  locale: AppLocale;
  onServiceClick: (slug: string) => void;
}

export function ServiceAlphabeticalList({
  services,
  locale,
  onServiceClick,
}: ServiceAlphabeticalListProps) {
  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    const letter = localizeField(s.name, locale).charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(s);
    return acc;
  }, {});

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
        gap: { xs: 2, md: 3 },
      }}
    >
      {sortedLetters.map((letter) => (
        <Box key={letter}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
              fontWeight: 700,
              color: 'primary.main',
              mb: 1,
              borderBottom: 2,
              borderColor: 'primary.main',
              pb: 0.5,
              display: 'inline-block',
            }}
          >
            {letter}
          </Typography>
          <List disablePadding>
            {grouped[letter].map((service) => (
              <ListItemButton
                key={service._id}
                onClick={() => onServiceClick(service.slug)}
                sx={{ py: 0.5, px: 0 }}
              >
                <ListItemText
                  primary={localizeField(service.name, locale)}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    color: 'primary.main',
                    sx: {
                      '&:hover': { textDecoration: 'underline' },
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
