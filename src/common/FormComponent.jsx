import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap';


export default function FormComponent({handleSubmit}){
  const name = useRef();
  const cpf = useRef();
  const rg = useRef();
  const gender = useRef();
  const birthdate = useRef();
  const member_since = useRef();
  const branch = useRef();
  const marital_status = useRef();
  const email = useRef();
  const phone = useRef();
  const location = useRef();
  const baptized = useRef()

  return (
    <form className="formMain">
      <div className="formCreateMember"v>
        <fieldset className="name">
          <label>Nome: </label>
          <input ref={name}/>
        </fieldset>

        <fieldset className="gender">
          <label>Gênero: </label>
          <select ref={gender}>
            <option value={0}>Masculino</option>
            <option value={1}>Feminino</option>
          </select>
        </fieldset>

        <fieldset className="cpf">
          <label>CPF: </label>
          <input ref={cpf}/>
        </fieldset>

        <fieldset className="rg">
          <label>RG: </label>
          <input ref={rg}/>
        </fieldset>

        <fieldset className="birthdate">
          <label>Data de Nascimento: </label>
          <input type="date" ref={birthdate}/>
        </fieldset>

        <fieldset className="member_since">
          <label>Membro desde: </label>
          <input type="date" ref={member_since}/>
        </fieldset>

        <fieldset className="email">
          <label>Email: </label>
          <input ref={email}/>
        </fieldset>

        <fieldset className="phone">
          <label>Telefone: </label>
          <input ref={phone}/>
        </fieldset>

        <fieldset className="marital_status">
          <label>Estado civil: </label>
          <select ref={marital_status}>
            <option value={0}>Solteiro(a)</option>
            <option value={1}>Casado(a)</option>
            <option value={2}>Viúvo(a)</option>
            <option value={3}>Divorciado(a)</option>
            <option value={4}>Separado(a)</option>
          </select>
        </fieldset>

        <fieldset className="baptized">
          <input type="checkbox" ref={baptized} />
          <label>Já foi batizado </label>
        </fieldset>
      </div>

      <div className="formLocationMember">
        <div>
          <fieldset className="location">
            <label>CEP: </label>
            <input ref={location}/>
          </fieldset>
          <fieldset className="branch">
            <label>Frequenta a sede: </label>
            <select ref={branch}>
              <option value={0}>Brasilândia</option>
              <option value={1}>Barro Vermelho</option>
            </select>
          </fieldset>
        </div>
        <div>
          <fieldset className="location">
            <label>Rua: </label>
            <input ref={location}/>
          </fieldset>
        </div>
        <div>
          <fieldset className="number">
            <label>Número: </label>
            <input ref={location}/>
          </fieldset>

          <fieldset className="location">
            <label>Complemento: </label>
            <input ref={location}/>
          </fieldset>
        </div>

        <div>
          <fieldset>
            <label>Cidade: </label>
            <select ref={gender}>
              <option value={0}>Rio de Janeiro</option>
              <option value={1}>São Paulo</option>
            </select>
          </fieldset>

          <fieldset>
            <label>Estado: </label>
            <select ref={gender}>
              <option value={0}>Rio de Janeiro</option>
              <option value={1}>São Paulo</option>
            </select>
          </fieldset>
        </div>
      </div>

      <Button variant="primary" onClick={() => handleSubmit({
        user: {
          name: name.current.value,
          cpf: cpf.current.value,
          rg: rg.current.value,
          gender: gender.current.value,
          birthdate: birthdate.current.value,
          member_since: member_since.current.value,
          branch: branch.current.value,
          marital_status: marital_status.current.value,
          email: email.current.value,
          location: location.current.value,
          is_baptized: baptized.current.value,
          phone: phone.current.value
        }
      })}>Enviar</Button>

    </form>
  )
}
