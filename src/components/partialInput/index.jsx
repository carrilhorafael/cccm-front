import React from 'react'
import './styles.css'

export default function PartialInput ({value, onChange, placeholder}) {

  return (
    <div className='searchInput'>
      <i className='fa-solid fa-magnifying-glass'/>
      <input type="text" placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  )
}
