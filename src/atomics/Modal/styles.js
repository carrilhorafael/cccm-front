import styled from 'styled-components'
import colors from '../../styles/colors'
import { prettyScrollBar } from '../../styles/prettyScrollBar'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Wrapper = styled.div`
  width: 680px;
  border-radius: 8px;
  box-shadow: 1px 1px 1em ${colors.gray.light};
  background: ${colors.gray.lightest};
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 8px 20px 16px;
  align-items: center;
  border-bottom: 2px solid ${colors.gray.lighter};
`
export const Title = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 800;
`
export const Body = styled.div`
  width: 100%;
  height: ${({hasFooter}) => hasFooter ? 300 : 366}px;
  overflow-y: auto;
  ${prettyScrollBar}
`
export const Footer = styled.div`
  display: flex;
  justify-content: end ;
  align-items: center ;
  padding-right: 16px;
  height: 66px;
  width: 100%;
  border-top: 2px solid ${colors.gray.lighter};
`
