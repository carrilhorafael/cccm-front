import React, { useState } from 'react'
import './styles.css'
import eye from '../../img/eye_password.svg'
import eye_corted from '../../img/eye_password_corted.svg'

export default function PasswordInput({value, onChange, id}){
  const [type, setType] = useState("password")

  const toggleType = () => setType(type === 'password' ? 'text' : 'password')

  return (
    <div className="inputPassword">
      <input type={type} id={id} value={value} onChange={onChange}/>
      <img src={type === 'password'? eye : eye_corted} alt="" onClick={toggleType}/>
    </div>
  )
}
