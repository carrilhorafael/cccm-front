import Button from '../../atomics/Button'
import React, { useEffect, useState } from 'react'
import Checkbox from '../../atomics/Checkbox'
import { useChurchContext } from '../../context/ChurchContext'
import { useLocation, useHistory } from 'react-router-dom'
import TextInput from '../../atomics/TextInput'
import Select from '../../atomics/Select'
import { ButtonsWrapper, CheckboxWrapper, FormGrid, TextareaWrapper, UserForm } from './styles'
import Textarea from '../../atomics/Textarea'

export default function ChurchFormUserPage () {
  const { createUser, updateUser } = useChurchContext()
  const location = useLocation()
  const history = useHistory()
  const [resource, setResource] = useState(null)
  const [name, setName] = useState(resource && resource.name)
  const [title, setTitle] = useState(resource && resource.title)
  const [phone, setPhone] = useState(resource && resource.phone)
  const [email, setEmail] = useState(resource && resource.email)
  const [birthdate, setBirthdate] = useState(resource && resource.birthdate)
  const [member_since, setMemberSince] = useState(resource && resource.member_since)
  const [marital_status, setMaritalStatus] = useState(resource && resource.marital_status)
  const [gender, setGender] = useState(resource && resource.gender)
  const [address, setAddress] = useState(resource && resource.address)
  const [notes, setNotes] = useState(resource && resource.notes)
  const [shouldHaveAccess, setShouldHaveAccess] = useState(false)
  const [isBaptized, setIsBaptized] = useState(false)
  const [isLeader, setIsLeader] = useState(false)

  useEffect(() => {
    setResource(location.state)
  }, [])


  const submitForm = async () => {
    const userParams = {
      user: {
        name: name,
        title: title,
        phone: phone,
        email: email,
        birthdate: birthdate,
        member_since: member_since,
        marital_status: marital_status,
        gender: gender,
        location: address,
        is_baptized: isBaptized,
        notes: notes,
        should_have_access: shouldHaveAccess,
        is_leader: isLeader
      }
    }
    if (resource) await updateUser(resource.id, userParams)
    else await createUser(userParams)

    history.push(`/church/users`)
  }

  return (
    <UserForm>
      <FormGrid>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nome:"
        />
        <Select label="Titulo:" value={title} onChange={(e) => setTitle(e.target.value)}>
          <option disabled>Escolha o titulo</option>
          <option value="Membro(a)">Membro(a)</option>
          <option value="Obreiro(a)">Obreiro(a)</option>
          <option value="Diácono(isa)">Diácono(isa)</option>
          <option value="Pastor(a)">Pastor(a)</option>
        </Select>
        <TextInput
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Telefone:"
        />
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email:"
        />
        <TextInput
          type='date'
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          label="Aniversário:"
        />
        <TextInput
          type='date'
          value={member_since}
          onChange={(e) => setMemberSince(e.target.value)}
          label="Membro deste:"
        />
        <Select label="Estado civil:" value={marital_status} onChange={(e) => setMaritalStatus(e.target.value)}>
          <option value={-1}>Escolha o estado civil</option>
          <option value="Solteiro(a)">Solteiro(a)</option>
          <option value="Casado(a)">Casado(a)</option>
          <option value="Viúvo(a)">Viúvo(a)</option>
          <option value="Divorciado(a)">Divorciado(a)</option>
          <option value="Separado(a)">Separado(a)</option>
        </Select>
        <Select label="Gênero:" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value={-1}>Escolha o genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </Select>
      </FormGrid>
      <TextareaWrapper>
        <Textarea
          value={address}
          label="Endereço completo:"
          onChange={(e) => setAddress(e.target.value)}
        />
      </TextareaWrapper>
      <TextareaWrapper>
        <Textarea
          value={notes}
          label="Observações sobre o membro:"
          onChange={(e) => setNotes(e.target.value)}
        />
      </TextareaWrapper>
      <CheckboxWrapper>
        <Checkbox checked={isBaptized} onChange={() => setIsBaptized(!isBaptized)} defaultValue={resource && resource.isBaptized}/>
        <label>É batizado?</label>
      </CheckboxWrapper>

      {!resource &&
      <>
        <CheckboxWrapper>
          <Checkbox checked={shouldHaveAccess} onChange={() => {
            setShouldHaveAccess(!shouldHaveAccess)
            setIsLeader(false)
          }} />
          <label>Conceder acesso ao sistema?</label>
        </CheckboxWrapper>
        {shouldHaveAccess && (
          <CheckboxWrapper marginLeft>
            <Checkbox checked={isLeader} onChange={() => setIsLeader(!isLeader)} />
            <label>É administrador do sistema?</label>
          </CheckboxWrapper>
        )}
      </>
      }
      <ButtonsWrapper>
        <Button theme="primary" onClick={submitForm} title='Salvar usuário'/>
      </ButtonsWrapper>
    </UserForm>
  )
}
