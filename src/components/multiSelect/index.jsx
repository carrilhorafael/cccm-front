import React, { useState } from 'react'
import './styles.css'

export default function MultiSelect ({
  values,
  clearValues,
  insertValue,
  removeValue,
  items,
  defaultValues
}) {
  const [options, setOptions] = useState(items)

  const handleChange = (value) => {
    insertValue(value)
    setOptions(options.filter(option => option !== value))
  }

  const handleRemove = (value) => {
    removeValue(value)
    setOptions(prev => items.filter(item => prev.includes(item) || item === value))
  }

  const handleClear = () => {
    clearValues()
    setOptions(items)
  }

  return (
    <div className='multiSelect'>
      <select value={0} onChange={e => handleChange(e.target.value)}>
        <option defaultValue value={0}></option>
        {options.map((element) => (
          <option>{element}</option>
        ))}
      </select>
      {values.length > 0 && (<div className='resultsWrapper'>
        <div className='resultsChoosed'>
          {values.map((value) => (
            <div className='optionItem' onClick={() => handleRemove(value)}>
              <p>{value}</p>
            </div>
          ))}
        </div>
        <p className='clearAll' onClick={handleClear}>X</p>
      </div>)}
    </div>
  )
}
