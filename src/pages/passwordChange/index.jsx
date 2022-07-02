import React, { useState } from 'react'
import Button from '../../atomics/Button'
import PasswordInput from '../../atomics/PasswordInput'
import { useAuthContext } from '../../context/AuthContext'
import { useOverlayContext } from '../../context/OverlayContext'
import { ButtonsWrapper, Container, ChangePasswordForm, Fieldset, GradientLayout, Title } from './styles'

export default function PasswordChangePage() {
  const { handleChangePassword } = useAuthContext()
  const { fireToast } = useOverlayContext()

  const [errors, setErrors] = useState(null)
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
    .catch(({response}) => {
      if (response.status >= 500) {
        fireToast('negative', 'Ops, algo deu errado em nosso servidor.')
      } else {
        setErrors(response.data)
      }
    })
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
              error={errors && errors.password && errors.password[0]}
              onChange={e => setPassword(e.target.value)}
            />
          </Fieldset>
          <Fieldset>
            <PasswordInput
              label="Confirme a senha:"
              value={passwordConfirmation}
              error={errors && errors.password_confirmation && errors.password_confirmation[0]}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />
          </Fieldset>
          <ButtonsWrapper>
            <Button theme="primary" onClick={onSubmit} title='Trocar a senha'/>
          </ButtonsWrapper>
        </ChangePasswordForm>
      </Container>
    </GradientLayout>
  )

}
