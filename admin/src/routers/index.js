import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../pages/login';
import Accounts from '../pages/accounts';

import FontPickerHeading from '../pages/font-picker-heading';
import FontPickerBody from '../pages/font-picker-body';
import FontPickerSidebar from '../pages/font-picker-sidebar';

import FontPickerHeading2 from '../pages/font-picker-heading2';
import FontPickerBody2 from '../pages/font-picker-body2';
import FontPickerSidebar2 from '../pages/font-picker-sidebar2';

import ColorPickerHeading from '../pages/color-picker-heading';
import ColorPickerBody from '../pages/color-picker-body';

import ColorPickerHeading2 from '../pages/color-picker-heading2';
import ColorPickerBody2 from '../pages/color-picker-body2';

import TeamList from '../pages/team-icons-view';
import TeamMapping from '../pages/team-icons-mapping';

import Sidebar from '../components/sidebar';

export default function Index() {
  const show = localStorage.getItem('login') === 'allow';
  return (
    <Router>
      <div className='app'>
        {show && <Sidebar />}
        <Routes>
          <Route exact path='/' element={show ? <FontPickerHeading /> : <Login />} />
          <Route exact path='/font-heading' element={show ? <FontPickerHeading /> : <Login />} />
          <Route exact path='/font-heading2' element={show ? <FontPickerHeading2 /> : <Login />} />
          <Route exact path='/font-body' element={show ? <FontPickerBody /> : <Login />} />
          <Route exact path='/font-body2' element={show ? <FontPickerBody2 /> : <Login />} />
          <Route exact path='/font-sidebar' element={show ? <FontPickerSidebar /> : <Login />} />
          <Route exact path='/font-sidebar2' element={show ? <FontPickerSidebar2 /> : <Login />} />
          <Route exact path='/color-heading' element={show ? <ColorPickerHeading /> : <Login />} />
          <Route exact path='/color-heading2' element={show ? <ColorPickerHeading2 /> : <Login />} />
          <Route exact path='/color-body' element={show ? <ColorPickerBody /> : <Login />} />
          <Route exact path='/color-body2' element={show ? <ColorPickerBody2 /> : <Login />} />
          <Route exact path='/view-teams' element={show ? <TeamList /> : <Login />} />
          <Route exact path='/set-teams' element={show ? <TeamMapping /> : <Login />} />
          <Route exact path='/accounts' element={show ? <Accounts /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}
