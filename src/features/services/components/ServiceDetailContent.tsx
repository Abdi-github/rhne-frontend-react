import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { Service } from '../services.types';

interface ServiceDetailContentProps {
  service: Service;
  activeTab: string;
}

export function ServiceDetailContent({ service, activeTab }: ServiceDetailContentProps) {
  const { t } = useTranslation('services');
  const { locale } = useLocalePath();

  if (activeTab === 'presentation') {
    return service.description ? (
      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
        {localizeField(service.description, locale)}
      </Typography>
    ) : null;
  }

  if (activeTab === 'prestations') {
    return service.prestations && service.prestations.length > 0 ? (
      <Box>
        {service.prestations.map((p, i) => (
          <Typography key={i} variant="body1" sx={{ py: 0.5 }}>
            • {localizeField(p, locale)}
          </Typography>
        ))}
      </Box>
    ) : null;
  }

  if (activeTab === 'contacts') {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('detail.no_contacts')}
      </Typography>
    );
  }

  if (activeTab === 'links') {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('detail.no_links')}
      </Typography>
    );
  }

  if (activeTab === 'doctors') {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('detail.no_doctors')}
      </Typography>
    );
  }

  return null;
}
