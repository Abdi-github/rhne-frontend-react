import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { PatientInfo } from '../patient-info.types';

interface PatientInfoListItemProps {
  page: PatientInfo;
  onClick: (slug: string) => void;
}

export function PatientInfoListItem({ page, onClick }: PatientInfoListItemProps) {
  const { locale } = useLocalePath();
  const title = localizeField(page.title, locale);

  return (
    <ListItemButton divider onClick={() => onClick(page.slug)}>
      <ListItemText primary={title} />
      <ListItemIcon sx={{ minWidth: 'auto' }}>
        <ChevronRightIcon />
      </ListItemIcon>
    </ListItemButton>
  );
}
