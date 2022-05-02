import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import './styles.css'
import ChurchCard from './components/churchCard'
import { useHistory } from 'react-router-dom'
import ChurchModal from '../../common/modals/churchModal'
import DeleteChurchModal from '../../common/modals/deleteChurchModal'
import { deleteChurch, getChurches, postChurch, putChurch } from '../../services/Api.service'

export default function ChurchesPage({ setChurchProvided }) {
  const history = useHistory()
  const [churches, setChurches] = useState([])
  const [showChurchModal, setShowChurchModal] = useState(false)
  const [showDeleteChurchModal, setShowDeleteChurchModal] = useState(false)
  const [resource, setResource] = useState(null)

  useEffect(() => {
    getChurches()
    .then(({data}) => setChurches(data))
  }, [])

  const onEdit = (church) => {
    setResource(church)
    setShowChurchModal(true)
  }

  const onDelete = (church) => {
    setResource(church)
    setShowDeleteChurchModal(true)
  }

  const handleUpdate = (churchParams) => {
    putChurch(resource.id, churchParams)
    .then(({data}) => {
      let resourceIndex = churches.findIndex(church => church.id === data.id)
      let newChurches = churches
      newChurches = [...newChurches.slice(0, resourceIndex), data, ...newChurches.slice(resourceIndex + 1)]

      setChurches(newChurches)
    })
  }

  const handleCreate = (churchParams) => {
    postChurch(churchParams)
    .then(({data}) => {
      setChurches([...churches, data])
    })
  }

  const handleDelete = () => {
    deleteChurch(resource.id)
    .then(() => {
      setChurches(churches.filter(church => resource.id != church.id))
    })
  }

  const goToPage = (church) => {
    setChurchProvided(church)
    history.push(`church/general`)
  }

  return (
    <main className='churchesLayout gradientLayout'>
      <ChurchModal
        resource={resource}
        show={showChurchModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onHide={() => {
          setResource(null)
          setShowChurchModal(false)
        }}
      />
      <DeleteChurchModal
        resource={resource}
        show={showDeleteChurchModal}
        onDelete={handleDelete}
        onHide={() => {
          setResource(null)
          setShowDeleteChurchModal(false)
        }}
      />
      <div className='pageLayout'>
        <section className='churchesHeader'>
          <h2>VISÃO GERAL DAS SEDES</h2>
          <Button variant="primary" onClick={() => setShowChurchModal(true)}> Adicionar nova sede </Button>
        </section>
        <section className='churchesContainer'>
          {churches.map(church => <ChurchCard key={church.id} onNavigate={() => goToPage(church)} onEdit={() => onEdit(church)} onDelete={() => onDelete(church)} church={church}/>)}
        </section>
      </div>
    </main>
  )
}
