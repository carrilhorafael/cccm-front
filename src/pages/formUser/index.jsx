import { Button } from 'react-bootstrap'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Checkbox from '../../common/checkbox'
import { ChurchesContext } from '../../context/ChurchesContext'
import './styles.css'
import { useHistory } from 'react-router-dom'

export default function ChurchFormUserPage () {
  const { church, users, createUser, updateUser } = useContext(ChurchesContext)
  const history = useHistory()
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
  const [isBaptized, setIsBaptized] = useState(false)
  const [isLeader, setIsLeader] = useState(false)
  const [resource, setResource] = useState(null)

  useEffect(() => {
    const search = window.location.search
    if (search){
      const userId = parseInt(search.split("?user_id=")[1])
      setResource(users.find(user => user.id === userId))
    }
  }, [])


  const submitForm = async () => {
    const userParams = {
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
    if (resource) {
      await updateUser(resource.id, userParams)
    } else {
      await createUser(userParams)
    }
    history.push(`/church/users?church_id=${church.id}`)
  }

  return (
    <main className='pageLayout'>
      <form className='createUserForm'>
        <div className='formGrid'>
          <fieldset>
            <label>Nome: </label>
            <input type='text' ref={name} defaultValue={resource && resource.name}/>
          </fieldset>
          <fieldset>
            <label>Titulo</label>
            <select ref={title} defaultValue={resource && resource.title}>
              <option disabled>Escolha o titulo</option>
              <option value="Membro(a)">Membro(a)</option>
              <option value="Obreiro(a)">Obreiro(a)</option>
              <option value="Diácono(isa)">Diácono(isa)</option>
              <option value="Pastor(a)">Pastor(a)</option>
            </select>
          </fieldset>
          <fieldset>
            <label>Telefone</label>
            <input type={'tel'} pattern="([0-9]{2})9[0-9]{4}-[0-9]{4}" ref={phone} defaultValue={resource && resource.phone}/>
          </fieldset>
          <fieldset>
            <label>Email</label>
            <input type='text' ref={email} defaultValue={resource && resource.email}/>
          </fieldset>
          <fieldset>
            <label>Data de nascimento</label>
            <input type='date' ref={birthdate} defaultValue={resource && resource.birthdate}/>
          </fieldset>
          <fieldset>
            <label>Membro desde</label>
            <input type='date' ref={member_since} defaultValue={resource && resource.member_since}/>
          </fieldset>
          <fieldset>
            <label>Estado civil</label>
            <select ref={marital_status} defaultValue={resource && resource.marital_status}>
              <option value={-1} disabled>Escolha o estado civil</option>
              <option value={"Solteiro(a)"} selected={resource && resource.marital_status === "Solteiro(a)" }>Solteiro(a)</option>
              <option value={"Casado(a)"} selected={resource && resource.marital_status === "Casado(a)" }>Casado(a)</option>
              <option value={"Viúvo(a)"} selected={resource && resource.marital_status === "Viúvo(a)" }>Viúvo(a)</option>
              <option value={"Divorciado(a)"} selected={resource && resource.marital_status === "Divorciado(a)" }>Divorciado(a)</option>
              <option value={"Separado(a)"} selected={resource && resource.marital_status === "Separado(a)" }>Separado(a)</option>
            </select>
          </fieldset>
          <fieldset>
            <label>Gênero</label>
            <select ref={gender} defaultValue={resource && resource.gender}>
              <option value={-1} disabled>Escolha o genero</option>
              <option value={"Masculino"} selected={resource && resource.gender === "Masculino"}>Masculino</option>
              <option value={"Feminino"} selected={resource && resource.gender === "Feminino"}>Feminino</option>
            </select>
          </fieldset>
        </div>
        <fieldset className='flexColumnDisplay'>
          <label>Endereço completo:</label>
          <textarea className='addressTextarea' ref={location} defaultValue={resource && resource.location}/>
        </fieldset>
        <fieldset className='flexColumnDisplay'>
          <label>Observações sobre membro:</label>
          <textarea rows={2} className='notesTextarea' ref={notes} defaultValue={resource && resource.notes}/>
        </fieldset>
        <fieldset className='flexRowDisplay'>
          <Checkbox checked={isBaptized} handleToggle={() => setIsBaptized(!isBaptized)} defaultValue={resource && resource.isBaptized}/>
          <label>É batizado?</label>
        </fieldset>

        {!resource &&
        <>
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
        </>
        }
        <div className='buttonWrapper'>
          <Button variant="primary" onClick={submitForm}> Enviar </Button>
        </div>
      </form>
    </main>
  )
}
