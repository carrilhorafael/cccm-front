import React, { useContext, useRef, useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import Title from '../components/Title'
import { AuthContext } from '../context/AuthContext'
import '../styles/forms.css'

export default function LoginPage() {
  const {handleLogin} = useContext(AuthContext)
  const email = useRef()
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    handleLogin(email.current.value, password)
  }

  return (
    <main>
      <Title text="Faça login!"/>
      <form className="formMain formLogin" onSubmit = {onSubmit}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input ref={email} id="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Senha</label>
          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} id="password"/>
        </fieldset>
        <input type="submit" value="Fazer login"/>
      </form>
    </main>
  )

}
