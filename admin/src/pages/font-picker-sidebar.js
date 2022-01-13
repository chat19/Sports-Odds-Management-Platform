import React from 'react';
import FontPicker from '../components/font-picker';

export default function Index() {
  return (
    <div className='centered'>
      <FontPicker type='sidebar' heading='Set Sidebar Font' />
    </div>
  );
}
