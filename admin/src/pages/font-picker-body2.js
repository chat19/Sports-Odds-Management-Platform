import React from 'react';
import FontPicker from '../components/font-picker';
import { api } from '../utils/api_handler';
import { useState, useEffect } from 'react';

export default function Index() {
  const [font, setFont] = useState({});
  useEffect(() => {
    api.getSettings2().then(res => {
      setFont(res.data.font_body);
    });
  }, []);
  return font.fontFamily ? (
    <div className='centered'>
      <FontPicker type='body' heading='Set Body Font' site={2} initFont={font.fontFamily} initSize={font.size} initStyle={font.fontStyle} />
    </div>
  ) : (
    <></>
  );
}
