import React, { useEffect, useState } from 'react';
import ColorPickerComponent from '../components/color-picker';
import { api } from '../utils/api_handler';

export default function Index() {
  const [color, setColor] = useState('');
  useEffect(() => {
    api.getSettings().then(res => {
      setColor(res.data.color_body);
    });
  }, []);
  return (
    color && (
      <div className='page-container'>
        <h1 style={{ marginTop: '-10%', marginBottom: '5%' }}> Set Body Font Color</h1>

        <ColorPickerComponent sampleText='Sample Body Text' type='body' site={1} initVal={color} />
      </div>
    )
  );
}
