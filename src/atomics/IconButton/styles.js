import styled from 'styled-components'

export const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  ${({ noBackground }) =>
    noBackground
    ? `background: none`
    : `background-color: #F3FCFF`};

  &:hover {
    background-color: #c7c5f0;
  }
`
