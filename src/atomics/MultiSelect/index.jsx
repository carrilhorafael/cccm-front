import React, { useState } from 'react'
import {
  ClearAll,
  MultiSelectWrapper,
  ResultsChoosen,
  ResultsWrapper,
  Select,
  SelectedItem
} from './styles'

export default function MultiSelect ({defaultOptionPlaceholder, initialValues=[], clearValues, onChange, initialOptions}) {
  const [options, setOptions] = useState(initialOptions.filter(m => !initialValues.includes(m.value)))
  const [selectedOptions, setSelectedOptions] = useState(initialOptions.filter(m => initialValues.includes(m.value)))

  const handleInclude = (idx) => {
    const selectedOption = options[parseInt(idx)]

    onChange(selectedOption.value)
    setSelectedOptions([...selectedOptions, selectedOption])
    setOptions(options.filter(option => option.value !== selectedOption.value))
  }

  const handleRemove = (removedOption) => {
    const selectAux = selectedOptions.map(item => item.value)

    onChange(removedOption)
    setSelectedOptions(selectedOptions.filter(old => old.value !== removedOption.value))
    setOptions(initialOptions.filter(initialOption => initialOption.value === removedOption.value || !selectAux.includes(initialOption.value)))
  }

  const handleClear = () => {
    clearValues()
    setOptions(initialOptions)
    setSelectedOptions([])
  }

  return (
    <MultiSelectWrapper>
      <i className='fa-solid fa-magnifying-glass'/>
      <Select value={0} onChange={e => handleInclude(e.target.value)}>
        <option defaultValue disabled value={0}>{defaultOptionPlaceholder}</option>
        {options.map((item, idx) => (
          <option value={idx}>{item.label}</option>
        ))}
      </Select>
      {selectedOptions.length > 0 && (
        <ResultsWrapper>
          <ResultsChoosen>
            {selectedOptions.map((selectedOption, idx) => (
              <SelectedItem key={idx} onClick={() => handleRemove(selectedOption)}>
                <p>{selectedOption.label}</p>
              </SelectedItem>
            ))}
          </ResultsChoosen>
          <ClearAll onClick={handleClear}>X</ClearAll>
        </ResultsWrapper>
        )
      }
    </MultiSelectWrapper>
  )
}
