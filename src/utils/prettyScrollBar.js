import colors from "utils/colors";

export const prettyScrollBar = `
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-clip: padding-box;
    background-color: ${colors.gray.darker};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`
