import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import type { BreadcrumbItem } from '@/shared/types/common.types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export function Breadcrumb({ items, light }: BreadcrumbProps) {
  const { localePath } = useLocalePath();
  const color = light ? 'rgba(255,255,255,0.8)' : 'text.secondary';
  const activeColor = light ? 'white' : 'text.primary';

  return (
    <MuiBreadcrumbs
      sx={{
        mb: 1,
        '& .MuiBreadcrumbs-separator': { color },
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        if (isLast || !item.href) {
          return (
            <Typography
              key={i}
              variant="body2"
              sx={{ color: isLast ? activeColor : color, fontWeight: isLast ? 600 : 400 }}
            >
              {item.label}
            </Typography>
          );
        }
        return (
          <MuiLink
            key={i}
            component={Link}
            to={localePath(item.href)}
            variant="body2"
            sx={{ color, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            {item.label}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
}
