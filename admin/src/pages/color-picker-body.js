import React from 'react';
import ColorPickerComponent from '../components/color-picker';

export default function Index() {
  return (
    <div className='page-container'>
      <h1 style={{ marginTop: '-10%', marginBottom: '5%' }}> Set Body Font Color</h1>

      <ColorPickerComponent sampleText='Sample Body Text' type='body' />
    </div>
  );
}
