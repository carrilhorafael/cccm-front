import React from 'react'
import { Container, Text } from './styles'

export function Toast ({
  message,
  theme
  }) {

    const getIcon = () => {
      if(theme === 'negative') {
        return 'fa-solid fa-circle-xmark'
      }
      return 'fa-solid fa-circle-check'
    }

    return (
      <Container theme={theme}>
        <i className={getIcon()}/>
        <Text>{message}</Text>
      </Container>
    )
}
