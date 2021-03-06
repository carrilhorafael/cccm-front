import React, { useContext, useState } from 'react'
import getFormattedDateWithoutYear from '../../../actions/getFormattedDateWithoutYear'
import Select from '../../../atomics/Select'
import { ChurchContext } from '../../../context/ChurchContext'
import { BirthdateMember, BirthdateSection, DateWrapper, Header, Name, UsersWrapper } from '../styles'

export default function BirthdatePerMonth() {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(parseInt(today.getMonth() + 1))
  const { resume } = useContext(ChurchContext)

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
            <option value={idx + 1}>{month}</option>
            ))}
        </Select>
      </Header>
      <UsersWrapper>
        {resume.users_grouped_by_birthdate_month && resume.users_grouped_by_birthdate_month[selectedMonth].map((user) => (
          <BirthdateMember>
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
