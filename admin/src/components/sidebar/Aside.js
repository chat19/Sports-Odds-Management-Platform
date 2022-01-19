import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { GrLogout } from 'react-icons/gr';
import { BsFillFileEarmarkFontFill } from 'react-icons/bs';
import { IoIosColorPalette } from 'react-icons/io';
import { MdPreview } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { AiTwotoneSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import lscache from 'lscache';

const Aside = ({ isAdmin, path }) => {
  const site = lscache.get('site');

  const handleLogout = () => {
    lscache.set('isAuth', false, 60);
    lscache.set('isAdmin', false, 60);
    window.location.replace('/login');
  };

  return (
    <ProSidebar breakPoint='md'>
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Admin Dashboard
          <IconButton aria-label='logout' onClick={handleLogout} style={{ backgroundColor: 'white', float: 'right' }}>
            <GrLogout />
          </IconButton>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape='circle'>
          {(site === 'tinlizzie' || site === 'both') && (
            <SubMenu
              title='Tinlizzie'
              icon={<AiTwotoneSetting />}
              defaultOpen={
                path === '/font-heading' || path === '/font-body' || path === '/font-sidebar' || path === '/color-heading' || path === '/color-body'
              }
            >
              <SubMenu
                title='Font Picker'
                icon={<BsFillFileEarmarkFontFill />}
                defaultOpen={path === '/font-heading' || path === '/font-body' || path === '/font-sidebar'}
              >
                <MenuItem active={path === '/font-heading'}>
                  Heading Font <Link to='/font-heading' />
                </MenuItem>
                <MenuItem active={path === '/font-body'}>
                  Body Font <Link to='/font-body' />
                </MenuItem>
                <MenuItem active={path === '/font-sidebar'}>
                  Sidebar Font <Link to='/font-sidebar' />
                </MenuItem>
              </SubMenu>
              <SubMenu title='Color Picker' icon={<IoIosColorPalette />} defaultOpen={path === '/color-heading' || path === '/color-body'}>
                <MenuItem active={path === '/color-heading'}>
                  Heading Font Color <Link to='/color-heading' />
                </MenuItem>
                <MenuItem active={path === '/color-body'}>
                  Body Font Color <Link to='/color-body' />
                </MenuItem>
              </SubMenu>
            </SubMenu>
          )}
          {(site === 'cadillacjacksgaming' || site === 'both') && (
            <SubMenu
              title='Cadillacjacksgaming'
              icon={<AiTwotoneSetting />}
              defaultOpen={
                path === '/font-heading2' ||
                path === '/font-body2' ||
                path === '/font-sidebar2' ||
                path === '/color-heading2' ||
                path === '/color-body2'
              }
            >
              <SubMenu
                title='Font Picker'
                icon={<BsFillFileEarmarkFontFill />}
                defaultOpen={path === '/font-heading2' || path === '/font-body2' || path === '/font-sidebar2'}
              >
                <MenuItem active={path === '/font-heading2'}>
                  Heading Font <Link to='/font-heading2' />
                </MenuItem>
                <MenuItem active={path === '/font-body2'}>
                  Body Font <Link to='/font-body2' />
                </MenuItem>
                <MenuItem active={path === '/font-sidebar2'}>
                  Sidebar Font <Link to='/font-sidebar2' />
                </MenuItem>
              </SubMenu>
              <SubMenu title='Color Picker' icon={<IoIosColorPalette />} defaultOpen={path === '/color-heading2' || path === '/color-body2'}>
                <MenuItem active={path === '/color-heading2'}>
                  Heading Font Color <Link to='/color-heading2' />
                </MenuItem>
                <MenuItem active={path === '/color-body2'}>
                  Body Font Color <Link to='/color-body2' />
                </MenuItem>
              </SubMenu>
            </SubMenu>
          )}
        </Menu>
        <Menu iconShape='circle'>
          <SubMenu title='Teams' icon={<RiTeamFill />} defaultOpen={path === '/set-teams' || path === '/view-teams'}>
            <MenuItem active={path === '/set-teams'}>
              Mapping <Link to='/set-teams' />
            </MenuItem>
            <MenuItem active={path === '/view-teams'}>
              View All Mapped Teams <Link to='/view-teams' />
            </MenuItem>

          </SubMenu>
        </Menu>

        <Menu iconShape='circle'>
          <SubMenu title='Leagues' icon={<RiTeamFill />} defaultOpen={path === '/set-leagues' || path === '/view-leagues'}>
            <MenuItem active={path === '/set-leagues'}>
              Mapping <Link to='/set-leagues' />
            </MenuItem>
            <MenuItem active={path === '/view-leagues'}>
              View All Mapped Leagues <Link to='/view-leagues' />
            </MenuItem>
          </SubMenu>
        </Menu>

        {isAdmin && (
          <Menu iconShape='circle'>
            <SubMenu title='Users' icon={<MdAccountCircle />} defaultOpen={path === '/add-new' || path === '/users'}>
              <MenuItem active={path === '/add-new'}>
                Add New User <Link to='/add-new' />
              </MenuItem>
              <MenuItem active={path === '/users'}>
                All Users <Link to='/users' />
              </MenuItem>
            </SubMenu>
          </Menu>
        )}

        <Menu iconShape='circle'>
          <MenuItem icon={<MdAccountCircle />} active={path === '/my-account'}>
            My Account <Link to='/my-account' />
          </MenuItem>
        </Menu>
      </SidebarContent>

      {/* <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className='sidebar-btn-wrapper'
          style={{
            padding: '20px 24px',
          }}
        >
          <a href='https://www.tinlizzie.com/2586-2' target='_blank' className='sidebar-btn' rel='noopener noreferrer'>
            <MdPreview />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>View Frontend</span>
          </a>
        </div>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
