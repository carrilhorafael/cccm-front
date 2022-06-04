import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Wrapper = styled.div`
  min-width: 480px;
  background: #fafafa;
`
export const Header = styled.div`
  border-bottom: 2px solid #e6e6e6;
`
export const Title = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 300;
`
export const Body = styled.div`
  width: 100%;
  height: ${({hasFooter}) => hasFooter ? 300 : 366}px;
`
export const Footer = styled.div`
  display: flex;
  justify-content: end ;
  align-items: center ;
  padding-right: 8px;
  height: 66px;
  width: 100%;
  border-top: 2px solid #e6e6e6;
`
