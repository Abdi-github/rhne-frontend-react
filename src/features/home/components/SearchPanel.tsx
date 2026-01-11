import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLocalePath } from '@/shared/hooks/useLocalePath';

interface SearchPanelProps {
  title: string;
  professionalLabel: string;
  serviceLabel: string;
  infoLabel: string;
}

export function SearchPanel({ title, professionalLabel, serviceLabel, infoLabel }: SearchPanelProps) {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const { localePath } = useLocalePath();
  const [activeSearch, setActiveSearch] = useState<number | null>(null);
  const [searchValues, setSearchValues] = useState(['', '', '']);

  const searchFields = [
    {
      label: professionalLabel,
      placeholder: t('search_professional_placeholder', 'Tapez le nom d\'un-e professionnel-le'),
      resource: 'doctors',
    },
    {
      label: serviceLabel,
      placeholder: t('search_service_placeholder', 'Tapez le nom de la prestation'),
      resource: 'services',
    },
    {
      label: infoLabel,
      placeholder: t('search_info_placeholder', 'Que recherchez-vous ?'),
      resource: '',
    },
  ];

  const handleSearch = (index: number) => {
    const value = searchValues[index]?.trim();
    if (!value) return;
    const resource = searchFields[index].resource;
    const params = new URLSearchParams({ q: value });
    if (resource) params.set('resources', resource);
    navigate(localePath(`/recherche?${params.toString()}`));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(index);
  };

  return (
    <Box sx={{ position: 'relative', zIndex: 1, mt: { xs: -4, md: -8 }, pb: { xs: 2, md: 4 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"proxima-nova", "Noto Sans", sans-serif',
            fontWeight: 700,
            color: 'primary.main',
            textAlign: 'center',
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 0,
            bgcolor: 'white',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          {searchFields.map((field, index) => (
            <Box
              key={field.label}
              onClick={() => setActiveSearch(index)}
              sx={{
                p: { xs: 2, md: 2.5 },
                borderRight: { md: index < 2 ? '1px solid #E0E0E0' : 'none' },
                borderBottom: { xs: index < 2 ? '1px solid #E0E0E0' : 'none', md: 'none' },
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'rgba(0, 154, 150, 0.04)' },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  fontSize: '0.95rem',
                  mb: 1,
                }}
              >
                {field.label}
              </Typography>
              {activeSearch === index ? (
                <TextField
                  autoFocus
                  fullWidth
                  size="small"
                  variant="standard"
                  placeholder={field.placeholder}
                  value={searchValues[index]}
                  onChange={(e) => {
                    const newValues = [...searchValues];
                    newValues[index] = e.target.value;
                    setSearchValues(newValues);
                  }}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onBlur={() => {
                    if (!searchValues[index]) setActiveSearch(null);
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => handleSearch(index)}>
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: false,
                    },
                  }}
                  sx={{ '& .MuiInput-underline:before': { borderColor: 'primary.light' } }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.85rem' }}
                >
                  {field.placeholder}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
