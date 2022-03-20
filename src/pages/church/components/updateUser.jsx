import { Button } from 'react-bootstrap'
import React, { useContext, useRef, useState } from 'react'
import Checkbox from '../../../components/checkbox'
import { ChurchContext } from '../../../context/ChurchContext'
import { updateUser } from '../../../services/Api.service'

export default function UpdateUserPage () {
  const { resource, setResource, handleUpdateResource, setTab } = useContext(ChurchContext)
  const name = useRef()
  const title = useRef()
  const phone = useRef()
  const email = useRef()
  const birthdate = useRef()
  const member_since = useRef()
  const marital_status = useRef()
  const gender = useRef()
  const location = useRef()
  const notes = useRef()
  const [shouldHaveAccess, setShouldHaveAccess] = useState(false)
  const [isBaptized, setIsBaptized] = useState(!!resource ? resource.is_baptized : false)
  const [isLeader, setIsLeader] = useState(false)

  const submitForm = () => {
    const user = {
      user: {
        name: name.current.value,
        title: title.current.value,
        phone: phone.current.value,
        email: email.current.value,
        birthdate: birthdate.current.value,
        member_since: member_since.current.value,
        marital_status: marital_status.current.value,
        gender: gender.current.value,
        location: location.current.value,
        is_baptized: isBaptized,
        notes: notes.current.value,
        should_have_access: shouldHaveAccess,
        is_leader: isLeader
      }
    }
    updateUser(resource.id, user)
      .then(({data}) => {
        alert("Usuário editado com sucesso")
        handleUpdateResource(data, 'user')
        setResource({})
        setTab("users")
      })
  }

  return (
    <>
      <form className='createUserForm'>
        <div className='formGrid'>
          <fieldset>
            <label>Nome: </label>
            <input type='text' defaultValue={resource.name} ref={name}/>
          </fieldset>
          <fieldset>
            <label>Titulo</label>
            <input type='text' defaultValue={resource.title} ref={title}/>
          </fieldset>
          <fieldset>
            <label>Telefone</label>
            <input type={'tel'} defaultValue={resource.phone} pattern="([0-9]{2})9[0-9]{4}-[0-9]{4}" ref={phone}/>
          </fieldset>
          <fieldset>
            <label>Email</label>
            <input type='text'  defaultValue={resource.email} ref={email}/>
          </fieldset>
          <fieldset>
            <label>Data de nascimento</label>
            <input type='date'  defaultValue={resource.birthdate} ref={birthdate}/>
          </fieldset>
          <fieldset>
            <label>Membro desde</label>
            <input type='date'  defaultValue={resource.member_since} ref={member_since}/>
          </fieldset>
          <fieldset>
            <label>Estado civil</label>
            <select ref={marital_status} defaultValue={(resource.marital_status) || -1}>
              <option value={-1} disabled>Escolha o estado civil</option>
              <option value={"Solteiro(a)"}>Solteiro(a)</option>
              <option value={"Casado(a)"}>Casado(a)</option>
              <option value={"Viúvo(a)"}>Viúvo(a)</option>
              <option value={"Divorciado(a)"}>Divorciado(a)</option>
              <option value={"Separado(a)"}>Separado(a)</option>
            </select>
          </fieldset>
          <fieldset>
            <label>Gênero</label>
            <select ref={gender} defaultValue={(resource.gender) || -1}>
              <option value={-1} disabled>Escolha o genero</option>
              <option value={"Masculino"}>Masculino</option>
              <option value={"Feminino"}>Feminino</option>
            </select>
          </fieldset>
        </div>
        <fieldset className='flexColumnDisplay'>
          <label>Endereço completo:</label>
          <textarea className='addressTextarea' defaultValue={resource.location} ref={location}/>
        </fieldset>
        <fieldset className='flexColumnDisplay'>
          <label>Observações sobre membro:</label>
          <textarea rows={2} className='notesTextarea' defaultValue={resource.notes} ref={notes}/>
        </fieldset>
        <fieldset className='flexRowDisplay'>
          <Checkbox checked={isBaptized} handleToggle={() => setIsBaptized(!isBaptized)} />
          <label>É batizado?</label>
        </fieldset>
        <div className='buttonWrapper'>
          <Button variant="primary" onClick={submitForm}> Enviar </Button>
        </div>
      </form>
    </>
  )
}
