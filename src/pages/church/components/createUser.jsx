import { Button } from 'react-bootstrap'
import React, { useContext, useRef, useState } from 'react'
import Checkbox from '../../../components/checkbox'
import { ChurchContext } from '../../../context/ChurchContext'
import { postUser } from '../../../services/Api.service'

export default function CreateUserPage () {
  const { church, setChurch, setTab } = useContext(ChurchContext)
  const name = useRef()
  const title = useRef()
  const phone = useRef()
  const email = useRef()
  const birthdate = useRef()
  const member_since = useRef()
  const marital_status = useRef()
  const gender = useRef()
  const location = useRef()
  const [shouldHaveAccess, setShouldHaveAccess] = useState(false)
  const [isBaptized, setIsBaptized] = useState(false)
  const [isLeader, setIsLeader] = useState(false)

  const handleCreateUser = (resource) => {
    let newUsers = church.users
    let position = newUsers.findIndex(user => !user.is_leader)

    newUsers = [
      ...newUsers.slice(0, position),
      resource,
      ...newUsers.slice(position)
    ]
    setChurch(prevState => ({ ...prevState, users: newUsers }))
  }

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
        should_have_access: shouldHaveAccess,
        is_leader: isLeader
      }
    }
    postUser(church.id, user)
      .then(({data}) => {
        alert("Usuário criado com sucesso")
        handleCreateUser(data)
        setTab("users")
      })
  }

  return (
    <>
      <form className='createUserForm'>
        <div className='formGrid'>
          <fieldset>
            <label>Nome: </label>
            <input type='text' ref={name}/>
          </fieldset>
          <fieldset>
            <label>Titulo</label>
            <input type='text' ref={title}/>
          </fieldset>
          <fieldset>
            <label>Telefone</label>
            <input type={'tel'} pattern="([0-9]{2})9[0-9]{4}-[0-9]{4}" ref={phone}/>
          </fieldset>
          <fieldset>
            <label>Email</label>
            <input type='text' ref={email}/>
          </fieldset>
          <fieldset>
            <label>Data de nascimento</label>
            <input type='date' ref={birthdate}/>
          </fieldset>
          <fieldset>
            <label>Membro desde</label>
            <input type='date' ref={member_since}/>
          </fieldset>
          <fieldset>
            <label>Estado civil</label>
            <select ref={marital_status}>
              <option value={null}>Escolha o estado civil</option>
              <option value={"Solteiro(a)"}>Solteiro(a)</option>
              <option value={"Casado(a)"}>Casado(a)</option>
              <option value={"Viúvo(a)"}>Viúvo(a)</option>
              <option value={"Divorciado(a)"}>Divorciado(a)</option>
              <option value={"Separado(a)"}>Separado(a)</option>
            </select>
          </fieldset>
          <fieldset>
            <label>Gênero</label>
            <select ref={gender}>
              <option value={null} defaultValue>Escolha o genero</option>
              <option value={"Masculino"}>Masculino</option>
              <option value={"Feminino"}>Feminino</option>
            </select>
          </fieldset>
        </div>
        <fieldset>
          <label>Endereço completo:</label>
          <textarea ref={location}/>
        </fieldset>
        <fieldset className='flexRowDisplay'>
          <Checkbox checked={isBaptized} handleToggle={() => setIsBaptized(!isBaptized)} />
          <label>É batizado?</label>
        </fieldset>
        <fieldset className='flexRowDisplay'>
          <Checkbox checked={shouldHaveAccess} handleToggle={() => {
            setShouldHaveAccess(!shouldHaveAccess)
            setIsLeader(false)
          }} />
          <label>Conceder acesso ao sistema?</label>
        </fieldset>
        {shouldHaveAccess && (
          <fieldset className='flexRowDisplay leaderField'>
            <Checkbox checked={isLeader} handleToggle={() => setIsLeader(!isLeader)} />
            <label>É administrador do sistema?</label>
          </fieldset>
        )}
        <div className='buttonWrapper'>
          <Button variant="primary" onClick={submitForm}> Enviar </Button>
        </div>
      </form>
    </>
  )
}
