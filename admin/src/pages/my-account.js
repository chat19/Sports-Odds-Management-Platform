import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';

import { api } from '../utils/api_handler';
import { BiUserCircle } from 'react-icons/bi';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import lscache from 'lscache';
const theme = createTheme();

export default function SignIn() {
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = lscache.get('email');
    const password = data.get('password');
    const fullName = data.get('fullName');
    const isAdmin = lscache.get('isAdmin');

    api
      .updateAccount({ email: email, password: password, fullName: fullName, isAdmin: isAdmin })
      .then(res => {
        if (res.data.success) {
          alert('Updated Successfully');
        } else {
          alert('Invalid Credentials!');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BiUserCircle />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Change Password
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin='normal' fullWidth id='email' label='Email Address' name='email' value={lscache.get('email')} disabled />
            <TextField margin='normal' fullWidth id='fullName' label='Full Name' name='fullName' />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              autoFocus
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
