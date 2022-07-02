import styled from 'styled-components'
import colors from '../../styles/colors'

const getStyledTheme = (theme) => {
  if (theme === 'negative') {
    return `
      background-color: ${colors.red.lighter};
      color: ${colors.gray.dark};
      i {
        color: ${colors.red.dark}
      }
    `
  }
  return `
    background-color: ${colors.green.light};
    color: ${colors.gray.dark}
    i {
      color: ${colors.green.dark}
    }
  `
}

export const Container = styled.div`
  width: 460px;
  display: flex;
  z-index: 10001;
  padding: 16px 30px;
  align-items: center;
  position: absolute;
  right: 8px;
  bottom: 16px;
  border-radius: 8px;
  box-shadow: 1px 1px 1em ${colors.gray.base};
  ${({ theme }) => getStyledTheme(theme)}
  i{
    font-size: 24px;
  }
`

export const Text = styled.p`
  font-size: 18px;
  padding-left: 16px;
`
