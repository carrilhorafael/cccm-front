import React from 'react'
import { HeaderWrapper, TitleWrapper, YearWrapper, Title } from '../styles'

export default function CalendarHeader ({ title="Selecione", yearViewed }) {

  return (
    <HeaderWrapper>
      <TitleWrapper>
        <i className='fa-solid fa-calendar'/>
        <Title>{title}</Title>
      </TitleWrapper>
      <YearWrapper>
        {yearViewed}
      </YearWrapper>
    </HeaderWrapper>
  )
}
