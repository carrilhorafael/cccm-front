import React, { useContext, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import PasswordInput from '../../components/passwordInput'
import { AuthContext } from '../../context/AuthContext'
import './styles.css'

export default function LoginPage() {
  const {handleLogin} = useContext(AuthContext)
  const email = useRef()
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    handleLogin(email.current.value, password)
  }

  return (
    <main className='gradientLayout'>
      <section className='container'>
        <form className="formLogin" onSubmit = {onSubmit}>
          <h2>Acesse o sistema com seu email e senha</h2>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input ref={email} id="email" />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Senha</label>
            <PasswordInput value={password} onChange={e => setPassword(e.target.value)} id="password"/>
          </fieldset>
          <div className='buttonWrapper'>
            <Button variant="primary" onClick={onSubmit}>Entrar</Button>
          </div>
        </form>
      </section>
    </main>
  )

}
