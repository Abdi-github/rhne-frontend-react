import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '@/shared/hooks/useLocalePath';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  const { localeNavigate } = useLocalePath();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleNavigate = (href: string) => {
    onClose();
    localeNavigate(href);
  };

  const toggleSection = (key: string) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  const sections = [
    {
      key: 'patient',
      label: t('nav.espace_patient'),
      items: [
        { label: 'Mon admission', href: '/espace-patient/admission/mon-admission' },
        { label: 'Horaires visites', href: '/espace-patient/visites/horaires' },
      ],
    },
    {
      key: 'prestations',
      label: t('nav.prestations'),
      href: '/prestations',
    },
    {
      key: 'emploi',
      label: t('nav.espace_emploi'),
      items: [{ label: 'Postes ouverts', href: '/espace-emploi' }],
    },
    {
      key: 'rhne',
      label: t('nav.rhne'),
      items: [
        { label: 'Sites', href: '/acces' },
        { label: 'Agenda', href: '/agenda' },
        { label: 'Bébés en ligne', href: '/bebes-en-ligne' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 300 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Menu</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 1 }}>
        {/* Urgences */}
        <ListItemButton
          onClick={() => handleNavigate('/urgences')}
          sx={{ bgcolor: '#EB313F', color: 'white', borderRadius: 1, mb: 1, '&:hover': { bgcolor: '#d02935' } }}
        >
          <ListItemText primary={t('nav.urgences')} primaryTypographyProps={{ fontWeight: 700 }} />
        </ListItemButton>

        {/* RDV */}
        <ListItemButton
          onClick={() => handleNavigate('/prise-de-rendez-vous')}
          sx={{ bgcolor: 'primary.light', color: 'primary.dark', borderRadius: 1, mb: 1 }}
        >
          <ListItemText primary={t('nav.appointment')} primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItemButton>

        {sections.map((section) => {
          if ('href' in section && section.href) {
            return (
              <ListItemButton key={section.key} onClick={() => handleNavigate(section.href!)}>
                <ListItemText primary={section.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            );
          }

          return (
            <Box key={section.key}>
              <ListItemButton onClick={() => toggleSection(section.key)}>
                <ListItemText primary={section.label} primaryTypographyProps={{ fontWeight: 600 }} />
                {expanded === section.key ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expanded === section.key}>
                <List disablePadding>
                  {'items' in section &&
                    section.items?.map((item) => (
                      <ListItemButton
                        key={item.href}
                        sx={{ pl: 4 }}
                        onClick={() => handleNavigate(item.href)}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
}
