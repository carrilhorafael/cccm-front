import styled from 'styled-components'

export const GeneralLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
`
export const BirthdateSection = styled.div`
  border-radius: 8px;
  border: 2px solid #0400aa;
  height: fit-content;
`
export const Header = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  width: 100%;
  padding: 4px 8px;
  border-bottom: 2px solid #0400aa;
  & h3 {
    font-size: 18px;
    font-weight: bolder;
  }
`
export const UsersWrapper = styled.div`
  height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-clip: padding-box;
    background-color: #8683EA;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
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
