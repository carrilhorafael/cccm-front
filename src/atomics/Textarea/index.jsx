import React from 'react'
import { Content, ErrorLabel, Input, InputWrapper, Label } from './styles'

export default function Textarea ({
    value,
    id,
    label,
    onChange,
    error,
    placeholder
  }) {

  return (
    <Content>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </InputWrapper>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Content>
  )
}
