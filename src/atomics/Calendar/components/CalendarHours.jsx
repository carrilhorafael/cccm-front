import React from 'react'
import { numberWithTwoDigits } from 'utils/getNumberWithTwoDigits'
import Select from 'atomics/Select'
import { SelectWrapper } from '../styles'

export default function CalendarHours ({ hours, minutes, updateHours }) {
  let hoursOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
  let minutesOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

  return (
    <SelectWrapper>
      <Select
        value={hours}
        onChange={(e) => updateHours({ hours: e.target.value })}
      >
        {hoursOptions.map((hour) => (
          <option value={hour}>{numberWithTwoDigits(hour)}</option>
        ))}
      </Select>
      :
      <Select
        value={minutes}
        onChange={(e) => updateHours({ minutes: e.target.value })}
      >
        {minutesOptions.map((minute) => (
          <option value={minute}>{numberWithTwoDigits(minute)}</option>
        ))}
      </Select>
    </SelectWrapper>
  )
}
