import React from 'react'
import { useOverlayContext } from '../../context/OverlayContext'
import IconButton from '../IconButton'
import OverlayLocker from '../OverlayLocker'
import { Body, Container, Header, Title, Wrapper } from './styles'

export default function Modal ({
    children,
    title,
    Footer
  }) {
  const { closeModal } = useOverlayContext()


  return (
    <OverlayLocker>
      <Container>
        <Wrapper>
          <Header>
            <Title>{title}</Title>
            <IconButton
              icon='fa-solid fa-xmark'
              onClick={closeModal}
              noBackground
            />
          </Header>
          <Body>
            {children}
          </Body>
          {Footer}
        </Wrapper>
      </Container>
    </OverlayLocker>
  )
}
