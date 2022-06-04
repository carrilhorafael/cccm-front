import styled from 'styled-components'

const getPlacementPosition = (placement) => {
  if(placement === 'left'){
    return `
      top: 0;
      left: 0;
    `
  } else if (placement === 'right'){
    return `
      top: 0;
      right: 0;
    `
  }
}

export const SidebarWrapper = styled.div`
  height: 100%;
  position: absolute;
  width: 520px;
  background-color: #fafafa;
  ${({ placement }) => getPlacementPosition(placement)}
`
export const Header = styled.div`
  width: 100%;
  padding: 16px 8px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e6e6e6;
`
export const Title = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 300;
`
export const Body = styled.div`
  height: calc(100vh - 66px${({hasFooter}) => hasFooter && ' - 66px'});
  width: 100%;
  padding: 0 24px;
  overflow-y: auto;
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
export const FooterWrapper = styled.div`
  height: 66px;
  border-top: 2px solid #e6e6e6;
`

