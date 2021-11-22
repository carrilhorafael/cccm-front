import React from 'react'
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import kebab_icon from '../img/kebab_icon.png'
import { deleteUser } from '../services/Api.service';

export default function UserMenu ({showAccessModal, showDeleteModal, showTitheModal}) {

  return (
    <Menu menuButton={
      <MenuButton><img src={kebab_icon} alt=""/></MenuButton>
    }>
      <MenuItem className="menuItem">Editar informações</MenuItem>
      <MenuItem onClick={() => showTitheModal()} className="menuItem">Cadastrar dízimo</MenuItem>
      <MenuItem onClick={() => showAccessModal()} className="menuItem">Conceder acesso</MenuItem>
      <MenuItem onClick={() => showDeleteModal()} className="menuItem buttonExcluir">Excluir</MenuItem>
    </Menu>
  )
}
