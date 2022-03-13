import React, { useContext } from 'react'
import { ChurchContext } from '../../context/ChurchContext'
import MultiSelect from '../multiSelect'
import PartialInput from './components/partialInput'
import './styles.css'

export default function SearchInput ({
  type,
  multiSelectableProps,
  partialInputProps
}) {

  const { church } = useContext(ChurchContext)

  return (
    <div className='searchInput'>
      <i className='fa-solid fa-magnifying-glass'/>
      { type === "multi-selectable" && <MultiSelect {...multiSelectableProps}/>}
      { type === "partial" && <PartialInput {...partialInputProps}/>}
      {/* { type === "multi-selectable" && <></>} */}
    </div>
  )
}
