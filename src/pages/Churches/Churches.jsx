import React, { useEffect, useReducer } from 'react'
import { useChurchContext } from 'context/ChurchContext'
import Button from 'atomics/Button'
import Loading from 'atomics/Loading'
import { useHistory } from 'react-router-dom'
import ChurchCard from './components/ChurchCard'
import ChurchModal from './components/ChurchModal'
import DeleteChurchModal from './components/DeleteChurchModal'
import {
  ChurchesContainer,
  ChurchesHeader,
  ChurchesLayout,
  LoadingWrapper,
  PageLayout,
  PageTitle
} from './Churches.styles'
import { reducer, initialState, ActionStatus } from './store'
import { loadChurches, createChurch, updateChurch, deleteChurch } from './actions'
import { showModal } from 'global'

export default function ChurchesPage({ setChurchProvided }) {
  const [{ churches, status }, dispatch] = useReducer(reducer, initialState)
  useEffect(() => loadChurches(dispatch), [])
  const history = useHistory()

  const { setChurch } = useChurchContext()

  const handleNavigateClick = (church) => () => {
    setChurch(church)
    history.push(`church/general`)
  }

  const handleEditClick = (church) => () => {
    showModal(
      ChurchModal,
      {
        resource: church,
        onSubmit: (churchParams) => updateChurch(dispatch, church, churchParams)
      }
    )
  }

  const handleCreateClick = () => {
    showModal(
      ChurchModal,
      {
        onSubmit: (churchParams) => createChurch(dispatch, churchParams)
      }
    )
  }

  const handleDeleteClick = (church) => () => {
    showModal(
      DeleteChurchModal,
      {
        resource: church,
        onConfirm: () => deleteChurch(dispatch, church)
      }
    )
  }

  return (
    <ChurchesLayout>
      <PageLayout>
        <ChurchesHeader>
          <PageTitle>VISÃO GERAL DAS SEDES</PageTitle>
          <Button
            theme="primary"
            onClick={handleCreateClick}
            title='Adicionar nova sede'
          />
        </ChurchesHeader>
        <ChurchesContainer>
          {status === ActionStatus.LOADING && (
            <LoadingWrapper>
              <Loading size='md' theme='primary'/>
            </LoadingWrapper>
          )}
          {status === ActionStatus.COMPLETED && churches.map(church =>
            <ChurchCard
              key={church.id}
              church={church}
              onNavigate={handleNavigateClick(church)}
              onEditClick={handleEditClick(church)}
              onDeleteClick={handleDeleteClick(church)}
            />
          )}
        </ChurchesContainer>
      </PageLayout>
    </ChurchesLayout>
  )
}
