import React, { useContext, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import PasswordInput from '../../atomics/PasswordInput'
import { AuthContext } from '../../context/AuthContext'
import { ButtonsWrapper, ChangePasswordForm, Fieldset, GradientLayout, Title } from './styles'

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
    <GradientLayout>
      <Container>
        <ChangePasswordForm>
          <Title>Mude sua senha para acessar o sistema</Title>
          <Fieldset>
            <PasswordInput
              label="Nova senha:"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Fieldset>
          <Fieldset>
            <PasswordInput
              label="Confirme a senha:"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />
          </Fieldset>
          <ButtonsWrapper>
            <Button variant="primary" onClick={onSubmit}>Trocar a senha</Button>
          </ButtonsWrapper>
        </ChangePasswordForm>
      </Container>
    </GradientLayout>
  )

}
