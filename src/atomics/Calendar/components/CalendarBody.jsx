import React, { useEffect, useState } from 'react'
import { CalendarDay, DaysWrapper } from '../styles'

const calcMonthDays = (year, month) => {
  const monthFirstDay = new Date(year, month, 1)
  const monthLastDay = new Date(year, month+1, 0)

  let monthDays = []
  for (let i = -(monthFirstDay.getDay()-1); i <= 0; i++) {
    let date = new Date (year, month, i)
    monthDays.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    })
  }
  for (let i = 1; i <= monthLastDay.getDate(); i++) {
    monthDays.push({
      day: i,
      month: monthFirstDay.getMonth(),
      year: monthFirstDay.getFullYear()
    })
  }
  for (let i = 1; i <= 6 - monthLastDay.getDay(); i++) {
    let date = new Date (year, month, monthLastDay.getDate() + i)
    monthDays.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    })
  }

  return monthDays
}

export default function CalendarBody ({monthViewed, yearViewed, dateParams, updateDay}) {
  const {year, month, day} = dateParams
  const [days, setDays] = useState(calcMonthDays(yearViewed, monthViewed))

  useEffect(() => {
    setDays(calcMonthDays(yearViewed, monthViewed))
  }, [monthViewed, yearViewed])

  return (
    <DaysWrapper>
      {days.map((el) => (
        <CalendarDay
          outMonth={el.month !== monthViewed}
          onClick={() => updateDay(el)}
          selected={el.day === day && el.month === month && el.year === year}
        >
          {el.day}
        </CalendarDay>
      ))}
    </DaysWrapper>
  )
}
