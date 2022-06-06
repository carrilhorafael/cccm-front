import styled from 'styled-components'
import colors from '../../styles/colors'

export const Popper = styled.div`
  position: absolute;
  z-index: 1000;
  top: ${({top}) => `${top}px`};
  left: ${({left}) => `${left}px`};
  min-width: 300px;
  padding: 2px 0;
  border-radius: 4px;
  background-color: ${colors.gray.lightest};
  box-shadow: 3px 2px 1px ${colors.gray.light};
`

export const DropListItem = styled.div`
  cursor: pointer;
  padding: 12px;
  ${({hasIcon}) =>
    hasIcon && `
      display: grid;
      grid-template-columns: 1fr 6fr;
    `
  }

  & i {
    margin 0 auto;
  }
  ${({danger}) => danger ?
    `
      color: ${colors.red.dark};
      &:hover {
        background-color: ${colors.red.light};
      }
    `
    :
    `
      color: ${colors.gray.darker};
      &:hover {
        background-color: ${colors.blue.lighter};
      }
    `
  }
`
