import styled from 'styled-components'
import { css } from 'styled-components'
import colors from '../../styles/colors'

export const HeaderContainer = styled.div`
  padding: 24px 0px 24px 32px;
  width: 100%;
`
export const Header = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
  // position: relative;
`
export const Item = styled.div`
  background-color: ${colors.blue.lightest};
  &:nth-child(2n) {
    background-color: ${colors.blue.lighter};
  }
`
export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 1em ${colors.gray.light};
  border-radius: 8px;
  overflow: hidden;
`
export const Body = styled.div`
  height: 0px;
  overflow-y: hidden;
  background-color: ${colors.gray.lightest};
  transition: 0.5s ease-out;
  ${({opened, height}) => opened && css`
    height: ${height}px;
  `};
`
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
`
export const PaginationResourcesConfig = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  & select {
    background: none;
    margin-left: 15px;
    border: none;
    border-radius: 4px 4px 0 0;
    border-bottom: 2px solid ${colors.blue.darker};
  }
`
export const PaginationPage = styled.div`
  display: flex;
  align-items: center;
  & button {
    background: none;
    border: none;
    font-weight: 900;
  }
`
export const AccordionHeaderWrapper = styled.div`

`
