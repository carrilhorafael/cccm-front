import styled from 'styled-components'
import colors from 'utils/colors'

export const GeneralLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 24px;
`
export const HeaderUser = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`
export const HeaderTitle = styled.p`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;
`

export const Container = styled.div`
  width: 100%;
  background-color: ${colors.gray.lightest};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 1px 2px 4px ${colors.gray.base};
`

export const UserForm = styled.div`
  margin-top: 16px;
`

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
