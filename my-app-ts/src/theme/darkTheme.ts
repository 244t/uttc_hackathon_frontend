import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DA1F2',
    },
    background: {
      default: '#15202B',
      paper: '#192734',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8899A6',
    },
    divider: '#38444D',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
  },
});

export default darkTheme;