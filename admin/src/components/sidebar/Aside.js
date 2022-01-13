import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaRegLaughWink } from 'react-icons/fa';
import { BsFillFileEarmarkFontFill } from 'react-icons/bs';
import { IoIosColorPalette } from 'react-icons/io';
import { MdPreview } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Aside = () => {
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
          }}
        >
          Admin Dashboard
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape='circle'>
          <SubMenu title='Font Picker' icon={<BsFillFileEarmarkFontFill />}>
            <MenuItem>
              Heading Font <Link to='/font-heading' />
            </MenuItem>
            <MenuItem>
              Body Font <Link to='/font-body' />
            </MenuItem>
            <MenuItem>
              Sidebar Font <Link to='/font-sidebar' />
            </MenuItem>
          </SubMenu>
          <SubMenu title='Color Picker' icon={<IoIosColorPalette />}>
            <MenuItem>
              Heading Font Color <Link to='/color-heading' />
            </MenuItem>
            <MenuItem>
              Body Font Color <Link to='/color-body' />
            </MenuItem>
          </SubMenu>
        </Menu>
        <Menu iconShape='circle'>
          <SubMenu title='All Teams' icon={<RiTeamFill />}>
            <MenuItem>
              Mapping <Link to='/set-teams' />
            </MenuItem>
            <MenuItem>
              View All Teams <Link to='/view-teams' />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
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
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
