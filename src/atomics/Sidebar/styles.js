import styled from 'styled-components'
import colors from 'utils/colors'
import { prettyScrollBar } from 'utils/prettyScrollBar'

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
  background-color: ${colors.gray.lightest};
  ${({ placement }) => getPlacementPosition(placement)}
`
export const Header = styled.div`
  width: 100%;
  padding: 16px 8px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${colors.gray.lighter};
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
  ${prettyScrollBar}
`
export const FooterWrapper = styled.div`
  height: 66px;
  border-top: 2px solid ${colors.gray.lighter};
`

