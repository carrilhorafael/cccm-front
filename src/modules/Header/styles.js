import styled from 'styled-components'
import colors from 'utils/colors'

export const Container = styled.header`
  background-color: ${colors.blue.darkest};
`
export const HeaderName = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Title = styled.h1`
  font-size: 42px;
  color: ${colors.gray.lightest};
  text-align: center;
  font-weight: 700;
`
export const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`
