import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { LocaleLink } from '@/shared/components/LocaleLink';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export function MainNav() {
  const { t } = useTranslation();
  const { localeNavigate } = useLocalePath();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  const navItems: NavItem[] = [
    {
      label: t('nav.espace_patient'),
      children: [
        { label: 'Mon admission', href: '/espace-patient/admission/mon-admission' },
        { label: 'Mon séjour en maternité', href: '/espace-patient/maternite/sejour' },
        { label: 'Ma sortie d\'hôpital', href: '/espace-patient/sortie/sortie-hopital' },
        { label: 'Facturation', href: '/espace-patient/facturation/facturation' },
        { label: 'Horaires visites', href: '/espace-patient/visites/horaires' },
      ],
    },
    {
      label: t('nav.espace_pro'),
      children: [
        { label: 'Annuaire des prestations médicales', href: '/prestations' },
      ],
    },
    {
      label: t('nav.prestations'),
      href: '/prestations',
    },
    {
      label: t('nav.espace_emploi'),
      children: [
        { label: 'Postes ouverts au RHNe', href: '/espace-emploi' },
        { label: 'Offres spontanées', href: '/espace-emploi' },
      ],
    },
    {
      label: t('nav.rhne'),
      children: [
        { label: 'Sites du RHNe', href: '/acces' },
        { label: 'Événements', href: '/agenda' },
        { label: 'Bébés en ligne', href: '/bebes-en-ligne' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  const handleOpen = (key: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((prev) => ({ ...prev, [key]: event.currentTarget }));
  };

  const handleClose = (key: string) => {
    setAnchorEl((prev) => ({ ...prev, [key]: null }));
  };

  const handleNavigate = (key: string, href: string) => {
    handleClose(key);
    localeNavigate(href);
  };

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item) => {
            if (item.href && !item.children) {
              return (
                <Button
                  key={item.label}
                  component={LocaleLink}
                  to={item.href}
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    px: 2,
                    py: 1.5,
                    borderRadius: 0,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  {item.label}
                </Button>
              );
            }

            return (
              <Box key={item.label}>
                <Button
                  onClick={(e) => handleOpen(item.label, e)}
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    px: 2,
                    py: 1.5,
                    borderRadius: 0,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                  endIcon={<i className="bi bi-chevron-down" style={{ fontSize: '0.6rem' }} />}
                >
                  {item.label}
                </Button>
                <Menu
                  anchorEl={anchorEl[item.label]}
                  open={!!anchorEl[item.label]}
                  onClose={() => handleClose(item.label)}
                  MenuListProps={{ sx: { py: 0.5 } }}
                >
                  {item.children?.map((child) => (
                    <MenuItem
                      key={child.href}
                      onClick={() => handleNavigate(item.label, child.href)}
                      sx={{ fontSize: '0.9rem', py: 1 }}
                    >
                      {child.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            );
          })}
        </Box>

        <IconButton
          onClick={() => localeNavigate('/recherche')}
          sx={{ color: 'white' }}
          aria-label={t('common:search')}
        >
          <SearchIcon />
        </IconButton>
      </Container>
    </Box>
  );
}
