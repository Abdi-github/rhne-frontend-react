import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
import type { SearchResult } from '../search.types';

const RESOURCE_ROUTE_MAP: Record<string, string> = {
  service: '/prestations',
  site: '/acces',
  doctor: '/medecins',
  event: '/agenda',
  job: '/espace-emploi',
  'patient-info': '/espace-patient',
};

interface SearchResultItemProps {
  result: SearchResult;
  onNavigate: (path: string) => void;
}

export function SearchResultItem({ result, onNavigate }: SearchResultItemProps) {
  const { t } = useTranslation('search');
  const basePath = RESOURCE_ROUTE_MAP[result.type] ?? '';

  return (
    <ListItemButton
      divider
      onClick={() => onNavigate(`${basePath}/${result.slug}`)}
    >
      <ListItemText
        primary={result.title}
        secondary={result.subtitle}
      />
      <ListItemIcon sx={{ minWidth: 'auto' }}>
        <Chip label={t(`resources.${result.type}`)} size="small" variant="outlined" />
      </ListItemIcon>
    </ListItemButton>
  );
}
