import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { localizeField } from '@/shared/utils/localizeField';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { PatientInfoSection } from '../patient-info.types';

interface PatientInfoSectionAccordionProps {
  section: PatientInfoSection;
}

export function PatientInfoSectionAccordion({ section }: PatientInfoSectionAccordionProps) {
  const { locale } = useLocalePath();
  const title = localizeField(section.title, locale);
  const content = localizeField(section.content, locale);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {content && (
          <Typography sx={{ whiteSpace: 'pre-line', mb: 2 }}>{content}</Typography>
        )}
        {section.list_items.length > 0 && (
          <List dense disablePadding>
            {section.list_items.map((item, i) => (
              <ListItem key={i}>
                <ListItemText primary={localizeField(item, locale)} />
              </ListItem>
            ))}
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
