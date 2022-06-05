import React, { useRef, useState } from 'react'
import { MenuWrapper } from './styles';
import IconButton from '../IconButton';
import DropList from '../DropList';

export default function MainMenu ({ menuConfigs }) {
  const anchorRef = useRef(null)
  const [openedDroplist, setOpenedDroplist] = useState(false)
  return (
    <MenuWrapper>
      <IconButton onClick={() => setOpenedDroplist(!openedDroplist)} icon='fa-solid fa-ellipsis' anchorRef={anchorRef} noBackground></IconButton>
      <DropList opened={openedDroplist} onClose={() => setOpenedDroplist(false)} anchorRef={anchorRef} options={menuConfigs}/>
    </MenuWrapper>
  )
}
