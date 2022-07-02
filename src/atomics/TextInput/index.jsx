import React from 'react'
import { Content, EndWrapper, ErrorLabel, Input, InputWrapper, Label, StartIcon } from './styles'

export default function TextInput ({
    type,
    value,
    id,
    label,
    error,
    onChange,
    placeholder,
    hasStartIcon,
    startIcon,
    endAdornment
  }) {

  return (
    <Content>
      <Label>{label}</Label>
      <InputWrapper>
        {hasStartIcon && <StartIcon className={startIcon}/>}
        <Input
          type={type || 'text'}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasPaddingLeft={hasStartIcon}
          hasPaddingRight={endAdornment}
          hasError={!!error}
          />
        <EndWrapper>
          {endAdornment}
        </EndWrapper>
      </InputWrapper>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Content>
  )
}
