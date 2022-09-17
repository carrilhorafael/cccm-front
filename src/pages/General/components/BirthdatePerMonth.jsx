import React, { useState } from 'react'
import getFormattedDateWithoutYear from '../../../actions/getFormattedDateWithoutYear'
import Select from '../../../atomics/Select'
import { BirthdateMember, BirthdateSection, DateWrapper, Header, Name, UsersWrapper } from '../General.styles'

export default function BirthdatePerMonth({ birthdates }) {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(parseInt(today.getMonth() + 1))

  const getIcon = (birthdateStr) => {
    const birthdate = new Date(today.getFullYear(), parseInt(birthdateStr.split('-')[1]) - 1, birthdateStr.split('-')[2])
    let beginning_of_day = today
    beginning_of_day.setHours(0,0,0,0)

    if (birthdate.getTime() < beginning_of_day.getTime()){
      return <i className="fa-solid fa-calendar-check"/>
    } else if (birthdate.getTime() === beginning_of_day.getTime()) {
      return <i className="fa-solid fa-calendar-day"/>
    }
  }

  return (
    <BirthdateSection>
      <Header>
        <h3>Aniversariantes</h3>
        <Select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {months.map((month, idx) => (
            <option key={idx} value={idx + 1}>{month}</option>
            ))}
        </Select>
      </Header>
      <UsersWrapper>
        {birthdates && birthdates[selectedMonth].map((user) => (
          <BirthdateMember key={user.id}>
            <Name>{user.name}</Name>
            <DateWrapper>
              <p>{getFormattedDateWithoutYear(user.birthdate)}</p>
              {getIcon(user.birthdate)}
            </DateWrapper>
          </BirthdateMember>
        ))}
      </UsersWrapper>
    </BirthdateSection>
  )
}
