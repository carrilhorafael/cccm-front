import React, { useEffect, useState } from 'react'
import { numberWithTwoDigits } from '../../../actions/getNumberWithTwoDigits'
import Button from '../../../atomics/Button'
import Calendar from '../../../atomics/Calendar'
import Select from '../../../atomics/Select'
import TextInput from '../../../atomics/TextInput'
import { useChurchContext } from '../../../context/ChurchContext'
import { getChurchUsers } from '../../../services/Api.service'
import DatePicker from '../../DatePicker'
import { InfoWrapper } from '../styles'

const getInitialDate = () => {
  const today = new Date()

  return `${numberWithTwoDigits(today.getDate())}/${numberWithTwoDigits(today.getMonth() + 1)}/${numberWithTwoDigits(today.getFullYear())} 09:00`
}

export function Info ({ resource }) {
  const { church } = useChurchContext()
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])
  const [dayOf, setDayOf] = useState(getInitialDate())
  const [responsible, setResponsible] = useState('')

  useEffect(() => {
    getChurchUsers(church.id, {})
    .then(({ data }) => {
      setUsers(data)
    })
  }, [church])


  return (
    <InfoWrapper>
      <TextInput
        label='Nome'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <DatePicker
        value={dayOf}
        label='Dia do culto'
        onChange={(value) => setDayOf(value)}
      />
      <Select label='Responsável' value={responsible} onChange={e => setResponsible(e.target.value)}>
        <optgroup label='Membros'>
          {users.map(({name, id}) => (
            <option value={id}>{name}</option>
          ))}
        </optgroup>
      </Select>
      <Button theme="primary" title='Confirmar'/>
    </InfoWrapper>
  )
}
