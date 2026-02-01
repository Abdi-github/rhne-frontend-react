import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import { useState, type MouseEvent } from 'react';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { AppLocale } from '@/shared/types/common.types';

const LANGUAGES: { code: AppLocale; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
];

interface LanguageSwitcherProps {
  color?: string;
}

export function LanguageSwitcher({ color = 'inherit' }: LanguageSwitcherProps) {
  const { locale, switchLocale } = useLocalePath();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (code: AppLocale) => {
    switchLocale(code);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color }} aria-label="Change language">
        <LanguageIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={locale === lang.code}
            onClick={() => handleSelect(lang.code)}
          >
            <Typography variant="body2" sx={{ fontWeight: locale === lang.code ? 700 : 400 }}>
              {lang.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
