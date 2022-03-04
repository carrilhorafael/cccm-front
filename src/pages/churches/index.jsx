import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import './styles.css'
import { getChurches } from '../../services/Api.service'
import ChurchCard from './components/churchCard'

export default function ChurchesPage() {
  const [churches, setChurches] = useState([])

  useEffect(()=>{
    getChurches()
      .then(({data})=> {
        setChurches(data)
      })
  }, [])


  return (
    <main className='churchesLayout gradientLayout'>
      <section className='churchesHeader'>
        <h2>VISÃO GERAL DAS SEDES</h2>
        <Button variant="primary" > Adicionar nova sede </Button>
      </section>
      <section className='churchesContainer'>
        {churches.map(church => (
          <ChurchCard
            church={church}
          />
        ))}
      </section>
    </main>
  )
}
