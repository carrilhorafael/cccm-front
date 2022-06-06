import styled from "styled-components";
import colors from "../../styles/colors";

export const OverlayWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px
`

export const Message = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray.lightest};
  width: fit-content;
`
