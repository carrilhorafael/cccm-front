import styled from 'styled-components'
import colors from 'styles/colors'

export const ChartMainLayout = styled.div`
  height: fit-content;
  border-radius: 8px;
  border: 2px solid ${colors.blue.darkest};
  padding: 8px 16px;
  canvas {
    max-width: 100%;
    max-height: 470px;
    padding-top: 24px;
  }
  h3 {
    padding-top: 16px;
  }
`
export const ChartMain = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  /* gap: 8px; */
`
export const Actions = styled.div`
  display: flex;
  gap: 8px;
`
