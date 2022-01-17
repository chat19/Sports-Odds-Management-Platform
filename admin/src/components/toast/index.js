import * as React from 'react';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function DescriptionAlerts({ title, text, showToast }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log('show', show);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [showToast, showToast === true]);
  return (
    show && (
      <div style={{ position: 'fixed', right: 0, top: 0 }}>
        <Alert severity='success'>
          <AlertTitle>Success!</AlertTitle>
          Updated Successfully! Please check the change on the frontend.
        </Alert>
      </div>
    )
  );
}
