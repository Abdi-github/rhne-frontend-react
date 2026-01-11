import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import { useTranslation } from 'react-i18next';
import type { Site } from '../sites.types';

interface SiteContactCardProps {
  site: Site;
}

export function SiteContactCard({ site }: SiteContactCardProps) {
  const { t } = useTranslation('sites');

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon fontSize="small" color="primary" />
          {site.address}, {site.postal_code} {site.city}
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon fontSize="small" color="primary" />
          <Link href={`tel:${site.phone.replace(/\s/g, '')}`} underline="hover" color="inherit">
            {site.phone}
          </Link>
        </Typography>
        {site.maps_url && (
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MapIcon fontSize="small" color="primary" />
            <Link href={site.maps_url} target="_blank" rel="noopener noreferrer" underline="hover">
              {t('detail.maps')}
            </Link>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
