import styled from 'styled-components'
import colors from 'utils/colors'
export const Content = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: start;
`
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 4px;
`
export const StartIcon = styled.i`
  position: absolute;
  left: 5px;
  top: 13px;
`
export const Label = styled.label`
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.gray.darker}
`
export const ErrorLabel = styled.label`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.red.dark};
`
export const EndWrapper = styled.div`
  position: absolute;
  // z-index: 10;
  right: 5px;
  top: 13px;
`
export const Input = styled.textarea`
  width: 100%;
  border-radius: 5px;
  border: ${({hasError}) => hasError ? colors.red.base : colors.blue.darker} 2px solid;
	background-color: ${colors.gray.lightest};
  min-height: 42px;
	font-size: 18px;
  ${({hasPaddingLeft}) =>
    hasPaddingLeft &&
    `padding-left: 24px`
  };
  ${({hasPaddingRight}) =>
    hasPaddingRight &&
    `padding-right: 24px`
  };

  &:hover {
    border: ${({hasError}) => hasError ? colors.red.dark : colors.blue.darkest} 2px solid;
  }
`
