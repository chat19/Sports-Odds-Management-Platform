import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { api } from '../../utils/api_handler';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { BsFillShieldLockFill } from 'react-icons/bs';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';

const theme = createTheme();

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    api
      .addAccount({ email: data.get('email'), password: data.get('password') })
      .then(res => {
        alert('new User created');
      })
      .catch(err => {
        alert(err);
      });
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
            <BsFillShieldLockFill />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create New User
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
            />
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
              style={{ top: '-20%', left: '85%', zIndex: '99' }}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
