import React, { useContext } from 'react'
import Button from '../../atomics/Button'
import { ChurchContext } from '../../context/ChurchContext'
import IconButton from '../../atomics/IconButton'
import MinisteryModal from '../../modules/MinisteryModal'
import { ActionWrapper, Card, Description, Header, List, Title } from './styles'
import { useOverlayContext } from '../../context/OverlayContext'

export default function ChurchMinisteriesPage () {
  const { ministeries, destroyMinistery } = useContext(ChurchContext)
  const { showModal } = useOverlayContext()

  return (
    <>
      <Header>
          <Button theme="primary" onClick={() => showModal(MinisteryModal)} title='Criar um ministério' />
      </Header>
      <List>
        {ministeries.map((ministery) => (
          <Card>
            <ActionWrapper>
              <IconButton icon="fa-solid fa-pen" onClick={() => showModal(MinisteryModal, {resource: ministery})}/>
              <IconButton icon="fa-solid fa-trash" onClick={() => destroyMinistery(ministery.id)}/>
            </ActionWrapper>
            <Title>{ministery.name}</Title>
            <Description>{ministery.description}</Description>
          </Card>
        ))}
      </List>
    </>
  )
}
