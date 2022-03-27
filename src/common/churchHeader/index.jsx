import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ChurchesContext } from '../../context/ChurchesContext'
import './styles.css'

export default function ChurchHeader () {
  const history = useHistory()
  const location = useLocation()
  const { church } = useContext(ChurchesContext)

  const goToPage = (pathname) => {
    history.push(`${pathname}?church_id=${church.id}`)
  }

  return (
    <section className='churchHeader'>
      <h2>{church.name}</h2>
      <nav>
        <p className={`link ${location.pathname === '/church/general' && 'active'}`} onClick={() => goToPage('/church/general')}>Visão geral</p>
        <p className={`link ${location.pathname === '/church/users' && 'active'}`} onClick={() => goToPage('/church/users')}>Membros</p>
        <p className={`link ${location.pathname === '/church/ministeries' && 'active'}`} onClick={() => goToPage('/church/ministeries')}>Ministérios</p>
      </nav>
    </section>
  )
}
