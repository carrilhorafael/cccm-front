import React, { useContext, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import PasswordInput from '../../atomics/PasswordInput'
import TextInput from '../../atomics/TextInput'
import { AuthContext } from '../../context/AuthContext'
import { ButtonsWrapper, Container, Fieldset, FormLogin, GradientLayout, Title } from './styles'

export default function LoginPage() {
  const { handleLogin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    handleLogin(email, password)
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
            <Button variant="primary" onClick={onSubmit}>Entrar</Button>
          </ButtonsWrapper>
        </FormLogin>
      </Container>
    </GradientLayout>
  )

}
