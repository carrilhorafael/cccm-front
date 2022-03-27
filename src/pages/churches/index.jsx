import { Button } from 'react-bootstrap'
import React, { useContext, useEffect } from 'react'
import './styles.css'
import ChurchCard from './components/churchCard'
import { ChurchesContext } from '../../context/ChurchesContext'

export default function ChurchesPage() {
  const { getChurches, churches } = useContext(ChurchesContext)

  useEffect(() => getChurches(), [])

  return (
    <main className='churchesLayout gradientLayout'>
      <section className='churchesHeader'>
        <h2>VISÃO GERAL DAS SEDES</h2>
        <Button variant="primary" > Adicionar nova sede </Button>
      </section>
      <section className='churchesContainer'>
        {churches.map(church => <ChurchCard key={church.id} church={church}/>)}
      </section>
    </main>
  )
}
