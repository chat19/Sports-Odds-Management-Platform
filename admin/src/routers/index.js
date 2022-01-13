import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../pages/login';

import FontPickerHeading from '../pages/font-picker-heading';
import FontPickerBody from '../pages/font-picker-body';
import FontPickerSidebar from '../pages/font-picker-sidebar';

import ColorPickerHeading from '../pages/color-picker-heading';
import ColorPickerBody from '../pages/color-picker-body';

import TeamList from '../pages/team-icons-view';
import TeamMapping from '../pages/team-icons-mapping';

import Sidebar from '../components/sidebar';

export default function Index() {
  return (
    <Router>
      <div className='app'>
        {localStorage.getItem('login') === 'allow' && <Sidebar />}
        <Routes>
          <Route exact path='/' element={localStorage.getItem('login') === 'allow' ? <FontPickerHeading /> : <Login />} />
          <Route exact path='/font-heading' element={localStorage.getItem('login') === 'allow' ? <FontPickerHeading /> : <Login />} />
          <Route exact path='/font-body' element={localStorage.getItem('login') === 'allow' ? <FontPickerBody /> : <Login />} />
          <Route exact path='/font-sidebar' element={localStorage.getItem('login') === 'allow' ? <FontPickerSidebar /> : <Login />} />
          <Route exact path='/color-heading' element={localStorage.getItem('login') === 'allow' ? <ColorPickerHeading /> : <Login />} />
          <Route exact path='/color-body' element={localStorage.getItem('login') === 'allow' ? <ColorPickerBody /> : <Login />} />
          <Route exact path='/view-teams' element={localStorage.getItem('login') === 'allow' ? <TeamList /> : <Login />} />
          <Route exact path='/set-teams' element={localStorage.getItem('login') === 'allow' ? <TeamMapping /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}
