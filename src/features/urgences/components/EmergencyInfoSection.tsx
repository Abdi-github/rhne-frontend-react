import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

export function EmergencyInfoSection() {
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
        {t('info_title', 'Information')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {t('info_text', "Les urgences sont traitées par ordre de priorité médicale et non par ordre d'arrivée. L'accueil de patient-e-s dont la vie est en danger ou dont les souffrances sont particulièrement aiguës peut amener le personnel soignant à les prendre en charge avant les patient-e-s déjà arrivés.")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {t('info_thanks', 'Nous vous remercions par avance de votre compréhension.')}
      </Typography>
    </Paper>
  );
}
