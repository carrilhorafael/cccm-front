import { Button } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
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
          <Button
            variant="primary"
            onClick={() => showModal(MinisteryModal)}
          >Criar um ministério</Button>
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
