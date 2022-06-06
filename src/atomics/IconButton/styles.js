import styled from 'styled-components'
import colors from '../../styles/colors'

const getThemeStyles = (theme, noBackground) => {
  switch (theme) {
    case 'primary':
      return `
        background-color: ${colors.blue.base};
        color: ${colors.gray.lightest};
        border: 2px solid ${colors.blue.base};
        &:hover {
          background-color: ${colors.blue.dark};
          border-color: ${colors.blue.dark};
        }
      `
    case 'secondary':
      return `
        background-color: ${colors.blue.lightest};
        border: 2px solid ${colors.blue.lightest};
        color: ${colors.gray.darker};
        &:hover {
          background-color: ${colors.blue.dark};
          color: ${colors.gray.lightest};
          border: 2px solid ${colors.blue.dark};
        }
      `
    case 'negative':
      return `
        background-color: ${colors.red.base};
        color: ${colors.gray.lightest};
        border: 2px solid ${colors.red.base};
        &:hover {
          background-color: ${colors.red.dark};
          border-color: ${colors.red.dark};
        }
      `
    case 'positive':
      return `
        background-color: ${colors.green.base};
        color: ${colors.gray.lightest};
        border: 2px solid ${colors.green.base};
        &:hover {
          background-color: ${colors.green.dark};
          border-color: ${colors.green.dark};
        }
      `
    default:
      break;
  }
}

export const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  transition: 0.3s;
  ${({theme}) => getThemeStyles(theme)}
  ${({noBackground}) => noBackground && `
    background: none;
    border: none;
  `}
`
