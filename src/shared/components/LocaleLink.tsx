import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useLocalePath } from '@/shared/hooks/useLocalePath';

interface LocaleLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

export const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  function LocaleLink({ to, ...props }, ref) {
    const { localePath } = useLocalePath();
    return <Link ref={ref} to={localePath(to)} {...props} />;
  },
);
