import React, { useState } from 'react'
import TextInput from '../TextInput'

export default function PasswordInput({value, onChange, id, label}){
  const [type, setType] = useState("password")

  const toggleType = () => setType(type === 'password' ? 'text' : 'password')

  return (
    <TextInput
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      label={label}
      endAdornment={
        <i className={type === 'password'? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} onClick={toggleType}/>
      }
    />
  )
}
