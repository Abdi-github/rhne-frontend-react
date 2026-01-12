import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';

type OccupancyLevel = 'low' | 'medium' | 'high';

interface OccupancyStatusProps {
  sites?: Array<{
    name: string;
    level: OccupancyLevel;
  }>;
}

const LEVEL_COLORS: Record<OccupancyLevel, 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
};

export function OccupancyStatus({ sites }: OccupancyStatusProps) {
  const { t } = useTranslation('urgences');

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 2,
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
          fontWeight: 700,
          mb: 2,
          textTransform: 'uppercase',
          color: 'primary.main',
          fontSize: { xs: '1.2rem', md: '1.4rem' },
          letterSpacing: 0.5,
        }}
      >
        {t('occupancy_title')}
      </Typography>

      {sites && sites.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {sites.map((site) => (
            <Box
              key={site.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                px: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {site.name}
              </Typography>
              <Chip
                label={t(`occupancy_${site.level}`)}
                color={LEVEL_COLORS[site.level]}
                size="small"
                sx={{ fontWeight: 600, minWidth: 80 }}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          {t('occupancy_unavailable', 'Information en temps réel de l\'affluence.')}
        </Typography>
      )}
    </Paper>
  );
}
