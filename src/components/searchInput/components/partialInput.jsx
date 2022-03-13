import React from 'react'

export default function PartialInput ({value, setValue, placeholder}) {

  return <input type="text" placeholder={placeholder} value={value} onChange={setValue}/>
}
