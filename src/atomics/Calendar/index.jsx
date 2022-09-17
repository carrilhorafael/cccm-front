import React, { useState } from 'react'
import { useEffect } from 'react'
import CalendarBody from './components/CalendarBody'
import CalendarMonth from './components/CalendarMonth'
import CalendarHours from './components/CalendarHours'
import { Popover } from './styles'
import CalendarHeader from './components/CalendarHeader'

export default function Calendar ({ value, setValue }) {
  const [dateParams, setDateParams] = useState(value)

  const [monthViewed, setMonthViewed] = useState(value.month)
  const [yearViewed, setYearViewed] = useState(value.year)

  useEffect(() => {
    setValue(dateParams)
  }, [dateParams, setValue])

  const updateMonthViewed = (newMonth) => {
    if (newMonth < 0) {
      updateYearViewed(yearViewed - 1)
      return setMonthViewed(11)
    }
    if (newMonth > 11) {
      updateYearViewed(yearViewed + 1)
      return setMonthViewed(0)
    }
    setMonthViewed(newMonth)
  }

  const updateYearViewed = (newYear) => {
    setYearViewed(newYear)
  }

  const updateDate = (params) => {
    setDateParams({...dateParams, ...params})
  }

  return (
    <Popover>
      <CalendarHeader yearViewed={yearViewed} />
      <CalendarMonth monthViewed={monthViewed} updateMonthViewed={updateMonthViewed}/>
      <CalendarBody monthViewed={monthViewed} yearViewed={yearViewed} dateParams={dateParams} updateDay={updateDate}/>
      <CalendarHours dateParams={dateParams} updateHours={updateDate}/>
    </Popover>
  )
}
