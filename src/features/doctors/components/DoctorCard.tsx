import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { Doctor } from '../doctors.types';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {doctor.image_url && (
        <CardMedia
          component="img"
          height="200"
          image={doctor.image_url}
          alt={doctor.name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
          }}
        >
          {doctor.name}
        </Typography>
        {doctor.title && (
          <Typography variant="body2" color="text.secondary">
            {doctor.title}
          </Typography>
        )}
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
          {doctor.service_name}
        </Typography>
      </CardContent>
    </Card>
  );
}
