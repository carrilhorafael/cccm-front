import { Button } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import { ChurchesContext } from '../../context/ChurchesContext'
import IconButton from '../../common/iconButton'
import MinisteryModal from '../../common/modals/ministeryModal'
import './styles.css'
import { AuthContext } from '../../context/AuthContext'

export default function ChurchMinisteriesPage () {
  const { church, setChurch, getChurch, loadResources, ministeries, destroyMinistery } = useContext(ChurchesContext)
  const { user, userChurch } = useContext(AuthContext)

  const [showMinisteryModal, setShowMinisteryModal] = useState(false)
  const [resource, setResource] = useState(null)


  useEffect(() => {
    if(!church){
      const churchId = parseInt(window.location.search.split("?church_id=")[1])
      if (user.president_pastor && userChurch.id !== churchId){
        getChurch(churchId)
      } else {
        setChurch(userChurch)
      }
      loadResources(churchId)
    }
  }, [])

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
