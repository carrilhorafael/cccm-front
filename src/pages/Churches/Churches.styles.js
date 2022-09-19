import styled from 'styled-components'
import colors from 'utils/colors'

export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const ChurchesLayout = styled.div`
  background: linear-gradient(115deg, ${colors.gray.lightest}, ${colors.blue.light}, ${colors.gray.lightest});
  width: 100%;
  height: calc(100vh - 42px);
  display: flex;
  padding: 0 70px;
  padding-top: 30px;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: center;
`
export const PageLayout = styled.div`
  width: calc(100vw - 140px);
  margin: 10px auto;
  background-color: ${colors.gray.lightest};
  padding: 20px;
  border-radius: 30px;
`
export const ChurchesHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
`
export const PageTitle = styled.h1`
  font-size: 36px;
  text-transform: capitalize;
`
export const ChurchesContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 16px;
`
export const ButtonWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 16px;
  display: none;
  column-gap: 8px;

  &:hover {
    display: flex;
  }
`
export const ChurchCardContainer = styled.div`
  border-radius: 20px;
  padding: 30px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: ${colors.blue.darker} 2px solid;
  & h2 {
    font-size: 36px;
    color: ${colors.gray.darker};
    font-weight: bold;
    margin-bottom: 24px;
  }
  & p {
    font-size: 16px;
    color: ${colors.gray.darker};
    margin-bottom: 24px;
  }
  & .btn-primary {
    padding: 5px 10px;
    align-self: flex-end;
  }
  &:hover ${ButtonWrapper} {
    display: flex;
  }
`
