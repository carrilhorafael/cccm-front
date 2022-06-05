import React from 'react'
import { Container } from './styles'

export default function Button({
    title,
    theme,
    onClick,
    disabled,
    isFullWidth
  }) {

  return (
    <Container
      onClick={onClick}
      theme={theme}
      disabled={disabled}
      isFullWidth={isFullWidth}
    >
      {title}
    </Container>
  )
}
