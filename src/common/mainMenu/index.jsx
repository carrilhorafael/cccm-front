import React from 'react'
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { MenuWrapper } from './styles';

export default function MainMenu ({ menuConfigs }) {

  return (
    <MenuWrapper>
      <Menu menuButton={
        <MenuButton><i class="fa-solid fa-ellipsis-vertical"/></MenuButton>
      }>
      {menuConfigs.map(menuConfig =>
        !menuConfig.hidden && (
          <MenuItem
            className={`menuItem ${menuConfig.isDanger ? 'dangerOption' : ''}`}
            onClick={menuConfig.onClick}
          >
            {menuConfig.hasIcon && (<i class={menuConfig.icon}/>)}
            <p>{menuConfig.title}</p>
          </MenuItem>
        ))}

      </Menu>
    </MenuWrapper>
  )
}
