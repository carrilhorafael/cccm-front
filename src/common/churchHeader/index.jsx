import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './styles.css'

export default function ChurchHeader ({churchProvided}) {
  const history = useHistory()
  const location = useLocation()

  const goToPage = (pathname) => {
    history.push(`${pathname}`)
  }

  return (
    <section className='churchHeader'>
      <h2>{churchProvided && churchProvided.name}</h2>
      <nav>
        <p className={`link ${location.pathname === '/church/general' && 'active'}`} onClick={() => goToPage('/church/general')}>Visão geral</p>
        <p className={`link ${location.pathname === '/church/users' && 'active'}`} onClick={() => goToPage('/church/users')}>Membros</p>
        <p className={`link ${location.pathname === '/church/ministeries' && 'active'}`} onClick={() => goToPage('/church/ministeries')}>Ministérios</p>
      </nav>
    </section>
  )
}
