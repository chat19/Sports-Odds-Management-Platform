import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddUser from '../components/add-user';

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    if (data.get('email') === 'admin' && data.get('password') === '123') {
      localStorage.setItem('login', 'allow');
      window.location.reload();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AddUser />
    </ThemeProvider>
  );
}
