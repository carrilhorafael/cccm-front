import { Button } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import { ChurchContext } from '../../context/ChurchContext'
import IconButton from '../../common/iconButton'
import MinisteryModal from '../../common/modals/ministeryModal'
import './styles.css'

export default function ChurchMinisteriesPage () {
  const { ministeries, destroyMinistery } = useContext(ChurchContext)

  const [showMinisteryModal, setShowMinisteryModal] = useState(false)
  const [resource, setResource] = useState(null)

  return (
    <main className='pageLayout'>
      <MinisteryModal resource={resource} show={showMinisteryModal} onHide={() => {
        setResource(null)
        setShowMinisteryModal(false)
      }}/>
      <section className='ministeriesHeader'>
        <Button variant="primary" onClick={() => setShowMinisteryModal(true)}>Criar um ministério</Button>
      </section>
      <section className='ministeriesPage'>
        {ministeries.map((ministery) => (
          <div className='ministeryCard'>
            <div className='buttonsWrapper'>
              <IconButton icon="fa-solid fa-pen" onClick={() => {
                setResource(ministery)
                setShowMinisteryModal(true)
              }}/>
              <IconButton icon="fa-solid fa-trash" onClick={() => {
                destroyMinistery(ministery.id)}}/>
            </div>
            <h1>{ministery.name}</h1>
            <p>{ministery.description}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
