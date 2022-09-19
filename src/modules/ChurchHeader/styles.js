import styled from 'styled-components'
import colors from 'utils/colors'

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 24px;
  padding-top: 30px;
  background-color: ${colors.gray.lightest};
`
export const Title = styled.h2`
  text-transform: uppercase;
  display: flex;
  font-size: 32px;
  margin-bottom: 30px;
  color: ${colors.gray.darker};
`
export const Nav = styled.nav`
  display: flex;
`
export const Link = styled.a`
  display: flex;
  flex-direction: column;
  margin: 16px 32px 16px 0;
  font-size: 18px;
  color: ${colors.gray.darker};
  cursor: pointer;
  text-decoration: none;
  &.active {
    color: ${colors.blue.darker};
  }
  &:hover{
    color: ${colors.blue.darker}
  }
  &.active::after {
    content: "";
    background-color: ${colors.blue.darkest};
    height: 2px;
    margin-top: 5px;
    width: 100%;
  }
`
