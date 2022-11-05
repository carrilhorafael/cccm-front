import { closeModal } from 'global'
import React from 'react'
import IconButton from 'atomics/IconButton'
import OverlayLocker from 'atomics/OverlayLocker'
import { Body, CloseButtonWrapper, Container, Wrapper } from './styles'

export default function Modal ({
    children,
    size,
    Header,
    Footer
  }) {


  return (
    <OverlayLocker>
      <Container>
        <Wrapper size={size || 'md'}>
          {Header}
          <CloseButtonWrapper>
            <IconButton
              theme='secondary'
              icon='fa-solid fa-xmark'
              onClick={closeModal}
              noBackground
            />
          </CloseButtonWrapper>
          <Body size={size || 'md'}>
            {children}
          </Body>
          {Footer}
        </Wrapper>
      </Container>
    </OverlayLocker>
  )
}
