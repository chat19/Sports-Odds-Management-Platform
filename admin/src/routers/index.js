import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '../pages/login';
import NewAccount from '../pages/new-account';
import Users from '../pages/users';
import MyAccount from '../pages/my-account';

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

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import lscache from 'lscache';

export default function Index() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const isAuth = user.isAuth;
  const { pathname } = useLocation();

  useEffect(() => {
    if (!lscache.get('isAuth')) {
      navigate('/login');
    }
    if (isAuth) navigate('/my-account');
  }, [isAuth]);

  return (
    <div className='app'>
      {lscache.get('isAuth') && <Sidebar isAdmin={lscache.get('isAdmin')} path={pathname} />}

      <Routes>
        <Route exact path='/' element={<FontPickerHeading />} />
        <Route exact path='/font-heading' element={<FontPickerHeading />} />
        <Route exact path='/font-heading2' element={<FontPickerHeading2 />} />
        <Route exact path='/font-body' element={<FontPickerBody />} />
        <Route exact path='/font-body2' element={<FontPickerBody2 />} />
        <Route exact path='/font-sidebar' element={<FontPickerSidebar />} />
        <Route exact path='/font-sidebar2' element={<FontPickerSidebar2 />} />
        <Route exact path='/color-heading' element={<ColorPickerHeading />} />
        <Route exact path='/color-heading2' element={<ColorPickerHeading2 />} />
        <Route exact path='/color-body' element={<ColorPickerBody />} />
        <Route exact path='/color-body2' element={<ColorPickerBody2 />} />
        <Route exact path='/view-teams' element={<TeamList />} />
        <Route exact path='/set-teams' element={<TeamMapping />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/my-account' element={<MyAccount />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/add-new' element={<NewAccount />} />
      </Routes>
    </div>
  );
}
