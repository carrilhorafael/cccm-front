import { closeModal } from 'global'
import React from 'react'
import IconButton from '../IconButton'
import OverlayLocker from '../OverlayLocker'
import { Body, CloseButtonWrapper, Container, HeaderTitle, Wrapper } from './styles'

export default function Modal ({
    children,
    size,
    Header,
    Footer
  }) {


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
