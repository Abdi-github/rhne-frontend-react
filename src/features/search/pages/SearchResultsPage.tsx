import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { EmptyState } from '@/shared/components/EmptyState';
import { useGlobalSearchQuery } from '../search.api';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { SearchResultItem } from '../components/SearchResultItem';

export default function SearchResultsPage() {
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  const { localeNavigate } = useLocalePath();

  const { data, isLoading } = useGlobalSearchQuery(
    { q: debouncedQuery, limit: 50 },
    { skip: debouncedQuery.length < 2 },
  );

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  const results = data?.data?.results ?? [];

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search_placeholder')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start"><SearchIcon /></InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
          autoFocus
        />

        {isLoading && <LoadingSpinner />}

        {!isLoading && debouncedQuery.length >= 2 && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('results_count', { count: results.length })}
            </Typography>

            {results.length === 0 ? (
              <EmptyState message={t('no_results')} />
            ) : (
              <List disablePadding>
                {results.map((result) => (
                  <SearchResultItem
                    key={`${result.type}-${result.id}`}
                    result={result}
                    onNavigate={localeNavigate}
                  />
                ))}
              </List>
            )}
          </>
        )}
      </Container>
    </>
  );
}
