import React from 'react'
import { Button } from './styles'

export default function IconButton ({
  onClick,
  icon,
  anchorRef,
  noBackground
}) {

  return (
    <Button
      onClick={onClick}
      ref={anchorRef}
      noBackground={noBackground}
    >
      <i className={icon}/>
    </Button>
  )
}
