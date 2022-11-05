import Button from 'atomics/Button'
import React, { useReducer } from 'react'
import Checkbox from 'atomics/Checkbox'
import { useLocation, useHistory } from 'react-router-dom'
import TextInput from 'atomics/TextInput'
import Select from 'atomics/Select'
import { ButtonsWrapper, CheckboxWrapper, Container, FormGrid, GeneralLayout, HeaderTitle, HeaderUser, TextareaWrapper, UserForm } from './FormUser.styles'
import Textarea from 'atomics/Textarea'
import { ActionStatus, ActionType, reducer } from './store'
import submitForm from './actions/submitForm'
import { useChurchContext } from 'context/ChurchContext'
import IconButton from 'atomics/IconButton'

export default function FormUser () {
  const { church } = useChurchContext()
  const location = useLocation()
  const [{ status, errors, user }, dispatch] = useReducer(reducer, {
    status: ActionStatus.IDLE,
    errors: null,
    user: {
      id: location.state?.id ?? null,
      name: location.state?.name ?? '',
      title: location.state?.title ?? '',
      phone: location.state?.phone ?? '',
      email: location.state?.email ?? '',
      birthdate: location.state?.birthdate ?? '',
      member_since: location.state?.member_since ?? '',
      marital_status: location.state?.marital_status ?? '',
      gender: location.state?.gender ?? '',
      location: location.state?.location ?? '',
      notes: location.state?.notes ?? '',
      should_have_access: false,
      is_baptized: false,
      is_leader: false
    }
  })
  const history = useHistory()

  const handleSubmit = () => {
    submitForm(dispatch, user, history, church)
  }

  const updateUser = (key, value) => {
    dispatch({
      type: ActionType.UPDATE_USER,
      payload: {
        key,
        value
      }
    })
  }

  return (
    <GeneralLayout>
      <Container>
        <HeaderUser>
          <IconButton
            icon='fa-solid fa-delete-left'
            theme='negative'
            onClick={() => history.goBack()}
          />
          <HeaderTitle>{location.state ? "Editar usuário" : "Criar usuário"}</HeaderTitle>
        </HeaderUser>
        <UserForm>
          <FormGrid>
            <TextInput
              label="Nome:"
              value={user.name}
              onChange={(e) => updateUser('name', e.target.value)}
              error={errors && errors.name && errors.name[0]}
            />
            <Select
              label="Titulo:"
              value={user.title}
              onChange={(e) => updateUser('title', e.target.value)}
              error={errors && errors.title && errors.title[0]}
            >
              <option defaultChecked>Escolha o titulo</option>
              <option value="Membro(a)">Membro(a)</option>
              <option value="Obreiro(a)">Obreiro(a)</option>
              <option value="Diácono(isa)">Diácono(isa)</option>
              <option value="Pastor(a)">Pastor(a)</option>
            </Select>
            <TextInput
              label="Telefone:"
              value={user.phone}
              onChange={(e) => updateUser('phone', e.target.value)}
              error={errors && errors.phone && errors.phone[0]}
            />
            <TextInput
              label="Email:"
              value={user.email}
              onChange={(e) => updateUser('email', e.target.value)}
              error={errors && errors.email && errors.email[0]}
            />
            <TextInput
              type='date'
              label="Data de nascimento:"
              value={user.birthdate}
              onChange={(e) => updateUser('birthdate', e.target.value)}
              error={errors && errors.birthdate && errors.birthdate[0]}
            />
            <TextInput
              type='date'
              label="Membro deste:"
              value={user.member_since}
              onChange={(e) => updateUser('member_since', e.target.value)}
              error={errors && errors.member_since && errors.member_since[0]}
            />
            <Select
              label="Estado civil:"
              value={user.marital_status}
              onChange={(e) => updateUser('marital_status', e.target.value)}
              error={errors && errors.marital_status && errors.marital_status[0]}
            >
              <option value={-1}>Escolha o estado civil</option>
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Viúvo(a)">Viúvo(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Separado(a)">Separado(a)</option>
            </Select>
            <Select
              label="Gênero:"
              value={user.gender}
              onChange={(e) => updateUser('gender', e.target.value)}
              error={errors && errors.gender && errors.gender[0]}
            >
              <option value={-1}>Escolha o genero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </Select>
          </FormGrid>
          <TextareaWrapper>
            <Textarea
              label="Endereço completo:"
              value={user.location}
              onChange={(e) => updateUser('location', e.target.value)}
              error={errors && errors.location && errors.location[0]}
            />
          </TextareaWrapper>
          <TextareaWrapper>
            <Textarea
              label="Observações sobre o membro:"
              value={user.notes}
              onChange={(e) => updateUser('notes', e.target.value)}
              error={errors && errors.notes && errors.notes[0]}
            />
          </TextareaWrapper>
          <CheckboxWrapper>
            <Checkbox
              checked={user.is_baptized}
              onChange={(e) => updateUser('is_baptized', !user.is_baptized)}
            />
            <label>É batizado?</label>
          </CheckboxWrapper>

          {!location.state &&
          <>
            <CheckboxWrapper>
              <Checkbox
                checked={user.should_have_access}
                onChange={() => {
                  updateUser('should_have_access', !user.should_have_access)
                  updateUser('is_leader', false)
                }
              } />
              <label>Conceder acesso ao sistema?</label>
            </CheckboxWrapper>
            {user.should_have_access && (
              <CheckboxWrapper marginLeft>
                <Checkbox
                  checked={user.is_leader}
                  onChange={() => updateUser('is_leader', !user.is_leader)}
                />
                <label>É administrador do sistema?</label>
              </CheckboxWrapper>
            )}
          </>
          }
          <ButtonsWrapper>
            <Button
              theme="primary"
              onClick={handleSubmit}
              title='Salvar usuário'
              disabled={status === ActionStatus.LOADING}
            />
          </ButtonsWrapper>
        </UserForm>
      </Container>
    </GeneralLayout>
  )
}
