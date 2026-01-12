import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';
import type { EmergencyHotline } from '../urgences.types';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';

interface EmergencyHotlineCardProps {
  hotline: EmergencyHotline;
}

export function EmergencyHotlineCard({ hotline }: EmergencyHotlineCardProps) {
  const { t } = useTranslation('urgences');
  const { locale } = useLocalePath();
  const [expanded, setExpanded] = useState(false);

  const name = localizeField(hotline.name, locale);
  const description = hotline.description ? localizeField(hotline.description, locale) : null;
  const whenToCall = hotline.when_to_call ? localizeField(hotline.when_to_call, locale) : null;

  return (
    <Card
      sx={{
        height: '100%',
        textAlign: 'center',
        borderRadius: 2,
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'error.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
            }}
          >
            <i className="bi bi-telephone-fill" style={{ fontSize: '1.5rem', color: 'white' }} />
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
            fontWeight: 700,
            mb: 1,
            textTransform: 'uppercase',
            fontSize: '1rem',
            letterSpacing: 0.5,
          }}
        >
          {name}
        </Typography>

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {description}
          </Typography>
        )}

        {whenToCall && (
          <>
            <Button
              size="small"
              onClick={() => setExpanded(!expanded)}
              endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '0.8rem',
                mb: 1,
              }}
            >
              {t('when_to_call')}
            </Button>
            <Collapse in={expanded}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 1, pb: 1 }}>
                {whenToCall}
              </Typography>
            </Collapse>
          </>
        )}

        {hotline.phone && (
          <Typography
            component="a"
            href={`tel:${hotline.phone}`}
            variant="h5"
            sx={{
              display: 'inline-block',
              mt: 1,
              px: 3,
              py: 1,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 25,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'background-color 0.2s',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            {hotline.phone}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
