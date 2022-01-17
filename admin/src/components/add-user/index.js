import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { api } from '../../utils/api_handler';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { BiUserCircle } from 'react-icons/bi';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const theme = createTheme();

export default function AddUser() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [site, setSite] = React.useState('both');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event, newSite) => {
    setSite(newSite);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log('isAdmin', !!data.get('isAdmin'));
    // if (!data.get('email').includes('@')) {
    //   alert('Invalid Email Address!');
    //   return;
    // }
    api
      .addAccount({ email: data.get('email'), password: data.get('password'), isAdmin: !!data.get('isAdmin'), site: site })
      .then(res => {
        alert(`new User created\n email Address : ${res.data.user}`);
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
            <BiUserCircle />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create New User
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
            <ToggleButtonGroup color='primary' value={site} exclusive onChange={handleChange} sx={{ mb: 2 }}>
              <ToggleButton value='both'>Both</ToggleButton>
              <ToggleButton value='tinlizzie'>Tinlizzie</ToggleButton>
              <ToggleButton value='cadillacjacksgaming'>Cadillacjacksgaming</ToggleButton>
            </ToggleButtonGroup>
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
            <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} style={{ top: '-17%', left: '88%', zIndex: '99' }}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
            <FormControlLabel control={<Checkbox name='isAdmin' value='isAdmin' color='primary' />} label='Administrator' />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
