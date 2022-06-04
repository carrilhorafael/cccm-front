import styled from 'styled-components'

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 24px;
  min-height: 24px;
  border-radius: 8px;
  &:hover{
    cursor: pointer;
  }
`
export default Checkbox
