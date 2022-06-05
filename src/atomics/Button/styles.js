import styled from 'styled-components'

const getThemeStyles = (theme) => {
  switch (theme) {
    case 'primary':
      return `
        background-color: #0989FF;
        border: 2px solid #0989FF;
        color: #fafafa;
        &:hover {
          border-color: #0570D2;
          background-color: #0570D2;
        }
      `
    case 'secondary':
      return `
        background-color: none;
        border: 2px solid #0989FF;
        color: #0989FF;
        &:hover {
          background-color: #0989FF;
          color: #fafafa;
        }
      `
    case 'negative':
      return `
        background-color: #D1291F;
        border: 2px solid #D1291F;
        color: #fafafa;
        &:hover {
          background-color: #7C0404;
          border-color: #7C0404;
        }
      `
    case 'disabled':
      return `
      background-color: #c6c6c6;
      border: 2px solid #c6c6c6;
      color: #333;
      &:hover {
        background-color: #c6c6c6;
        border-color: #c6c6c6;
      }
    `
    default:
      break;
  }

}

export const Container = styled.button`
  text-transform: uppercase;
  padding: 10px 60px;
  transition: 0.3s;
  border-radius: 4px;
  font-weight: 700;
  box-shadow: 1px 1px 1em #33333380;
  cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
  ${({isFullWidth}) => isFullWidth && `width: 100%;`}
  ${({theme}) => getThemeStyles(theme)}
`

