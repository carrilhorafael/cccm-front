import React, { useContext } from 'react'
import { ChurchContext } from '../../context/ChurchContext'
import './styles.css'

export default function ChurchHeader () {
  const { tab, church, setTab } = useContext(ChurchContext)

  return (
    <section className='churchHeader'>
      <h2>{church.name}</h2>
      <nav>
        <p className={`link ${tab === 'general' && 'active'}`} onClick={() => setTab('general')}>Visão geral</p>
        <p className={`link ${tab === 'users' && 'active'}`} onClick={() => setTab('users')}>Membros</p>
        <p className={`link ${tab === 'ministeries' && 'active'}`} onClick={() => setTab('ministeries')}>Ministérios</p>
      </nav>
    </section>
  )
}
