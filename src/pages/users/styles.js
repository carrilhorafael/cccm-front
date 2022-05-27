import styled from 'styled-components'
import { css } from 'styled-components'

export const ItemTitle = styled.h1`
  font-size: 18px;
  color: #333333;
  font-weight: 800;
`
export const Icon = styled.i`
  color: #0400D8;
  padding-left: 8px;
`
export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  display: flex;
`
export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & div {
    display: flex;
  }
`
export const UsersPageHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  justify-content: space-between;
  & div {
    display: flex;
  }
  & div button:last-of-type {
    margin-left: 8px;
  }
`
export const AccordionRow = styled.div`
  display: flex;
  padding: 18px;
  width: 100%;
  justify-content: space-between;
  ${({displayGrid}) =>
    displayGrid && css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    `
  }
  & b {
    font-weight: 800;
  }
`

export const AccessWrapper = styled.div`
  flex-direction: column;
  &:last-of-type div {
    display: flex;
    flex-direction: row;
    margin-right: 70px;
  }
  &:last-of-type div p:last-of-type {
    margin-left: 32px;
  }
`
export const AccessTitle = styled.h1`
  color: #043C1A !important;
  font-weight: bolder;
  margin-bottom: 8px;
`
export const NoAccessTitle = styled.h1`
  color: #840606 !important;
  font-weight: bolder;
  margin-bottom: 8px;
`
