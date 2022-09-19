import styled from 'styled-components'
import colors from 'utils/colors'

const getThemeStyles = (theme) => {
  if (theme === 'primary') {
    return `
      background-color: ${colors.blue.darker}
    `
  } else if (theme === 'secondary') {
    return `
      background-color: ${colors.gray.lightest}
    `
  }
}

const getSizeStyles = (size) => {
  if (size === 'sm') {
    return 12
  } else if (size === 'md') {
    return 18
  } else if (size === 'lg') {
    return 24
  }
}

export const Spinner = styled.div`
  border-radius: 50%;
  margin: 0 2px;
  animation: pulse 0.3s infinite alternate;
  animation-delay: ${({ delay }) => `${delay}s`};
  ${({ theme }) => getThemeStyles(theme)};

  @keyframes pulse {
    from {
      height: ${({ size }) => `${getSizeStyles(size)}px`};
      width: ${({ size }) => `${getSizeStyles(size)}px`};
      opacity: 0.3;
    }
    to {
      height: ${({ size }) => `${0.8 * getSizeStyles(size)}px`};
      width: ${({ size }) => `${0.8 * getSizeStyles(size)}px`};
      opacity: 1;
    }
  }
`

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 24px;
`

