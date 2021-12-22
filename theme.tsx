import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      primary: {
        main: '#ed6c02', // orange
      },
      secondary: {
        main: '#696969', // grey
      }
    },
    typography: {
        fontFamily: 'Oswald'
    },
    spacing: 8,
  });