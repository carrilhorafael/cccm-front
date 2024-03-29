import styled from 'styled-components'
import colors from 'utils/colors'

export const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 24px;
  justify-content: flex-end;
  `
  export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 16px;
  padding: 0px 24px;
  column-gap: 8px;
`
export const ActionWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: none;
  column-gap: 8px;
`
export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
`
export const Description = styled.div`
  flex-wrap: wrap;
  max-width: 100%;
`
export const Card = styled.div`
  position: relative;
  border-radius: 10px;
  border: ${colors.blue.light} 2px solid;
  background: ${colors.gray.lightest};
  padding: 16px 24px;
  box-shadow: 2px 3px 4px ${colors.gray.base};
  cursor: default;
  &:hover ${ActionWrapper} {
    display: flex
  }
`
export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
