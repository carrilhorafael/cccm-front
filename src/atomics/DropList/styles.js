import styled from 'styled-components'

export const Popper = styled.div`
  position: absolute;
  z-index: 1000;
  top: ${({top}) => `${top}px`};
  left: ${({left}) => `${left}px`};
  min-width: 300px;
  padding: 2px 0;
  border-radius: 4px;
  background-color: #fafafa;
  box-shadow: 3px 2px 1px #33333320;
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
      color: #840606;
      &:hover {
        background-color: #84060620;
      }
    `
    :
    `
      color: #333;
      &:hover {
        background-color: #0066cc20;
      }
    `
  }
  &:hover {
    background-color:
  }
`
