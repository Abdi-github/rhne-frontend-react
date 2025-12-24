import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      {/* Mobile menu button */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: 1200,
        }}
      >
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{ color: 'white', bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
