import styled from 'styled-components'

export const MenuWrapper = styled.div`
  & .szh-menu-button{
    background: none;
    border: none;
    position: absolute;
    right: 10px;
    top: calc(50% - 16px);
    font-size: 32px;
  }
  & .dangerOption p {
    color: #840606 !important;
  }
  & .dangerOption:hover{
    background-color: #84060620 !important;
  }
  & .menuItem {
    font-weight: 400;
    font-size: 16px;
    display: flex;
  }
  & .menuItem i {
    margin-right: 15px;
  }
`
