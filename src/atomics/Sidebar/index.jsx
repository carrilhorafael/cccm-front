import React, { Children } from 'react'
import IconButton from '../../atomics/IconButton'
import OverlayLocker from '../../atomics/OverlayLocker'
import { Body, FooterWrapper, Header, SidebarWrapper, Title } from './styles'

export default function Sidebar ({
    show,
    onHide,
    title,
    placement,
    size,
    children,
    Footer
  }) {

  if (show) {
    return (
      <OverlayLocker>
        <SidebarWrapper placement={placement} size={size}>
          <Header>
            <Title>{title}</Title>
            <IconButton
              theme='secondary'
              icon='fa-solid fa-xmark'
              onClick={onHide}
              noBackground
            />
          </Header>
          <Body hasFooter={!!Footer}>
            {children}
          </Body>
          {Footer}
        </SidebarWrapper>
      </OverlayLocker>
    )
  }
  return null
}
