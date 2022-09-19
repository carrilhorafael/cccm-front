import styled from 'styled-components'
import colors from 'utils/colors'
import { prettyScrollBar } from 'utils/prettyScrollBar'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const wrapperModifier = {
  small: {
    width: '30%',
    height: '200px'
  },
  medium: {
    width: '50%',
    height: '300px'
  },
  large: {
    width: '70%',
    height: '600px'
  },
  extraLarge: {
    width: '90%',
    height: '700px'
  }
}
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 8px 20px 16px;
  align-items: center;
  background-color: ${colors.blue.lighter};
  border-bottom: 2px solid ${colors.gray.lighter};
`
export const Wrapper = styled.div`
  width: ${({ size }) => wrapperModifier[size]['width']};
  border-radius: 8px;
  box-shadow: 1px 1px 1em ${colors.gray.light};
  background: ${colors.gray.lightest};
  position: relative;
  overflow: hidden;
`
export const CloseButtonWrapper = styled.div`
  & button {
    position: absolute;
    top: 16px;
    right: 8px;
  }
`
export const HeaderTitle = styled.div`
  font-size: 24px;
  display: flex;
  flex-wrap: nowrap;
  text-transform: uppercase;
  font-weight: 800;
`
export const Body = styled.div`
  width: 100%;
  height: ${({size}) => wrapperModifier[size]['height']};
  overflow-y: auto;
  ${prettyScrollBar}
`
export const Footer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 16px;
  height: 66px;
  width: 100%;
  border-top: 2px solid ${colors.gray.lighter};
`
