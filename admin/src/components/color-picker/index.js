import { ColorPicker, useColor } from 'react-color-palette';
import React from 'react';
import { useState } from 'react';
import 'react-color-palette/lib/css/styles.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { api } from '../../utils/api_handler';
import Toast from '../toast';

export default function App({ sampleText, type, site, initVal }) {
  const [color, setColor] = useColor('hex', initVal || '#3a3a3ae3');
  const handleSave = () => {
    const data = {
      color: color.hex,
      type: type,
    };

    site === 1 &&
      api.saveColors(data).then(res => {
        alert('Saved Successfully!');
      });
    site === 2 &&
      api.saveColors2(data).then(res => {
        alert('Saved Successfully!');
      });
  };
  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'relative', height: '50px', padding: '0 10%', textAlign: 'right' }}>
        <Button variant='contained' onClick={handleSave}>
          Save
        </Button>
      </Box>
      <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV dark />
      <h1 style={{ marginTop: '50px', color: color.hex, border: '1px solid rgba(224, 224, 224, 1)', padding: '5px' }}>{sampleText}</h1>
    </>
  );
}
