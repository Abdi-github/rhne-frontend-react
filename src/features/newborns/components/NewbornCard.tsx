import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { Newborn } from '../newborns.types';

interface NewbornCardProps {
  newborn: Newborn;
}

export function NewbornCard({ newborn }: NewbornCardProps) {
  return (
    <Card sx={{ textAlign: 'center' }}>
      {newborn.image_url && (
        <CardMedia
          component="img"
          height="180"
          image={newborn.image_url}
          alt={newborn.name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{newborn.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {newborn.date}
        </Typography>
      </CardContent>
    </Card>
  );
}
