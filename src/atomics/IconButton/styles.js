import styled from 'styled-components'
import colors from '../../styles/colors'

export const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  transition: 0.3s;
  ${({ noBackground }) =>
    noBackground
    ? `background: none`
    : `background-color: ${colors.blue.lightest}`};

  &:hover {
    background-color: ${colors.blue.dark};
  }
`
