import React, { useState } from 'react'
import './styles.css'

export default function MultiSelect ({defaultOptionPlaceholder, clearValues, onChange, initialOptions}) {
  const [options, setOptions] = useState(initialOptions)
  const [selectedOptions, setSelectedOptions] = useState([])

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
    <div className='multiSelect'>
      <i className='fa-solid fa-magnifying-glass'/>
      <select value={0} onChange={e => handleInclude(e.target.value)}>
        <option defaultValue disabled value={0}>{defaultOptionPlaceholder}</option>
        {options.map((item, idx) => (
          <option value={idx}>{item.label}</option>
        ))}
      </select>
      {selectedOptions.length > 0 && (<div className='resultsWrapper'>
        <div className='resultsChoosed'>
          {selectedOptions.map((selectedOption, idx) => (
            <div key={idx} className='optionItem' onClick={() => handleRemove(selectedOption)}>
              <p>{selectedOption.label}</p>
            </div>
          ))}
        </div>
        <p className='clearAll' onClick={handleClear}>X</p>
      </div>)}
    </div>
  )
}
