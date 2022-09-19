import styled from 'styled-components'
import colors from 'utils/colors'
import { prettyScrollBar } from 'utils/prettyScrollBar'

export const GeneralLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 3fr;
  gap: 32px;
  padding: 16px 24px;
`
export const BirthdateSection = styled.div`
  border-radius: 8px;
  border: 2px solid ${colors.blue.darker};
  height: fit-content;
`
export const Header = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  width: 100%;
  padding: 4px 8px;
  border-bottom: 2px solid ${colors.blue.darker};
  & h3 {
    font-size: 18px;
    font-weight: bolder;
  }
`
export const Item = styled.div`
  height: 100%;
  background-color: ${colors.gray.lightest};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 1px 2px 4px ${colors.gray.base};
`
export const UsersWrapper = styled.div`
  height: 500px;
  overflow-y: scroll;
  ${prettyScrollBar}
`
export const BirthdateMember = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  font-size: 18px;
  padding: 16px 8px;
  align-items: center;
`
export const DateWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`
export const Name = styled.p`
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
