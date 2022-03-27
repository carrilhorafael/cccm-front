import React from 'react'
import './styles.css'

export default function IconButton ({ onClick, icon }) {
  return (
    <button className="iconButton" onClick={onClick}>
      <i className={icon}/>
    </button>
  )
}
