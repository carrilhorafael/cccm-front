import styled from 'styled-components'

export const UserForm = styled.div``

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  row-gap: 16px;
  margin-bottom: 16px;
`

export const TextareaWrapper = styled.div`
  margin-bottom: 16px;
`
export const CheckboxWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({marginLeft}) => marginLeft && `margin-left: 40px;`}
  & label {
    padding: 0;
    margin-left: 16px;
  }
`
export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 32px;
  justify-content: center;
`
