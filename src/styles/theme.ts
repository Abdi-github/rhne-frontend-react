import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#009A96',
      light: '#99D9D9',
      dark: '#007A77',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#272833',
      light: '#989CA4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#EB313F',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#272833',
      secondary: '#989CA4',
    },
    divider: '#EFF1F7',
  },
  typography: {
    fontFamily: '"Noto Sans", Arial, system-ui, -apple-system, sans-serif',
    h1: {
      fontFamily: '"proxima-nova", "Noto Sans", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.1,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"proxima-nova", "Noto Sans", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"proxima-nova", "Noto Sans", Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#009A96',
    },
    h4: {
      fontFamily: '"proxima-nova", "Noto Sans", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.2rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.85rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 4,
        },
        containedPrimary: {
          '&:hover': { backgroundColor: '#007A77' },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundColor: '#009A96' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '0.85rem',
          color: '#009A96',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 4, fontWeight: 600 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: { fontSize: '0.85rem' },
      },
    },
    MuiSkeleton: {
      defaultProps: { animation: 'wave' },
    },
  },
});
