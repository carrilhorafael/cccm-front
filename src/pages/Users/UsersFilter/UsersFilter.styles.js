import styled from "styled-components";

export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
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
export const FilterSubtitle = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`
