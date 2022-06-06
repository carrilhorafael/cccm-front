import React from 'react'
import { Button } from './styles'

export default function IconButton ({
  theme,
  onClick,
  icon,
  anchorRef,
  noBackground
}) {

  return (
    <Button
      theme={theme}
      onClick={onClick}
      ref={anchorRef}
      noBackground={noBackground}
    >
      <i className={icon}/>
    </Button>
  )
}
