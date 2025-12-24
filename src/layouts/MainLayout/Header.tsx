import Box from '@mui/material/Box';
import { UtilityBar } from './UtilityBar';
import { MainNav } from './MainNav';

export function Header() {
  return (
    <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      <UtilityBar />
      <MainNav />
    </Box>
  );
}
