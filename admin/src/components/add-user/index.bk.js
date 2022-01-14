import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import { IoMdPersonAdd } from 'react-icons/io';

export default function InputAdornments() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleEmailChange = e => {
    const val = e.target.value;
    setEmail(val);
  };
  const handlePasswordChange = prop => e => {
    const val = e.target.value;
    setPassword(val);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <TextField label='Email' id='outlined-start-adornment' sx={{ m: 1, width: '25ch' }} onChange={handleEmailChange} />

      <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange('password')}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
        />
      </FormControl>
      <FormControl sx={{ m: 3, width: '25ch', height: '125ch' }}>
        <Button variant='contained'>
          <IoMdPersonAdd />
        </Button>
      </FormControl>
    </Box>
  );
}
