import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/reseauhospitalierne/',
    icon: 'bi-facebook',
  },
  {
    name: 'X',
    url: 'https://twitter.com/rhosp_ne',
    icon: 'bi-twitter-x',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@rhne',
    icon: 'bi-youtube',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/reseau-hopital-ne',
    icon: 'bi-linkedin',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/reseau_hosp_ne',
    icon: 'bi-instagram',
  },
];

interface SocialShareBarProps {
  color?: string;
}

export function SocialShareBar({ color = 'inherit' }: SocialShareBarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {SOCIAL_LINKS.map((link) => (
        <Tooltip key={link.name} title={link.name}>
          <IconButton
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color }}
            aria-label={link.name}
          >
            <i className={`bi ${link.icon}`} style={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
