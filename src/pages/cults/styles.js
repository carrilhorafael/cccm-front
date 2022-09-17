import styled, { css } from 'styled-components'
import colors from '../../styles/colors'

export const GeneralLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 24px;
`
export const Item = styled.div`
  width: 100%;
  background-color: ${colors.gray.lightest};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 1px 2px 4px ${colors.gray.base};
`
export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  width: 100%;
`
export const ItemTitle = styled.h1`
  font-size: 18px;
  color: ${colors.gray.darkest};
  font-weight: 800;
`
export const ItemSubtitle = styled.h1`
  font-size: 18px;
  padding-left: 16px;
  color: ${colors.gray.dark};
  font-weight: 400;
`
export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  & div {
    display: flex;
    gap: 8px
  }
`
export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
