import styled from 'styled-components'
import { Input } from 'atomics/Textarea/styles'

export const Container = styled.div`
  display: flex;
  padding: 0 16px;
  padding-top: 16px;
  flex-direction: column;
  gap: 16px;
  ${Input} {
    min-height: 140px;
  }
`
