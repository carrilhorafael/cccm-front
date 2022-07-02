import React from 'react'
import { Content, ErrorLabel, Input, InputWrapper, Label } from './styles'

export default function Select ({
    children,
    value,
    id,
    label,
    error,
    onChange,
    placeholder
  }) {

  return (
    <Content>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasError={!!error}
        >
          {children}
        </Input>
      </InputWrapper>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Content>
  )
}
