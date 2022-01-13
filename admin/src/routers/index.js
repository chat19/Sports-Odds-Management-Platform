import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<FontPickerHeading />} />
          <Route exact path='/font-heading' element={<FontPickerHeading />} />
          <Route exact path='/font-body' element={<FontPickerBody />} />
          <Route exact path='/font-sidebar' element={<FontPickerSidebar />} />
          <Route exact path='/color-heading' element={<ColorPickerHeading />} />
          <Route exact path='/color-body' element={<ColorPickerBody />} />
          <Route exact path='/view-teams' element={<TeamList />} />
          <Route exact path='/set-teams' element={<TeamMapping />} />
        </Routes>
      </div>
    </Router>
  );
}
