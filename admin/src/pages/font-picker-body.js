import React from 'react';
import FontPicker from '../components/font-picker';

export default function Index() {
  return (
    <div className='centered'>
      <FontPicker type='body' heading='Set Body Font' site={1} />
    </div>
  );
}
