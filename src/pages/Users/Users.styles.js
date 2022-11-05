import styled from 'styled-components'
import colors from 'utils/colors'

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

export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
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
export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray.darkest};
  display: flex;
`


