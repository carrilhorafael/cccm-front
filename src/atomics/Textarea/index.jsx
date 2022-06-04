import React from 'react'
import { Content, Input, InputWrapper, Label } from './styles'

export default function Textarea ({
    value,
    id,
    label,
    onChange,
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
    </Content>
  )
}
