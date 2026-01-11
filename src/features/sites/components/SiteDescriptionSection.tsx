import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { localizeField } from '@/shared/utils/localizeField';
import type { TranslatedField, AppLocale } from '@/shared/types/common.types';

interface SiteDescriptionSectionProps {
  description: TranslatedField;
  locale: AppLocale;
  title: string;
}

export function SiteDescriptionSection({ description, locale, title }: SiteDescriptionSectionProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
        {localizeField(description, locale)}
      </Typography>
    </Box>
  );
}
