import { Button } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import { ChurchContext } from '../../../context/ChurchContext'
import IconButton from '../../../components/iconButton'
import CreateMinisteryModal from '../../../components/modals/createMinisteryModal'

export default function ChurchMinisteriesPage () {
  const { church, setResource } = useContext(ChurchContext)
  const [showCreateMinisteryModal, setShowCreateMinisteryModal] = useState(false)

  return (
    <>
      <CreateMinisteryModal show={showCreateMinisteryModal} onHide={() => setShowCreateMinisteryModal(false)}/>
      <section className='ministeriesHeader'>
        <Button variant="primary" onClick={() => setShowCreateMinisteryModal(true)}>Criar um ministério</Button>
      </section>
      <section className='ministeriesPage'>
        {church.ministeries.map((ministery, idx) => (
          <div className='ministeryCard'>
            <div className='buttonsWrapper'>
              <IconButton icon="fa-solid fa-pen" onClick={() => {
                setResource(ministery)
                setShowCreateMinisteryModal(true)
              }}/>
              <IconButton icon="fa-solid fa-trash" onClick={() => console.log("Excluir o ministério " + ministery.name)}/>
            </div>
            <h1>{ministery.name}</h1>
            <p>{ministery.description}</p>
          </div>
        ))}
      </section>
    </>
  )
}
