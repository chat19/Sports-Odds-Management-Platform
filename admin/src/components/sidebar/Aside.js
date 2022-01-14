import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaRegLaughWink } from 'react-icons/fa';
import { BsFillFileEarmarkFontFill } from 'react-icons/bs';
import { IoIosColorPalette } from 'react-icons/io';
import { MdPreview } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { AiTwotoneSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
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
          <SubMenu title='Tinlizzie' icon={<AiTwotoneSetting />}>
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
          </SubMenu>
          <SubMenu title='Cadillacjacksgaming' icon={<AiTwotoneSetting />}>
            <SubMenu title='Font Picker' icon={<BsFillFileEarmarkFontFill />}>
              <MenuItem>
                Heading Font <Link to='/font-heading2' />
              </MenuItem>
              <MenuItem>
                Body Font <Link to='/font-body2' />
              </MenuItem>
              <MenuItem>
                Sidebar Font <Link to='/font-sidebar2' />
              </MenuItem>
            </SubMenu>
            <SubMenu title='Color Picker' icon={<IoIosColorPalette />}>
              <MenuItem>
                Heading Font Color <Link to='/color-heading2' />
              </MenuItem>
              <MenuItem>
                Body Font Color <Link to='/color-body2' />
              </MenuItem>
            </SubMenu>
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
        <Menu iconShape='circle'>
          <MenuItem icon={<MdAccountCircle />}>
            Manage Stuff <Link to='/accounts' />
          </MenuItem>
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
