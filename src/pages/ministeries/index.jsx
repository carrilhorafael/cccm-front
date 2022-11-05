import React, { useContext } from 'react'
import Button from 'atomics/Button'
import { ChurchContext } from 'context/ChurchContext'
import IconButton from 'atomics/IconButton'
import MinisteryModal from 'modules/MinisteryModal'
import { ActionWrapper, Card, Description, Header, List, LoadingWrapper, Title } from './styles'
import Loading from 'atomics/Loading'
import { showModal } from 'global'
import useChurchMinisteries from 'pages/Users/hooks/useChurchMinisteries'

export default function ChurchMinisteriesPage () {
  const { destroyMinistery } = useContext(ChurchContext)
  const { ministeries, loading } = useChurchMinisteries()

  return (
    <>
      <Header>
          <Button theme="primary" onClick={() => showModal(MinisteryModal)} title='Criar um ministério' />
      </Header>
      {loading ?
        <LoadingWrapper>
          <Loading size='md' theme='primary'/>
        </LoadingWrapper>
        :
        <List>
          {ministeries.map((ministery) => (
            <Card>
              <ActionWrapper>
                <IconButton theme='primary' icon="fa-solid fa-pen" onClick={() => showModal(MinisteryModal, {resource: ministery})}/>
                <IconButton theme='negative' icon="fa-solid fa-trash" onClick={() => destroyMinistery(ministery.id)}/>
              </ActionWrapper>
              <Title>{ministery.name}</Title>
              <Description>{ministery.description}</Description>
            </Card>
          ))}
        </List>
      }
    </>
  )
}
