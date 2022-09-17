import React, { useEffect, useState } from 'react'
import Button from '../../atomics/Button'
import ChurchCard from './components/churchCard'
import { useHistory } from 'react-router-dom'
import ChurchModal from '../../modules/ChurchModal'
import DeleteChurchModal from '../../modules/DeleteChurchModal'
import { deleteChurch, getChurches, postChurch, putChurch } from '../../services/Api.service'
import { ChurchesContainer, ChurchesHeader, ChurchesLayout, PageLayout, PageTitle } from './styles'
import { useChurchContext } from '../../context/ChurchContext'
import { useOverlayContext } from '../../context/OverlayContext'

export default function ChurchesPage({ setChurchProvided }) {
  const history = useHistory()
  const {setChurch} = useChurchContext()
  const { showModal } = useOverlayContext()
  const [churches, setChurches] = useState([])
  const [resource, setResource] = useState(null)

  useEffect(() => {
    getChurches()
    .then(({data}) => setChurches(data))
  }, [])

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
      setChurches(churches.filter(church => resource.id !== church.id))
    })
  }

  const goToPage = (church) => {
    setChurch(church)
    history.push(`church/general`)
  }

  return (
    <ChurchesLayout>
      <PageLayout>
        <ChurchesHeader>
          <PageTitle>VISÃO GERAL DAS SEDES</PageTitle>
          <Button
            theme="primary"
            onClick={() => showModal(ChurchModal, { onCreate: handleCreate } )}
            title='Adicionar nova sede'
          />
        </ChurchesHeader>
        <ChurchesContainer>
          {churches.map(church =>
            <ChurchCard
              key={church.id}
              church={church}
              onNavigate={() => goToPage(church)}
              onEdit={() => showModal(ChurchModal, { resource: church, onUpdate: handleUpdate })}
              onDelete={() => showModal(DeleteChurchModal, { resource: church, onDelete: handleDelete })}
            />
          )}
        </ChurchesContainer>
      </PageLayout>
    </ChurchesLayout>
  )
}
