import styled from 'styled-components'
import colors from 'utils/colors'

export const Title = styled.h1`
  display: flex;
  font-size: 32px;
  font-weight: 800;
  height: 42px;
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.gray.darkest};
  align-items: center;
`

export const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;
  padding: 8px 0 0 16px;
  background: ${colors.blue.lightest};
  border-bottom: 2px solid ${colors.gray.lighter};

`
export const NavItem = styled.div`
  font-size: 18px;
  color: ${({active}) => active ? colors.blue.dark : colors.gray.dark};
  border-bottom: ${({active}) => active ? `2px solid ${colors.blue.dark}` : `2px solid transparent`};
  line-height: 24px;
  cursor: pointer;
`
export const InfoWrapper = styled.div`
  width: 20%;
  padding-left: 16px;
`
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`
export const DescriptionWrapper = styled.div`
  width: 80%;
`
