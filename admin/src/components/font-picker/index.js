import FontPicker from 'font-picker-react';
import { useState, useEffect } from 'react';
import './style.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { api } from '../../utils/api_handler';
import Toast from '../toast';

export default function App({ type, heading, site }) {
  const [activeFontFamily, setFont] = useState('Open Sans');
  const [size, setSize] = useState(type === 'heading' ? '42px' : '16px');
  const [fontStyle, setFontStyle] = useState({});
  const [view, setView] = useState(false);
  const [sampleText, setSampleText] = useState('Sample Text');
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    const data = {
      size: size,
      fontFamily: activeFontFamily,
      fontStyle: fontStyle,
      type: type,
    };
    site === 1 &&
      api.saveFonts(data).then(res => {
        setShowToast(true);
      });
    site === 2 &&
      api.saveFonts2(data).then(res => {
        setShowToast(true);
      });
  };

  const handleSizeChange = event => {
    const value = event.target.value > 72 ? 72 : event.target.value;

    setSize(value + 'px');
  };

  function displayInput() {
    setView(!view);
  }
  function changeInput(event) {
    setSampleText(event.target.value);
  }

  return (
    <div>
      <Toast showToast={showToast} />
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginTop: '-20%' }}> {heading}</h1>

      <div className='picker-container'>
        <div>
          <h1 className='heading'>Font Family</h1>
          <br />
          <FontPicker
            apiKey='AIzaSyDPtqHOkdnMVZb6wrHcyz1Mwyn0Au-HCbI'
            activeFontFamily={activeFontFamily}
            onChange={nextFont => setFont(nextFont.family)}
          />

          <button className='btn anim-btn' onClick={displayInput}>
            Enter your Own text
          </button>
          <br />
          <input
            onChange={changeInput}
            style={{
              visibility: view ? '' : 'hidden',
              marginTop: '20px',
              height: '50px',
              zIndex: '0',
            }}
            placeholder='Enter your own text'
          ></input>
          <br />
        </div>
        <div>
          <h1 className='heading'>Font Size</h1>
          <br />
          <div className='input-group suffix'>
            <input type='number' name='input' min='8' max='72' value={parseInt(size.split('px')[0])} onChange={handleSizeChange} />
            <span className='input-group-addon '>px</span>
          </div>
          <div>
            <button
              style={{
                margin: '10px',
                width: '25px',
                background: Object.keys(fontStyle) && Object.keys(fontStyle)[0] === 'fontWeight' ? 'darkgrey' : '',
              }}
              onClick={() => {
                setFontStyle(Object.keys(fontStyle) && Object.keys(fontStyle)[0] === 'fontWeight' ? {} : { fontWeight: 'bold' });
              }}
            >
              <span style={{ fontWeight: 'bold' }}>B</span>
            </button>

            <button
              style={{
                margin: '10px',
                width: '25px',
                background: Object.keys(fontStyle) && Object.keys(fontStyle)[0] === 'fontStyle' ? 'darkgrey' : '',
              }}
              onClick={() => {
                setFontStyle(Object.keys(fontStyle) && Object.keys(fontStyle)[0] === 'fontStyle' ? {} : { fontStyle: 'italic' });
              }}
            >
              <span style={{ fontStyle: 'italic' }}>I</span>
            </button>

            <button
              style={{
                margin: '10px',
                width: '25px',
                background: Object.keys(fontStyle) && Object.keys(fontStyle)[0] === 'textDecoration' ? 'darkgrey' : '',
              }}
              onClick={() => {
                setFontStyle(Object.keys(fontStyle) && Object.keys(fontStyle)[0] === 'textDecoration' ? {} : { textDecoration: 'underline' });
              }}
            >
              <span style={{ textDecoration: 'underline' }}>U</span>
            </button>
          </div>
        </div>
      </div>

      <p
        className='apply-font'
        style={{ padding: '5px', borderTop: '1px solid', borderBottom: '1px solid', fontSize: size, textAlign: 'center', ...fontStyle }}
      >
        {sampleText}
      </p>
      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'relative', height: '50px', textAlign: 'center' }}>
        <Button variant='contained' onClick={handleSave}>
          Save
        </Button>
      </Box>
    </div>
  );
}
