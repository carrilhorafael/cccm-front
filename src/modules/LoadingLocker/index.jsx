import React from 'react'
import Loading from 'atomics/Loading'
import OverlayLocker from 'atomics/OverlayLocker'
import { Message, OverlayWrapper } from './styles'

export default function LoadingLocker ({ message }) {
  return (
    <OverlayLocker>
      <OverlayWrapper>
        <Loading size='lg' theme='secondary'/>
        {!!message && <Message>{message}</Message>}
      </OverlayWrapper>
    </OverlayLocker>
  )
}
