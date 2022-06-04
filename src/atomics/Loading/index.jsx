import React from 'react'
import { Spinner, SpinnerWrapper } from './styles.js'

export default function Loading({ theme, size }) {
  return (
    <SpinnerWrapper>
      <Spinner theme={theme} size={size} delay={0}/>
      <Spinner theme={theme} size={size} delay={0.1}/>
      <Spinner theme={theme} size={size} delay={0.2}/>
    </SpinnerWrapper>
  )
}
