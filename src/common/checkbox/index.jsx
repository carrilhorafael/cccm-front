import React from 'react'
import './styles.css'

export default function Checkbox ({id, checked, handleToggle}) {
  return(
    <input className='checkbox' type="checkbox" id={id} checked={checked} onChange={handleToggle}/>
  )
}
