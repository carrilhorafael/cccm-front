import { Button } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import ChurchCard from './components/churchCard'
import { ChurchesContext } from '../../context/ChurchesContext'
import { useHistory } from 'react-router-dom'
import ChurchModal from '../../common/modals/churchModal'
import DeleteChurchModal from '../../common/modals/deleteChurchModal'

export default function ChurchesPage() {
  const history = useHistory()
  const { church, getChurches, churches } = useContext(ChurchesContext)
  const [showChurchModal, setShowChurchModal] = useState(false)
  const [showDeleteChurchModal, setShowDeleteChurchModal] = useState(false)
  const [resource, setResource] = useState(null)

  useEffect(() => {
    getChurches()
    if(church){
      history.push(`/church/general?church_id=${church.id}`)
    }
  }, [])

  const onEdit = (church) => {
    console.log(church)
    setResource(church)
    setShowChurchModal(true)
  }

  const onDelete = (church) => {
    setResource(church)
    setShowDeleteChurchModal(true)
  }

  return (
    <main className='churchesLayout gradientLayout'>
      <ChurchModal resource={resource} show={showChurchModal} onHide={() => {
        setResource(null)
        setShowChurchModal(false)
      }}/>
      <DeleteChurchModal resource={resource} show={showDeleteChurchModal} onHide={() => {
        setResource(null)
        setShowDeleteChurchModal(false)
      }}/>
      <div className='pageLayout'>
        <section className='churchesHeader'>
          <h2>VISÃO GERAL DAS SEDES</h2>
          <Button variant="primary" onClick={() => setShowChurchModal(true)}> Adicionar nova sede </Button>
        </section>
        <section className='churchesContainer'>
          {churches.map(church => <ChurchCard key={church.id} onEdit={() => onEdit(church)} onDelete={() => onDelete(church)} church={church}/>)}
        </section>
      </div>
    </main>
  )
}
