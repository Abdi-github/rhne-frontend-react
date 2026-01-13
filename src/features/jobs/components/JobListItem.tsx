import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { Job } from '../jobs.types';

interface JobListItemProps {
  job: Job;
  showCategory?: boolean;
}

export function JobListItem({ job, showCategory = false }: JobListItemProps) {
  const { locale } = useLocalePath();
  const title = localizeField(job.title, locale);

  return (
    <ListItemButton
      component="a"
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      divider
    >
      <ListItemText
        primary={title}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
            {showCategory && (
              <Chip label={job.category} size="small" variant="outlined" />
            )}
            <Chip label={job.percentage} size="small" color="primary" variant="outlined" />
          </Box>
        }
      />
    </ListItemButton>
  );
}
