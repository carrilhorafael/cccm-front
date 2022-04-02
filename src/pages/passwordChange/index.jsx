import React, { useContext, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import PasswordInput from '../../common/passwordInput'
import { AuthContext } from '../../context/AuthContext'
import './styles.css'

export default function PasswordChangePage() {
  const { handleChangePassword } = useContext(AuthContext)

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    let data = {
      key: window.location.search.split('?key='),
      password: password,
      password_confirmation: passwordConfirmation
    }
    handleChangePassword(data)
  }

  return (
    <main className='gradientLayout'>
      <section className='container'>
        <form className="formChangePassword" onSubmit = {onSubmit}>
          <h2>Mude sua senha para acessar o sistema</h2>
          <fieldset>
            <label htmlFor="email">Senha</label>
            <PasswordInput value={password} onChange={e => setPassword(e.target.value)} id="password"/>
          </fieldset>
          <fieldset>
            <label htmlFor="passwordConfirmation">Confirme sua senha</label>
            <PasswordInput value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} id="passwordConfirmation"/>
          </fieldset>
          <div className='buttonWrapper'>
            <Button variant="primary" onClick={onSubmit}>Trocar a senha</Button>
          </div>
        </form>
      </section>
    </main>
  )

}
