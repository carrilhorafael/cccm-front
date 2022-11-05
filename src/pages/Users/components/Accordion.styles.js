import colors from 'utils/colors'
import styled from 'styled-components'
import { css } from 'styled-components'
export const Icon = styled.i`
  color: ${colors.blue.darker};
  padding-left: 8px;
`
export const ItemTitle = styled.h1`
  font-size: 18px;
  color: ${colors.gray.darkest};
  font-weight: 800;
`
export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & div {
    display: flex;
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
export const NoAccessTitle = styled.h1`
  color: ${colors.red.dark} !important;
  font-weight: bolder;
  margin-bottom: 8px;
`
export const AccessTitle = styled.h1`
  color: ${colors.green.dark} !important;
  font-weight: bolder;
  margin-bottom: 8px;
`
