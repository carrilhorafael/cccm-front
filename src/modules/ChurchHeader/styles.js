import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 70px;
  padding-top: 40px;
  background-color: #fafafa;
`
export const Title = styled.h2`
  text-transform: uppercase;
  display: flex;
  font-size: 32px;
  margin-bottom: 40px;
  color: #333;
`
export const Nav = styled.nav`
  display: flex;
`
export const Link = styled.a`
  display: flex;
  flex-direction: column;
  margin: 16px 32px 16px 0;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  text-decoration: none;
  &.active {
    color: #0400D8;
  }
  &.active::after {
    content: "";
    background-color: #0400D8;
    height: 2px;
    margin-top: 5px;
    width: 100%;
  }
`
