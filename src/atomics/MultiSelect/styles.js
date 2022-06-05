import styled from 'styled-components'
export const Content = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
`

export const MultiSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  width: 100%;

  & i {
    position: absolute;
    left: 5px;
    top: 13px;
  }
`

export const Label = styled.label`
  text-transform: uppercase;
  font-size: 14px;
  padding-bottom: 4px;
`

export const Select = styled.select`
  padding-left: 24px;
`

export const ResultsWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`

export const ResultsChoosen = styled.div`
  display: flex;
  width: 92%;
  overflow-x: scroll;
  min-height: 24px;
  padding-bottom: 4px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-clip: padding-box;
    background-color: #666;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

export const SelectedItem = styled.div`
  padding: 3px 8px;
  border-radius: 4px;
  flex-wrap: nowrap;
  margin-right: 8px;
  background-color: #D6F2FB;
  cursor: pointer;
  &:hover {
    color: #7C0404;
    background-color: #84060620;
  }
  & p {
    font-size: 18px;
  }
  &:last-of-type {
    margin: 0;
  }
`

export const ClearAll = styled.p`
  font-size: 24px;
  line-height: 24px;
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  right: 0;
  &:hover {
    color: #7C0404;
  }
`
