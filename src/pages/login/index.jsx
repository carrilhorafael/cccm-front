import React, { useState } from 'react'
import Button from '../../atomics/Button'
import PasswordInput from '../../atomics/PasswordInput'
import TextInput from '../../atomics/TextInput'
import { useAuthContext } from '../../context/AuthContext'
import { useOverlayContext } from '../../context/OverlayContext'
import { ButtonsWrapper, Container, Fieldset, FormLogin, GradientLayout, Title } from './styles'

export default function LoginPage() {
  const { handleLogin } = useAuthContext()
  const { fireToast } = useOverlayContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    handleLogin(email, password)
    .catch((response) => {
      if (!response || response.status >= 500)
        fireToast('negative', 'Ops, algo deu errado em nosso servidor.')
      else
        fireToast('negative', response.data.login)
    })
  }

  return (
    <GradientLayout>
      <Container>
        <FormLogin>
          <Title>Acessar o sistema</Title>
          <Fieldset>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email:"
              />
          </Fieldset>
          <Fieldset>
            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Senha:"
              />
          </Fieldset>
          <ButtonsWrapper>
            <Button theme="primary" onClick={onSubmit} title='Entrar' isFullWidth/>
          </ButtonsWrapper>
        </FormLogin>
      </Container>
    </GradientLayout>
  )

}
