import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { localizeField } from '@/shared/utils/localizeField';
import type { Site } from '../sites.types';
import type { AppLocale } from '@/shared/types/common.types';

interface SiteCardProps {
  site: Site;
  locale: AppLocale;
  onClick: () => void;
}

export function SiteCard({ site, locale, onClick }: SiteCardProps) {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
      }}
      onClick={onClick}
    >
      {site.image_url && (
        <CardMedia component="img" height="180" image={site.image_url} alt={site.name} />
      )}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {site.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {localizeField(site.type, locale)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {site.city}
        </Typography>
      </CardContent>
    </Card>
  );
}
