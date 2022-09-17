import styled from 'styled-components'
import { css } from 'styled-components'
import colors from '../../styles/colors'

export const GeneralLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 24px;
`
export const Item = styled.div`
  width: 100%;
  background-color: ${colors.gray.lightest};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 1px 2px 4px ${colors.gray.base};
`
export const ItemTitle = styled.h1`
  font-size: 18px;
  color: ${colors.gray.darkest};
  font-weight: 800;
`
export const Icon = styled.i`
  color: ${colors.blue.darker};
  padding-left: 8px;
`
export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray.darkest};
  display: flex;
`
export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & div {
    display: flex;
  }
`
export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const UsersPageHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  justify-content: space-between;
  & div {
    display: flex;
  }
  & div button:last-of-type {
    margin-left: 8px;
  }
`
export const AccordionRow = styled.div`
  display: flex;
  padding: 18px;
  width: 100%;
  justify-content: space-between;
  ${({displayGrid}) =>
    displayGrid && css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    `
  }
  & b {
    font-weight: 800;
  }
`
export const AccessWrapper = styled.div`
  flex-direction: column;
  &:last-of-type div {
    display: flex;
    flex-direction: row;
    margin-right: 70px;
  }
  &:last-of-type div p:last-of-type {
    margin-left: 32px;
  }
`
export const AccessTitle = styled.h1`
  color: ${colors.green.dark} !important;
  font-weight: bolder;
  margin-bottom: 8px;
`
export const NoAccessTitle = styled.h1`
  color: ${colors.red.dark} !important;
  font-weight: bolder;
  margin-bottom: 8px;
`
export const CheckboxFieldset = styled.fieldset`
  display: flex;
  align-items: center;
  margin-left: 48px;
  & label {
    margin-left: 24px;
    font-size: 18px;
  }
`
export const RadioFieldset = styled.fieldset`
  display: flex;
  margin-top: 8px;
  align-items: center;

  & label {
    margin-left: 16px;
    font-size: 18px;
  }
  & input[type='radio'] {
    width: 24px;
    height: 24px;
  }
`
export const FilterBody = styled.div`
  padding-top: 24px;
  // height: 1600px;
`
export const FilterType = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 16px 0;
  & ${CheckboxFieldset} {
    margin: 0;
  }
  & ${RadioFieldset} {
    margin: 0 0 0 48px;
  }
`
export const FilterSubtitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`
export const InfoFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  margin-left: 48px;
  margin-top: 8px;

  & label {
    font-size: 18px;
    margin-bottom: 4px;
  }
`
export const OrderBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

