import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green
      light: '#80e27e',
      dark: '#087f23',
    },
   
    secondary: {
      main: '#2196f3', // Blue
      light: '#6ec6ff',
      dark: '#0069c0',
    },
    warning: {
      main: '#ffeb3b', // Yellow
      light: '#ffff72',
      dark: '#c8b900',
    },
    background: {
      default: '#f4f4f4', // Lighter background
    },
  },
  typography: {
    // You can also customize typography here
    fontFamily: 'Roboto, Arial, sans-serif',
  },
// Add additional customizations if needed
});

export default theme;

