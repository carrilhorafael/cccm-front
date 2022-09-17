import React from 'react'
import { useOverlayContext } from '../../context/OverlayContext'
import IconButton from '../IconButton'
import OverlayLocker from '../OverlayLocker'
import { Body, CloseButtonWrapper, Container, HeaderTitle, Wrapper } from './styles'

export default function Modal ({
    children,
    size,
    Header,
    Footer,
    noHeader
  }) {
  const { closeModal } = useOverlayContext()


  return (
    <OverlayLocker>
      <Container>
        <Wrapper size={size || 'medium'}>
          {Header}
          <CloseButtonWrapper>
            <IconButton
              theme='secondary'
              icon='fa-solid fa-xmark'
              onClick={closeModal}
              noBackground
            />
          </CloseButtonWrapper>
          <Body size={size || 'medium'}>
            {children}
          </Body>
          {Footer}
        </Wrapper>
      </Container>
    </OverlayLocker>
  )
}
