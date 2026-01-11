import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import { useTranslation } from 'react-i18next';

const ICON_MAP: Record<string, React.ElementType> = {
  central: PhoneIcon,
  urgences: LocalHospitalIcon,
  appointments_contact: CalendarMonthIcon,
  patient_relations: ForumIcon,
  hr: GroupIcon,
  media: NewspaperIcon,
  general: EmailIcon,
  direction: BusinessIcon,
};

interface ContactInfoCardProps {
  titleKey: string;
  phone?: string;
  descriptionKey?: string;
}

export function ContactInfoCard({ titleKey, phone, descriptionKey }: ContactInfoCardProps) {
  const { t } = useTranslation('contact');
  const Icon = ICON_MAP[titleKey] ?? PhoneIcon;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Icon sx={{ fontSize: 28, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t(`cards.${titleKey}`)}
          </Typography>
        </Box>
        {phone && (
          <Link
            href={`tel:${phone.replace(/\s/g, '')}`}
            underline="hover"
            sx={{ fontSize: '1.25rem', fontWeight: 600 }}
          >
            {phone}
          </Link>
        )}
        {descriptionKey && (
          <Typography variant="body2" color="text.secondary">
            {t(`cards.${descriptionKey}`)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
