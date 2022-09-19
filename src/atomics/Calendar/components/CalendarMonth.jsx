import React from 'react'
import IconButton from 'atomics/IconButton'
import { MonthWrapper, SelectedMonth } from '../styles'

export default function CalendarMonth ({monthViewed, updateMonthViewed}) {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  return (
    <MonthWrapper>
      <IconButton theme='primary' icon='fa-solid fa-angle-left' onClick={() => updateMonthViewed(monthViewed - 1)}/>
      <SelectedMonth>{months[monthViewed]}</SelectedMonth>
      <IconButton theme='primary' icon='fa-solid fa-angle-right' onClick={() => updateMonthViewed(monthViewed + 1)}/>
    </MonthWrapper>
  )
}
