import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddUser from '../components/add-user';

const theme = createTheme();

export default function SignIn() {
  return (
    <ThemeProvider theme={theme}>
      <AddUser />
    </ThemeProvider>
  );
}
