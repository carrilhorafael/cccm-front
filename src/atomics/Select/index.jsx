import React from 'react'
import { Content, Input, InputWrapper, Label } from './styles'

export default function Select ({
    children,
    value,
    id,
    label,
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
        >
          {children}
        </Input>
      </InputWrapper>
    </Content>
  )
}
