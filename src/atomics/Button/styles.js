import styled from 'styled-components'
import colors from '../../styles/colors'

const getThemeStyles = (theme) => {
  switch (theme) {
    case 'primary':
      return `
        background-color: ${colors.blue.base};
        border: 2px solid ${colors.blue.base};
        color: ${colors.gray.lightest};
        &:hover {
          border-color: ${colors.blue.dark};
          background-color: ${colors.blue.dark};
        }
      `
    case 'secondary':
      return `
        background-color: none;
        border: 2px solid ${colors.blue.base};
        color: ${colors.blue.base};
        &:hover {
          background-color: ${colors.blue.base};
          color: ${colors.gray.lightest};
        }
      `
    case 'negative':
      return `
        background-color: ${colors.red.base};
        border: 2px solid ${colors.red.base};
        color: ${colors.gray.lightest};
        &:hover {
          background-color: ${colors.red.dark};
          border-color: ${colors.red.dark};
        }
      `
    case 'disabled':
      return `
      background-color: ${colors.gray.light};
      border: 2px solid ${colors.gray.light};
      color: ${colors.gray.darker};
      &:hover {
        background-color: ${colors.gray.light};
        border-color: ${colors.gray.light};
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
  box-shadow: 1px 1px 1em ${colors.gray.base};
  cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
  ${({isFullWidth}) => isFullWidth && `width: 100%;`}
  ${({theme}) => getThemeStyles(theme)}
`

