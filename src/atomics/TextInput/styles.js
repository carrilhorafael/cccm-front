import styled from 'styled-components'
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
`
export const StartIcon = styled.i`
  position: absolute;
  left: 5px;
  top: 13px;
`
export const Label = styled.label`
  text-transform: uppercase;
  font-size: 14px;
  padding-bottom: 4px;
`
export const EndWrapper = styled.div`
  position: absolute;
  // z-index: 10;
  right: 5px;
  top: 13px;
`
export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: #0400D8 2px solid;
	background-color: #fafafa;
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
    border: #0400aa 2px solid;
  }
`
