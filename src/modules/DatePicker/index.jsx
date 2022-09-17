import React, { useEffect } from 'react'
import { useState } from 'react'
import { numberWithTwoDigits } from '../../actions/getNumberWithTwoDigits'
import Calendar from '../../atomics/Calendar'
import ClickAwayListener from '../../atomics/ClickAwayListener'
import TextInput from '../../atomics/TextInput'
import { Label, PopoverWrapper } from './styles'

const getValueForString = (value) => {
  const dateSplitted = value.split(" ")[0]
  const hoursSplitted = value.split(" ")[1]

  const year = Number(dateSplitted.split('/')[2])
  const month = Number(dateSplitted.split('/')[1])
  const day = Number(dateSplitted.split('/')[0])

  const hours = Number(hoursSplitted.split(':')[0])
  const minutes = Number(hoursSplitted.split(':')[1])
  return {
    year,
    month,
    day,
    hours,
    minutes
  }
}

export default function DatePicker ({ label, value, onChange }) {
  const [isOpen, setOpen] = useState(false)
  const [dateParams, setDateParams] = useState(getValueForString(value))

  useEffect(() => {
    onChange(`${numberWithTwoDigits(dateParams.day)}/${numberWithTwoDigits(dateParams.month)}/${dateParams.year} ${numberWithTwoDigits(dateParams.hours)}:${numberWithTwoDigits(dateParams.minutes)}`)
  }, [dateParams])

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      {label && <Label>{label}</Label>}
      <PopoverWrapper>
        <TextInput
          value={value}
          onFocus={() => setOpen(true)}
        />

        {isOpen && <Calendar value={dateParams} setValue={setDateParams}/>}
      </PopoverWrapper>
    </ClickAwayListener>

  )
}
